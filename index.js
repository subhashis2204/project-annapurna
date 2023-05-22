const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const MongoStore = require('connect-mongo');

// importing all the routes
const authRouter = require('./routes/auth')
const restaurantRouter = require('./routes/restaurants')
const receiverRouter = require('./routes/receivers')

const methodOverride = require('method-override')
const User = require('./models/User')
const CatchAsync = require('./utils/CatchAsync')
const { sendMessage, sendMessageNodemailer } = require('./email')
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

let db_url = process.env.MONGODB_URL

mongoose.connect(db_url)
    .then(() => {
        console.log('CONNECTION SUCCESSFUL')
    })
    .catch(() => {
        console.log('CONNECTION FAILED')
    })

const sessionStore = MongoStore.create({
    mongoUrl: db_url,
    ttl: 1000 * 60 * 60 * 24
});

const sessionConfig = {
    secret: 'thisisabadsecret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}

app.engine('ejs', ejsMate)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.user = req.user || null
    res.locals.role = req.user && req.user.role ? req.user.role : null;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use((req, res, next) => {
    const originalUrl = req.originalUrl
    if (!originalUrl.startsWith('/auth/') || !originalUrl === '/') {
        req.session.returnTo = req.originalUrl || '/'
    }
    next()
})

restaurantRouter.use(express.static(path.join(__dirname, 'public')))
authRouter.use(express.static(path.join(__dirname, 'public')))
receiverRouter.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contacts', (req, res) => {
    res.render('contacts')
})

app.post('/contacts', CatchAsync(async (req, res) => {
    const { name, email, message } = req.body
    await sendMessage(email, name, message)
        .then(() => {
            console.log('Send Successfully')
            req.flash('success', 'Message has been delivered successfully')
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
            req.flash('error', 'Could not deliver message')
            res.redirect('/contacts')
        })
}))

app.use('/restaurants', restaurantRouter)
app.use('/receivers', receiverRouter)
app.use('/auth', authRouter)

app.get('*', (req, res) => {
    res.render('error')
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh No ! Something went wrong'
    console.log(err)
    res.status(statusCode).send(err)
})
app.listen(port, () => {
    console.log('LISTENING ON PORT 3000')
})
