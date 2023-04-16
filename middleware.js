const Receiver = require("./models/Receiver")
const Restaurant = require("./models/Restaurant")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please Login Before Claiming Donation')
        return res.redirect('/auth/login')
    }
    next()
}

module.exports.isReceiver = async (req, res, next) => {
    const { id } = req.params
    const receiver = await Receiver.findById(id)
    if (req.user.email !== receiver.username) {
        req.flash('error', 'You do not have required permissions')
        return res.redirect('/receivers/' + id)
    }
    next()
}

module.exports.isRestaurant = async (req, res, next) => {
    const { id } = req.params
    const restaurant = await Restaurant.findById(id)
    if (req.user.email !== restaurant.username) {
        req.flash('error', 'You do not have required permissions')
        return res.redirect('/restaurants/' + id)
    }
    next()
}

module.exports.setReturnUrl = (req, res, next) => {
    res.locals.returnTo = req.session.returnTo
    next()
}
