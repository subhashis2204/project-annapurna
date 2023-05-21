const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/CatchAsync')

const passport = require('passport')
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureMessage: true, failureRedirect: '/auth/login' }), catchAsync(async(req, res) => {
    req.flash('success', 'Logged in successfully')
    res.redirect('/')
}))

router.get('/roles', (req, res) => {
    res.render('auth/roles')
})

router.get('/logout', catchAsync(async(req, res) => {
    req.logout(err => {
        if (err) return next(err)
        req.flash('success', 'logged out successfully')

        res.redirect('/')
    })
}))

module.exports = router