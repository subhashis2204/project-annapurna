const mongoose = require('mongoose')

const quantitySchema = new mongoose.Schema({
    _id: {
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        createdAt: Date,
    },
    quantity: Number,
    shelf: Number,
    useBy: Date
})

quantitySchema.index({ '_id.restaurantId': 1, '_id.foodId': 1 })

quantitySchema.pre('save', function() {
    let presentDate = new Date()
    let finalDate = new Date(presentDate)
    finalDate.setDate(finalDate.getDate() + this.shelf)

    this._id.createdAt = presentDate.toISOString()
    this.useBy = finalDate.toISOString()
})

// quantitySchema.post('save', function (doc) {
//     console.log(doc)
// })

const Quantity = mongoose.model('Quantity', quantitySchema)

module.exports = Quantity