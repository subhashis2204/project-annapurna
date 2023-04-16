const express = require('express')
const router = express.Router()
const Receiver = require('../models/Receiver')
const { receiverSchema, receiverUpdateSchema } = require('../schemas')
const catchAsync = require('../utils/CatchAsync')
const ExpressError = require('../utils/ExpressError')
const upload = require('../utils/imageUpload')
const User = require('../models/User')
const { BlobServiceClient } = require('@azure/storage-blob');
const { isLoggedIn, isReceiver } = require('../middleware')
const axios = require('axios')

const validateReceiver = (req, res, next) => {
    req.body.receiverAreaOfWork = req.body.receiverAreaOfWork.split(',').map(area => area.trim())
    req.body.idProofImg = { url: req.file.url, blobName: req.file.blobName }

    const { error } = receiverSchema.validate(req.body)
    if (error) {
        const message = error.details.map(detail => detail.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

const validateReceiverUpdate = (req, res, next) => {
    console.log(req.body)
    req.body.receiverAreaOfWork = req.body.receiverAreaOfWork.split(',').map(area => area.trim())

    if (req.file)
        req.body.idProofImg = { url: req.file.url, blobName: req.file.blobName }

    const { error } = receiverUpdateSchema.validate(req.body)
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

router.post('/new', upload.single('image'), validateReceiver, catchAsync(async (req, res) => {
    const { receiverContactDetails, password } = req.body
    const receiverEmail = receiverContactDetails.email
    const receiver = new Receiver({ username: receiverEmail, ...req.body })
    const address = req.body.receiverAddress

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
    receiver.receiverAddress.geometry = geometry

    const newuser = new User({ email: receiverEmail, role: 'receiver', documentReferenceId: receiver._id })

    await User.register(newuser, password)
        .then(async user => {

            await receiver.save()
                .then(receiver => {
                    req.flash('success', 'Successfully Created Your Profile')
                    res.redirect('/receivers/' + receiver._id)
                })
                .catch(async err => {
                    delete req.user
                    await removeInvalidCredentialInsertion(req, res, user)
                    throw err
                })

            req.login(user, (err) => {
                if (err) {
                    // req.flash('error', 'Failed to Log You In')
                    res.redirect('/auth/login')
                }
                // req.flash('success', 'Successfully Logged You In')
            })
        })
        .catch(err => {
            req.flash('error', 'Failed to Create Your Profile')
            res.redirect('/receivers/new')
            throw err
        })
}))

router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params

    const receiver = await Receiver.findById(id)
    res.render('receivers/show', { receiver })
}))

router.get('/:id/edit', isLoggedIn, isReceiver, catchAsync(async (req, res, next) => {
    const { id } = req.params
    const receiver = await Receiver.findById(id)

    if (!receiver) {
        req.flash('error', 'NGO not found')
        throw new ExpressError('NGO not found', 404)
    }

    res.render('receivers/edit', { receiver })
}))

router.post('/:id/edit', isLoggedIn, isReceiver, upload.single('image'), validateReceiverUpdate, catchAsync(async (req, res, next) => {
    const { id } = req.params
    const receiver = await Receiver.findById(id)

    if (req.file) {
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);
        const blobClient = containerClient.getBlobClient(receiver.idProofImg.blobName);
        await blobClient.delete();
    }

    const newReceiver = await Receiver.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    console.log(newReceiver)
    res.redirect('/receivers/' + id)
}))

router.delete('/:id', isLoggedIn, isReceiver, catchAsync(async (req, res) => {
    const { id } = req.params

    const receiver = await Receiver.findByIdAndDelete(id)
    if (!receiver) {
        req.flash('error', 'No receiver Found')
        throw new Error('No receiver Found')
    }

    await User.findOneAndDelete({ email: receiver.username })

    req.logout(err => {
        if (err)
            console.log(err)
        console.log('Logged Out Successfully')
    })
    req.flash('success', 'Deleted a Receiver')
    res.redirect('/')
}))

module.exports = router
