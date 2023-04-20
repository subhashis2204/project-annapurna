const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')
const Donor = require('../models/Donor')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/CatchAsync')
const { restaurantSchema, restaurantUpdateSchema } = require('../schemas')
const User = require('../models/User')
const { isLoggedIn, isRestaurant } = require('../middleware')
const OTP = require('../models/otp')
const { sendVerifyEmail } = require('../email')
const speakeasy = require('speakeasy');
const axios = require('axios')

const removeInvalidCredentialInsertion = async(req, res, user) => {
    if (user)
        await User.findByIdAndDelete(user._id)
}

const sendOTP = async(id) => {
    const restaurant = await Restaurant.findById(id)
    const secret = speakeasy.generateSecret();
    const code = speakeasy.totp({ secret: secret.base32, encoding: 'base32' });
    const otp = new OTP({ user: id, code });
    await otp.save()
        .then(() => {
            sendVerifyEmail('project.annapurna@outlook.com', 'subhashispaul2204@gmail.com', code)
                // sendVerifyEmail('project.annapurna@outlook.com', restaurant.restaurantContactDetails.email, code)
            console.log(`OTP ${code} created and saved for user ${restaurant._id}}`);
        })
        .catch(err => {
            throw err
        })
}

const validateRestaurant = (req, res, next) => {
    const { error } = restaurantSchema.validate(req.body)
    if (error) {
        const message = error.details.map(detail => detail.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}
const validateRestaurantUpdate = (req, res, next) => {
    const { error } = restaurantUpdateSchema.validate(req.body)
    if (error) {
        const message = error.details.map(detail => detail.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

router.get('/', catchAsync(async(req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('hotels/index', { restaurants })
}))

router.get('/new', (req, res) => {
    res.render('hotels/new')
})

router.post('/new', validateRestaurant, catchAsync(async(req, res) => {
    const { restaurantContactDetails, password } = req.body
    const restaurantEmail = restaurantContactDetails.email
    const restaurant = new Restaurant({ username: restaurantEmail, ...req.body })
    const user = new User({ email: restaurantEmail, documentReferenceId: restaurant._id, role: 'donor' })
    const address = req.body.restaurantAddress

    const params = {
        address: `${this.restaurantName},${address.street}, ${address.city}, ${address.state},${address.zip}, ${address.country}`,
        key: process.env.GOOGLEMAP_TOKEN
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params })

    const { lat, lng } = response.data.results[0].geometry.location
    const geometry = {
        type: 'Point',
        coordinates: [lng, lat]
    }
    restaurant.restaurantAddress.geometry = geometry

    try {
        const newuser = await User.register(user, password)
        const newRestaurant = await restaurant.save()

        req.login(newuser, function(err) {
            if (err) { return next(err) }

            req.flash('success', 'Created a restaurant successfully')
            return res.redirect('/restaurants/' + newRestaurant._id)
        })

    } catch (err) {
        req.flash('error', 'Restaurant could not be registered')
        return res.redirect('/restaurants/new')
    }
}))

router.get('/donating', catchAsync(async(req, res) => {
    const presentDate = new Date().toISOString().slice(0, 10);
    const donatingRestaurants = await Donor.find({ donating: true, date: new Date(presentDate).toISOString() }).populate({ path: 'restaurantId', select: 'restaurantName restaurantDescription' })

    // console.log(donatingRestaurants)
    res.render('hotels/donating', { donatingRestaurants })
}))

router.post('/:id/donate', async(req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    const presentDate = new Date().toISOString().slice(0, 10);
    const donor = new Donor({
        restaurantId: id,
        restaurantName: restaurant.restaurantName,
        date: new Date(presentDate).toISOString(),
        donating: true,
        fulfilled: false
    })
    await donor.save()

    res.redirect(`/restaurants/${id}`)
})

router.post('/:id/claimed', isLoggedIn, catchAsync(async(req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

    // console.log(donatingRestaurant)

    donatingRestaurant.fulfilled = true
    donatingRestaurant.donatedTo = req.user.documentReferenceId
    donatingRestaurant.otpGenerated = true
    await donatingRestaurant.save()

    await sendOTP(id)

    res.redirect(`/restaurants/${id}`)
}))

router.post('/:id/cancelDonate', catchAsync(async(req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    await Donor.findOneAndDelete({ restaurantId: id, date: new Date(presentDate).toISOString() })

    const otps = await OTP.find({ user: id }, { _id: 1 })
    await OTP.deleteMany({ _id: { $in: otps } })

    res.redirect(`/restaurants/${id}`)
}))

router.post('/:id/verify', catchAsync(async(req, res) => {
    const { id } = req.params
    const otp = await OTP.findOne({ user: id })

    if (!otp) {
        req.flash('error', 'This donation has not been claimed')
        return res.redirect('/restaurants/' + id)
    }

    const receivedOtp = req.body.otp.join('')
        // console.log(otp.code, receivedOtp)

    if (receivedOtp === otp.code) {
        const presentDate = new Date().toISOString().slice(0, 10);
        const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

        donatingRestaurant.otpVerified = true
            // console.log('Hello', donatingRestaurant)
        await donatingRestaurant.save()

        req.flash('success', 'OTP verified Successfully')
    } else {
        req.flash('error', 'Invalid OTP')
    }
    res.redirect(`/restaurants/${id}`)
}))

router.get('/:id', isLoggedIn, catchAsync(async(req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
        req.flash('error', 'Could Not Find Restaurant')
        throw new ExpressError('Could not find page', 404)
    }
    const presentDate = new Date().toISOString().slice(0, 10);
    const donations = await Donor.find({ restaurantId: restaurant._id }).sort({ date: -1 }).populate('donatedTo', 'receiverName')

    const donatingToday = await Donor.findOne({ restaurantId: id, date: presentDate }) || null
    const fulfilled = donatingToday ? donatingToday.fulfilled : false

    if (donatingToday)
        donatingToday.otpGenerated = true
    res.render('hotels/show', { restaurant, donations, donatingToday, fulfilled })
}))

router.get('/:id/edit', isLoggedIn, isRestaurant, catchAsync(async(req, res, next) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
        req.flash('error', 'Restaurant Not Found')
        throw new ExpressError('Resaturant Not Found', 404)
    }

    res.render('hotels/edit', { restaurant })
}))

router.put('/:id/edit', isLoggedIn, isRestaurant, validateRestaurantUpdate, catchAsync(async(req, res, next) => {
    const { id } = req.params

    await Restaurant.findByIdAndUpdate(id, {...req.body }, { runValidators: true })
        .then(restaurant => {
            // console.log(restaurant.restaurantAddress.geometry)
            return res.redirect('/restaurants/' + restaurant._id)
        })
        .catch(err => {
            req.flash('error', 'Restaurant Could Not be Updated')
            throw err
        })
}))

router.delete('/:id', isLoggedIn, isRestaurant, catchAsync(async(req, res) => {
    const { id } = req.params

    const restaurant = await Restaurant.findByIdAndDelete(id)
    if (!restaurant) {
        req.flash('error', 'No restaurant Found')
        throw new Error('No restaurant Found')
    }

    await User.findOneAndDelete({ email: restaurant.username })

    req.logout(err => {
        if (err)
            console.log(err)
        console.log('Logged Out Successfully')
    })
    req.flash('success', 'Deleted a Restaurant')
    res.redirect('/')
}))

module.exports = router