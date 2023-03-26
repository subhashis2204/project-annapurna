const mongoose = require('mongoose')
const createFoodItems = require('./seeds/food')
const createRestaurant = require('./seeds/restaurants')
const createQuantity = require('./seeds/quantity')

mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('CONNECTION SUCCESSFUL')
    })
    .catch(() => {
        console.log('CONNECTION FAILED')
    })

const seedDatabase = async() => {
    await createFoodItems()
    await createRestaurant()
    await createQuantity()
}

// seedDatabase()