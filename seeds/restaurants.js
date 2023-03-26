const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')
const Food = require('../models/Food');

mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('CONNECTION SUCCESSFUL')
    })
    .catch(() => {
        console.log('CONNECTION FAILED')
    })

const createRestaurant = async () => {
    // await Restaurant.deleteMany({})
    const foods = await Food.find({}, { _id: 1, foodName: 1 })
    for (let idx = 0; idx < 5; idx++) {
        const restaurant = new Restaurant({
            restaurantName: faker.company.name(),
            restaurantAddress: {
                zip: faker.address.zipCode('######'),
                city: faker.address.city(),
                state: faker.address.state(),
                street: faker.address.street(),
                country: faker.address.country(),
                location: {
                    lat: faker.address.latitude(),
                    lng: faker.address.longitude()
                }
            },
            restaurantDescription: faker.lorem.lines(10),
            restaurantContact: {
                email: faker.internet.email(),
                phone: faker.phone.number('+91 9#### #####')
            },
            restaurantMenu: []
        })
        const randomInt = Math.floor(Math.random() * 10) + 1;
        const ids = []

        while (ids.length < randomInt) {
            let t = Math.floor(Math.random() * randomInt)
            if (!ids.includes(foods[t])) {
                ids.push(foods[t])
                restaurant.restaurantMenu.push(foods[t])
            }
        }

        console.log(restaurant)

        await restaurant.save()
    }
}

const createNewRestaurant = async () => {
    await Restaurant.deleteMany({})
    for (let idx = 0; idx < 5; idx++) {
        const restaurant = new Restaurant({
            restaurantName: faker.company.name(),
            restaurantAddress: {
                zip: faker.address.zipCode('######'),
                city: faker.address.city(),
                state: faker.address.state(),
                street: faker.address.street(),
                country: faker.address.country(),
                location: {
                    lat: faker.address.latitude(),
                    lng: faker.address.longitude()
                }
            },
            restaurantDescription: faker.lorem.lines(10),
            restaurantContact: {
                email: faker.internet.email(),
                phone: faker.phone.number('+91 9#### #####')
            }
        })
        await restaurant.save()
    }
}
createNewRestaurant()
    // module.exports = createNewRestaurant
