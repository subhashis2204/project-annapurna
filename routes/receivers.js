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

const validateReceiver = (req, res, next) => {
    req.body.receiverAreaOfWork = req.body.receiverAreaOfWork.split(',').map(area => area.trim())
    req.body.idProofImg = req.file.url

    const { error } = receiverSchema.validate(req.body)
    if (error) {
        // console.log(error)
        const message = error.details.map(detail => detail.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

router.get('/new', (req, res) => {
    res.render('receivers/new')
})

router.post('/new', upload.single('image'), validateReceiver, catchAsync(async (req, res) => {
    const { receiverContactDetails, password } = req.body
    const receiverEmail = receiverContactDetails.email
    const receiver = new Receiver({ username: receiverEmail, ...req.body })
    // const auth = new AuthCredential({ _id: receiverEmail, role: 'receiver', password: password })

    const user = new User({ email: receiverEmail, role: 'receiver', documentReferenceId: receiver._id })
    await User.register(user, password)
        .then(async (doc) => {
            console.log(doc)

            await receiver.save()

            req.flash('success', 'successfully created a receiver')
            // res.redirect(`/receiver/${receiver._id}`)
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)

            req.flash('error', `${err.message}`)
            res.redirect('/receivers/new')
        })

    // await receiver.save()
    // await auth.save()

    // req.flash('success', 'Signed Up Successfully')

    // res.redirect('/')
}))

module.exports = router
