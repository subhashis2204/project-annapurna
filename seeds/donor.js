const Restaurant = require('../models/Restaurant')
const Donor = require('../models/Donor')
const mongoose = require('mongoose')
const Receiver = require('../models/Receiver')

mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('CONNECTION SUCCESSFUL')
    })
    .catch(() => {
        console.log('CONNECTION FAILED')
    })

const createDonor = async () => {
    const receivers = await Receiver.find({}, { _id: 1 })

    await Donor.deleteMany({})
    const restaurants = await Restaurant.find({}, { _id: 1, restaurantName: 1 })
    console.log(restaurants)
    const presentDate = new Date()

    for (let restaurant of restaurants) {
        for (let i = 0; i <= 7; i++) {
            let dateString = presentDate.toISOString().substring(0, 10)
            let pastDate = new Date(dateString)
            pastDate.setDate(pastDate.getDate() - i)
            console.log(pastDate)
            const randomDonor = Math.floor(Math.random() * receivers.length)

            const donor = new Donor({
                restaurantId: restaurant._id,
                date: pastDate,
                restaurantName: restaurant.restaurantName,
                // donating: Boolean(!Math.round(Math.random())),
                donating: true
            })

            if (donor.donating) {
                donor.fulfilled = Boolean(!Math.round(Math.random()))
                if (donor.fulfilled)
                    donor.donatedTo = receivers[randomDonor]._id
            }
            console.log(donor)
            await donor.save()
        }

    }
}

createDonor()
