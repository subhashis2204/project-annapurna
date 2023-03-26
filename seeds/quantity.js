const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')
const Quantity = require('../models/Quantity')

const createQuantity = async() => {
    // await Quantity.deleteMany({})
    const ids = await Restaurant.aggregate([
        { $unwind: '$restaurantMenu' },
        { $project: { _id: 0, restaurantId: '$_id', foodId: '$restaurantMenu._id' } }
    ])
    for (let id of ids) {
        const quantity = new Quantity({
            _id: {
                restaurantId: id.restaurantId,
                foodId: id.foodId
            },
            quantity: Math.floor(Math.random() * 10) + 1,
            shelf: Math.floor(Math.random() * 3) + 1
        })
        await quantity.save()
    }
    const quantities = await Quantity.find({})
    console.log(quantities)
}

module.exports = createQuantity