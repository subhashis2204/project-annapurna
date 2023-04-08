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
const { restaurantSchema, restaurantUpdateSchema } = require('../schemas')
const AuthCredential = require('../models/auth')
const User = require('../models/User')
const { isLoggedIn } = require('../middleware')
const speakeasy = require('speakeasy')
const sendVerifyEmail = require('../email')
const OTP = require('../models/OTP');

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

router.get('/', catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
    res.render('hotels/index', { restaurants })
}))

router.get('/new', (req, res) => {
    res.render('hotels/new')
})

router.get('/donating', catchAsync(async (req, res) => {
    const presentDate = new Date().toISOString().slice(0, 10);
    // const indianDate = new Date().toLocaleString().format('YYYY-MM-DD');

    // console.log(indianDate)
    const donatingRestaurants = await Donor.find({ donating: true, date: new Date(presentDate).toISOString() }).populate({ path: 'restaurantId', select: 'restaurantName restaurantDescription' })

    console.log(donatingRestaurants)
    res.render('hotels/donating', { donatingRestaurants })
}))

router.post('/:id/verify', catchAsync(async (req, res) => {
    const { id } = req.params
    const otp = await OTP.findOne({ user: id }).sort({ created_at: 1 })
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

router.post('/:id/claimed', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

    donatingRestaurant.fulfilled = true
    donatingRestaurant.donatedTo = req.user.documentReferenceId

    const secret = speakeasy.generateSecret();
    const code = speakeasy.totp({ secret: secret.base32, encoding: 'base32' });
    const otp = new OTP({ user: id, code: code });

    otp.save(async (err) => {
        if (err) {
            req.flash('error', 'OTP could not be generated')
            throw err;
        }

        req.flash('success', 'OTP has been generated')

        donatingRestaurant.otpGenerated = true
        sendVerifyEmail('project.annapurna@outlook.com', 'subhashispaul2204@gmail.com', code)
        await donatingRestaurant.save()
    });

    res.redirect(`/restaurants/${id}`)
}))

// router.post('/:id/claimed', isLoggedIn, async (req, res, next) => {
//     const session = await mongoose.startSession()
//     session.startTransaction()

//     const { id } = req.params

//     try {
//         const presentDate = new Date().toISOString().slice(0, 10)
//         const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

//         donatingRestaurant.fulfilled = true
//         donatingRestaurant.donatedTo = req.user.documentReferenceId

//         donatingRestaurant.otpGenerated = true
//         await donatingRestaurant.save({ session })



//         const secret = speakeasy.generateSecret();
//         const code = speakeasy.totp({
//             secret: secret.base32,
//             encoding: 'base32'
//         });

//         const otp = new OTP({ user: id, code: code });

//         otp.save({ session });

//         sendVerifyEmail('project.annapurna@outlook.com', 'subhashispaul2204@gmail.com', code)
//         await session.commitTransaction();
//     } catch (err) {
//         req.flash('error', 'could not send otp')
//         await session.abortTransaction()
//         return next(err)
//     } finally {
//         session.endSession()
//         res.redirect(`/restaurants/${id}`)
//     }
// })

router.post('/:id/cancelDonate', catchAsync(async (req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    await Donor.findOneAndDelete({ restaurantId: id, date: new Date(presentDate).toISOString() })
    res.redirect(`/restaurants/${id}`)
}))


router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params
    const presentDate = new Date().toISOString().slice(0, 10);
    const restaurant = await Restaurant.findById(id)
    const donations = await Donor.find({ restaurantId: restaurant._id }).sort({ date: -1 }).populate('donatedTo', 'receiverName')

    const donationToday = await Donor.findOne({ restaurantId: id, date: presentDate }) || null
    const fulfilled = donationToday ? donationToday.fulfilled : false

    if (donationToday) {
        donationToday.otpGenerated = true
    }

    res.render('hotels/show', { restaurant, donations, donationToday, fulfilled })
}))

router.get('/:id/edit', catchAsync(async (req, res, next) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) {
        req.flash('error', 'Restaurant Not Found')
        throw new ExpressError('Resaturant Not Found', 404)
    }

    res.render('hotels/edit', { restaurant })
}))

router.put('/:id/edit', validateRestaurantUpdate, catchAsync(async (req, res) => {
    const { id } = req.params

    await Restaurant.findByIdAndUpdate(id, { ...req.body }, { runValidators: true })
        .then(restaurant => {
            console.log(restaurant)
            return res.redirect(`/restaurants/${restaurant._id}`)
        })
        .catch(err => {
            req.flash('error', 'Restaurant Could Not be Updated')
            return next(err)
        })
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    await Restaurant.findByIdAndDelete(id)

    res.redirect('/restaurants')
}))

