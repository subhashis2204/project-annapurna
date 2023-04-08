const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')
const Donor = require('../models/Donor')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/CatchAsync')
const { restaurantSchema, restaurantUpdateSchema } = require('../schemas')
const User = require('../models/User')
const { isLoggedIn } = require('../middleware')
const OTP = require('../models/otp')
const sendVerifyEmail = require('../email')
const speakeasy = require('speakeasy');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const axios = require('axios')

const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

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
    console.log(req.body)
    const { error } = restaurantSchema.validate(req.body)
    if (error) {
        // console.log(error)
        const message = error.details.map(detail => detail.message).join(',')
            // const message = 'there is some error here'
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}
const validateRestaurantUpdate = (req, res, next) => {
    console.log(req.body)
    const { error } = restaurantUpdateSchema.validate(req.body)
    if (error) {
        // console.log(error)
        const message = error.details.map(detail => detail.message).join(',')
            // const message = 'there is some error here'
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
    const newcredential = new User({ email: restaurantEmail, documentReferenceId: restaurant._id, role: 'donor' })
    const address = req.body.restaurantAddress

    const params = {
        address: `${this.restaurantName},${address.street}, ${address.city}, ${address.state},${address.zip}, ${address.country}`,
        key: process.env.GOOGLEMAP_TOKEN
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params })

    // const geodata = await geocoder.forwardGeocode({
    //     query: `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
    //     limit: 1
    // }).send()

    // restaurant.restaurantAddress.geometry = geodata.body.features[0].geometry

    const { lat, lng } = response.data.results[0].geometry.location
    const geometry = {
        type: 'Point',
        coordinates: [lng, lat]
    }
    restaurant.restaurantAddress.geometry = geometry

    await User.register(newcredential, password)
        .then(async user => {
            console.log('User created successfully')

            await restaurant.save()
                .then(restaurant => {
                    console.log('Restaurant created successfully', restaurant)

                    req.flash('success', 'Successfully created a Restaurant')
                    res.redirect(`/restaurants/${restaurant._id}`)
                })
                .catch(async err => {
                    await removeInvalidCredentialInsertion(req, res, user)
                    throw err
                })
        })
        .catch(err => {
            req.flash('error', 'Failed to create a Restaurant')
            res.redirect('/restaurants/new')
            throw err
        })
}))

router.get('/donating', catchAsync(async(req, res) => {
    const presentDate = new Date().toISOString().slice(0, 10);
    const donatingRestaurants = await Donor.find({ donating: true, date: new Date(presentDate).toISOString() }).populate({ path: 'restaurantId', select: 'restaurantName restaurantDescription' })

    console.log(donatingRestaurants)
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

    console.log(donatingRestaurant)

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
    const receivedOtp = req.body.otp.join('')
    console.log(otp.code, receivedOtp)

    if (receivedOtp === otp.code) {
        const presentDate = new Date().toISOString().slice(0, 10);
        const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

        donatingRestaurant.otpVerified = true
        console.log('Hello', donatingRestaurant)
        await donatingRestaurant.save()

        req.flash('success', 'OTP verified Successfully')
    } else {
        req.flash('error', 'Invalid OTP')
    }
    res.redirect(`/restaurants/${id}`)
}))

router.get('/:id', isLoggedIn, catchAsync(async(req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    const restaurant = await Restaurant.findById(id)
    const donations = await Donor.find({ restaurantId: restaurant._id }).sort({ date: -1 }).populate('donatedTo', 'receiverName')

    const donationToday = await Donor.findOne({ restaurantId: id, date: presentDate }) || null
    const fulfilled = donationToday ? donationToday.fulfilled : false

    if (donationToday)
        donationToday.otpGenerated = true
    res.render('hotels/show', { restaurant, donations, donationToday, fulfilled })
}))

router.get('/:id/edit', catchAsync(async(req, res, next) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
        req.flash('error', 'Restaurant Not Found')
        throw new ExpressError('Resaturant Not Found', 404)
    }

    res.render('hotels/edit', { restaurant })
}))

router.put('/:id/edit', validateRestaurantUpdate, catchAsync(async(req, res, next) => {
    const { id } = req.params

    await Restaurant.findByIdAndUpdate(id, {...req.body }, { runValidators: true })
        .then(restaurant => {
            console.log(restaurant)
            return res.redirect(`/restaurants/${restaurant._id}`)
        })
        .catch(err => {
            req.flash('error', 'Restaurant Could Not be Updated')
            throw err
        })
}))

router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)

    await Restaurant.findByIdAndDelete(id)
    await User.findByUsername(restaurant.username)

    req.flash('success', 'Deleted a Restaurant')
    res.redirect('/restaurants')
}))

module.exports = router