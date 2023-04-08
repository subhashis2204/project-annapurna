const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')
const Quantity = require('../models/Quantity')
const Food = require('../models/Food')
const Donor = require('../models/Donor')
const Receiver = require('../models/Receiver')
const upload = require('../utils/imageUpload')
const catchAsync = require('../utils/CatchAsync')
const AuthCredential = require('../models/auth')
const { setReturnUrl } = require('../middleware')

const passport = require('passport')
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', setReturnUrl, passport.authenticate('local', { failureFlash: true, failureMessage: true, failureRedirect: '/auth/login' }), catchAsync(async (req, res) => {

    const redirectUrl = res.locals.returnTo || '/'
    console.log(redirectUrl)
    const { email } = req.body

    await User.findOne({ email })
        .then(async (doc) => {
            console.log(doc)
            const Model = doc.role === 'donor' ? Restaurant : Receiver

            const foundObject = await Model.findOne({ username: doc.email })
            console.log(foundObject)
        })

    // delete req.redirectTo
    // console.log(req)

    // console.log(req.user)

    req.flash('success', 'Logged in successfully')
    res.redirect(redirectUrl)
}))

router.get('/roles', (req, res) => {
    res.render('auth/roles')
})

router.get('/logout', catchAsync(async (req, res) => {
    req.logout(err => {
        if (err) return next(err)
        req.flash('success', 'logged out successfully')

        res.redirect('/')
    })
}))

module.exports = router
