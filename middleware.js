module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please Login Before Claiming Donation')
        return res.redirect('/auth/login')
    }
    next()
}
module.exports.isReceiver = (req, res, next) => {
    if (req.user.role !== 'receiver') {
        req.flash('error', 'Restaurants Are Not Allowed')
        return res.redirect('/')
    }
    next()
}
module.exports.isDonor = (req, res, next) => {
    if (req.user.role !== 'donor') {
        req.flash('error', 'Receivers Are Not Allowed')
        return res.redirect('/')
    }
    next()
}

module.exports.setReturnUrl = (req, res, next) => {
    res.locals.returnTo = req.session.returnTo
    next()
}