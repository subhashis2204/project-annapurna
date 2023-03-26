const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStratergy = require('passport-local')

const sessionConfig = {
    secret: 'thisisabadsecret',
    resave: false,
    saveUninitialized: false
}

mongoose.set('strictQuery', false);

// importing all the routes
const authRouter = require('./routes/auth')
const restaurantRouter = require('./routes/restaurants')
const receiverRouter = require('./routes/receivers')

const methodOverride = require('method-override')
// const AuthCredential = require('./models/auth')
const User = require('./models/User')
const CatchAsync = require('./utils/CatchAsync')

mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('CONNECTION SUCCESSFUL')
    })
    .catch(() => {
        console.log('CONNECTION FAILED')
    })


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
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use((req, res, next) => {
    res.locals.uid = req.session.uid || false
    res.locals.uid = req.session.uid || false
    next()
})

restaurantRouter.use(express.static(path.join(__dirname, 'public')))
authRouter.use(express.static(path.join(__dirname, 'public')))
receiverRouter.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

// app.get('/fakeUser', CatchAsync(async (req, res) => {
//     const user = new User({ email: 'subhashispaul2207@gmail.com', role: 'receiver' })
//     const newUser = await User.register(user, 'password')
//     console.log(newUser)
//     res.send('good choice successfull')
// }))

app.use('/restaurants', restaurantRouter)
app.use('/receivers', receiverRouter)
app.use('/auth', authRouter)

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh No ! Something went wrong'
    console.log(err.message, 'HELLO WORLD')
    res.status(statusCode).send(err)
})
app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})
