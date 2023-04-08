const mongoose = require('mongoose')

const donorSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    restaurantName: String,
    date: Date,
    donating: Boolean,
    fulfilled: Boolean,
    donatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receiver'
    },
    otpGenerated: {
        type: Boolean,
        default: false
    },
    otpVerified: {
        type: Boolean,
        default: false
    }
})

const Donor = mongoose.model('Donor', donorSchema)
module.exports = Donor
