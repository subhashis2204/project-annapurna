const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodCategory: String,
    foodDescription: String,
    imgURL: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png'
    }
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food