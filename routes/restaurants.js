const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')
const Quantity = require('../models/Quantity')
const Food = require('../models/Food')
const Donor = require('../models/Donor')
const Receiver = require('../models/Receiver')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/CatchAsync')
const { restaurantSchema } = require('../schemas')
const AuthCredential = require('../models/auth')
const User = require('../models/User')
const { validateRequest } = require('../middleware')

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

router.get('/', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('hotels/index', { restaurants })
}))

router.get('/new', (req, res) => {
    res.render('hotels/new')
})

router.post('/new', validateRestaurant, catchAsync(async (req, res) => {
    const { restaurantContactDetails, password } = req.body
    const restaurantEmail = restaurantContactDetails.email
    const restaurant = new Restaurant({ username: restaurantEmail, ...req.body })
    // const credential = new AuthCredential({ _id: restaurantEmail, password: password, role: 'donor' })

    // await credential.save()
    // await restaurant.save()

    const newcredential = new User({ email: restaurantEmail, documentReferenceId: restaurant._id, role: 'donor' })
    await User.register(newcredential, password)
        .then(async (user) => {
            console.log(user)
            await restaurant.save()

            req.flash('success', 'Successfully Created Restaurant')
            res.redirect(`/restaurants/${restaurant._id}`)
        })
        .catch(err => {
            // console.log(err.details)

            req.flash('error', 'This email is already taken')
            res.redirect('/restaurants/new')
        })


    // console.log(req.body)
    // res.redirect(`/restaurants/${restaurant._id}`)
    // res.send('Form submitted successfully')
}))

router.get('/donating', catchAsync(async (req, res) => {
    const presentDate = new Date().toISOString().slice(0, 10);
    const donatingRestaurants = await Donor.find({ donating: true, date: new Date(presentDate).toISOString() }).populate({ path: 'restaurantId', select: 'restaurantName restaurantDescription' })

    console.log(donatingRestaurants)
    res.render('hotels/donating', { donatingRestaurants })
}))

router.post('/:id/donate', async (req, res) => {
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

router.post('/:id/claimed', validateRequest, catchAsync(async (req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

    donatingRestaurant.fulfilled = true
    await donatingRestaurant.save()

    res.send('hwllo')
}))

router.post('/:id/cancelDonate', catchAsync(async (req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    await Donor.findOneAndDelete({ restaurantId: id, date: new Date(presentDate).toISOString() })
    res.redirect(`/restaurants/${id}`)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    const restaurant = await Restaurant.findById(id)
    const donations = await Donor.find({ restaurantId: restaurant._id }).sort({ date: -1 }).populate('donatedTo')
    const donationToday = await Donor.findOne({ restaurantId: id, date: presentDate })

    res.render('hotels/show', { restaurant, donations, donationToday })
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    res.render('hotels/edit', { restaurant })
}))

router.put('/:id/edit', validateRestaurant, catchAsync(async (req, res) => {
    const { id } = req.params
    await Restaurant.findByIdAndUpdate(id, { ...req.body }, { runValidators: true })

    res.redirect(`/restaurants/${id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    await Restaurant.findByIdAndDelete(id)

    res.redirect('/restaurants')
}))

// router.get('/:id', async(req, res) => {
//     const restaurant = await Restaurant.findById(req.params.id)
//     const { id } = req.params

//     const quantities = await Quantity.aggregate([
//         { $match: { '_id.restaurantId': new mongoose.Types.ObjectId(id) } },
//         { $group: { _id: '$_id.foodId', totalQty: { $sum: '$quantity' } } },
//         {
//             $lookup: {
//                 from: 'foods',
//                 localField: '_id',
//                 foreignField: '_id',
//                 as: 'foodDetails',
//             }
//         },
//         { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$foodDetails', 0] }, '$$ROOT'] } } },
//         { $project: { _id: 0, category: '$foodCategory', quantity: '$totalQty' } }
//     ])
//     res.render('hotels/show', { restaurant, quantities })
// })

module.exports = router
