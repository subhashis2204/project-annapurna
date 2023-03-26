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
    }
})

const Donor = mongoose.model('Donor', donorSchema)
module.exports = Donor
