const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')
const Quantity = require('../models/Quantity')
const Food = require('../models/Food')
const Donor = require('../models/Donor')
const Receiver = require('../models/Receiver')
const { receiverSchema } = require('../schemas')
const catchAsync = require('../utils/CatchAsync')
const ExpressError = require('../utils/ExpressError')
const upload = require('../utils/imageUpload')
const AuthCredential = require('../models/auth')
const User = require('../models/User')
const axios = require('axios')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')

const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

const validateReceiver = (req, res, next) => {
    req.body.receiverAreaOfWork = req.body.receiverAreaOfWork.split(',').map(area => area.trim())
    req.body.idProofImg = req.file.url

    const { error } = receiverSchema.validate(req.body)
    if (error) {
        const message = error.details.map(detail => detail.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

router.get('/new', (req, res) => {
    res.render('receivers/new')
})

// router.get('/:id', async (req, res) => {
//     const receiver = await Receiver.findById(id)


//     res.render('show',)
// })

router.post('/new', upload.single('image'), validateReceiver, catchAsync(async (req, res) => {
    const { receiverContactDetails, password } = req.body
    const receiverEmail = receiverContactDetails.email
    const receiver = new Receiver({ username: receiverEmail, ...req.body })
    const address = req.body.receiverAddress

    const geodata = await geocoder.forwardGeocode({
        query: `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
        limit: 1
    }).send()

    receiver.receiverAddress.geometry = geodata.body.features[0].geometry

    const user = new User({ email: receiverEmail, role: 'receiver', documentReferenceId: receiver._id })
    await User.register(user, password)
        .then(async (doc) => {
            console.log(doc)

            await receiver.save()


            console.log(receiver)
            req.flash('success', 'successfully created a receiver')
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)

            req.flash('error', `${err.message}`)
            res.redirect('/receivers/new')
        })
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params

    const receiver = await Receiver.findById(id)
    res.render('receivers/show', { receiver })
}))

module.exports = router