router.post('/new', validateRestaurant, catchAsync(async (req, res) => {
    const { restaurantContactDetails, password } = req.body
    const restaurantEmail = restaurantContactDetails.email
    const restaurant = new Restaurant({ username: restaurantEmail, ...req.body })

    const newcredential = new User({ email: restaurantEmail, documentReferenceId: restaurant._id, role: 'donor' })
    // await User.register(newcredential, password)
    //     .then(async (user) => {
    //         console.log(user)
    //         await restaurant.save()

    //         req.login(user, (err) => {
    //             if (err) next(err)
    //             req.flash('success', 'Successfully Created Restaurant')
    //             res.redirect(`/restaurants/${restaurant._id}`)
    //         })
    //     })
    //     .catch(err => {
    //         req.flash('error', 'This email is already taken')
    //         res.redirect('/restaurants/new')

    //     })

    const user = await User.register(newcredential, password)
    console.log(user)
    res.redirect('/')

}))

module.exports = router





// const express = require('express')
// const router = express.Router()
// const mongoose = require('mongoose')
// const Restaurant = require('../models/Restaurant')
// const Quantity = require('../models/Quantity')
// const Food = require('../models/Food')
// const Donor = require('../models/Donor')
// const Receiver = require('../models/Receiver')
// const ExpressError = require('../utils/ExpressError')
// const catchAsync = require('../utils/CatchAsync')
// const { restaurantSchema, restaurantUpdateSchema } = require('../schemas')
// const AuthCredential = require('../models/auth')
// const User = require('../models/User')
// const { isLoggedIn } = require('../middleware')

// const sendVerifyEmail = require('../email')

// const OTP = require('../models/otp')
// const speakeasy = require('speakeasy');

// const validateRestaurant = (req, res, next) => {
//     console.log(req.body)
//     const { error } = restaurantSchema.validate(req.body)
//     if (error) {
//         // console.log(error)
//         const message = error.details.map(detail => detail.message).join(',')
//         // const message = 'there is some error here'
//         throw new ExpressError(message, 400)
//     } else {
//         next()
//     }
// }
// const validateRestaurantUpdate = (req, res, next) => {
//     console.log(req.body)
//     const { error } = restaurantUpdateSchema.validate(req.body)
//     if (error) {
//         // console.log(error)
//         const message = error.details.map(detail => detail.message).join(',')
//         // const message = 'there is some error here'
//         throw new ExpressError(message, 400)
//     } else {
//         next()
//     }
// }

// router.get('/', catchAsync(async (req, res) => {
//     const restaurants = await Restaurant.find({})
//     res.render('hotels/index', { restaurants })
// }))

// router.get('/new', (req, res) => {
//     res.render('hotels/new')
// })

// router.get('/donating', catchAsync(async (req, res) => {
//     const presentDate = new Date().toISOString().slice(0, 10);
//     // const indianDate = new Date().toLocaleString().format('YYYY-MM-DD');

//     // console.log(indianDate)
//     const donatingRestaurants = await Donor.find({ donating: true, date: new Date(presentDate).toISOString() }).populate({ path: 'restaurantId', select: 'restaurantName restaurantDescription' })

//     console.log(donatingRestaurants)
//     res.render('hotels/donating', { donatingRestaurants })
// }))

// router.post('/:id/donate', async (req, res) => {
//     const { id } = req.params
//     const restaurant = await Restaurant.findById(id)
//     const presentDate = new Date().toISOString().slice(0, 10);
//     const donor = new Donor({
//         restaurantId: id,
//         restaurantName: restaurant.restaurantName,
//         date: new Date(presentDate).toISOString(),
//         donating: true,
//         fulfilled: false
//     })
//     await donor.save()

//     res.redirect(`/restaurants/${id}`)
// })

// router.post('/:id/claimed', isLoggedIn, catchAsync(async (req, res) => {
//     const { id } = req.params
//     const presentDate = new Date().toISOString().slice(0, 10);
//     const donatingRestaurant = await Donor.findOne({ restaurantId: id, date: new Date(presentDate).toISOString() })

//     console.log(donatingRestaurant)

//     donatingRestaurant.fulfilled = true
//     donatingRestaurant.donatedTo = req.user.documentReferenceId
//     donatingRestaurant.otpGenerated = true
//     await donatingRestaurant.save()

//     const secret = speakeasy.generateSecret();
//     const code = speakeasy.totp({
//         secret: secret.base32,
//         encoding: 'base32'
//     });

//     // create and save a new OTP document
//     const otp = new OTP({
//         user: id, // replace with the user ID
//         code: code
//     });

//     otp.save((err) => {
//         if (err) throw err;

//         sendVerifyEmail('project.annapurna@outlook.com', 'subhashispaul2204@gmail.com', code)
//         console.log(`OTP ${code} created and saved for user ${id}}`);
//     });
//     res.redirect(`/restaurants/${id}`)
// }))

// router.post('/:id/cancelDonate', catchAsync(async (req, res) => {
//     const { id } = req.params
//     const presentDate = new Date().toISOString().slice(0, 10);
//     await Donor.findOneAndDelete({ restaurantId: id, date: new Date(presentDate).toISOString() })
//     res.redirect(`/restaurants/${id}`)
// }))


// router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
//     const { id } = req.params
//     const presentDate = new Date().toISOString().slice(0, 10);
//     const restaurant = await Restaurant.findById(id)
//     const donations = await Donor.find({ restaurantId: restaurant._id }).sort({ date: -1 }).populate('donatedTo', 'receiverName')

//     const donationToday = await Donor.findOne({ restaurantId: id, date: presentDate }) || null
//     const fulfilled = donationToday ? donationToday.fulfilled : false

//     // const otpgen = donationToday ? donationToday.otpGenerated : false

//     if (donationToday)
//         donationToday.otpGenerated = true
//     res.render('hotels/show', { restaurant, donations, donationToday, fulfilled })
// }))

// router.get('/:id/edit', catchAsync(async (req, res, next) => {
//     const { id } = req.params
//     const restaurant = await Restaurant.findById(id)

//     if (!restaurant) {
//         req.flash('error', 'Restaurant Not Found')
//         throw new ExpressError('Resaturant Not Found', 404)
//     }

//     res.render('hotels/edit', { restaurant })
// }))

// router.put('/:id/edit', validateRestaurantUpdate, catchAsync(async (req, res) => {
//     const { id } = req.params

//     await Restaurant.findByIdAndUpdate(id, { ...req.body }, { runValidators: true })
//         .then(restaurant => {
//             console.log(restaurant)
//             return res.redirect(`/restaurants/${restaurant._id}`)
//         })
//         .catch(err => {
//             req.flash('error', 'Restaurant Could Not be Updated')
//             return next(err)
//         })
// }))

// router.delete('/:id', catchAsync(async (req, res) => {
//     const { id } = req.params
//     await Restaurant.findByIdAndDelete(id)

//     res.redirect('/restaurants')
// }))

// router.post('/new', validateRestaurant, catchAsync(async (req, res, next) => {
//     const { restaurantContactDetails, password } = req.body
//     const restaurantEmail = restaurantContactDetails.email
//     const restaurant = new Restaurant({ username: restaurantEmail, ...req.body })

//     const newcredential = new User({ email: restaurantEmail, documentReferenceId: restaurant._id, role: 'donor' })
//     // await User.register(newcredential, password)
//     //     .then(async (user) => {
//     //         console.log(user)
//     //         await restaurant.save()

//     //         req.login(user, (err) => {
//     //             if (err) next(err)
//     //             req.flash('success', 'Successfully Created Restaurant')
//     //             res.redirect(`/restaurants/${restaurant._id}`)
//     //         })
//     //     })
//     //     .catch(err => {
//     //         req.flash('error', 'This email is already taken')
//     //         res.redirect('/restaurants/new')

//     //     })

//     const user = await User.register(newcredential, password)

//     if (!user) {
//         req.flash('error', 'This email is already taken')
//         throw new ExpressError('user cannot be created', 404)
//     }

//     // console.log('fuck you')

//     await restaurant.save()
//         .then((data) => {
//             console.log(data)
//         })
//         .catch(err => { throw err })
//     // const newRestaurant = await restaurant.save()
//     // if (!newRestaurant) {
//     //     req.flash('error', 'user could not be created')

//     //     await User.findByIdAndDelete(user._id)
//     //     throw new ExpressError('user cannot be created', 404)
//     // }

//     // console.log(newRestaurant, 'hello world')
//     req.flash('success', 'Successfully Created Restaurant')
//     // res.redirect(`/restaurants/${newRestaurant._id}`)
//     res.redirect(`/restaurants/new`)
// }))


// module.exports = router
