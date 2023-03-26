const mongoose = require('mongoose')
const Donor = require('./Donor')

const restaurantSchema = new mongoose.Schema({
    username: String,
    restaurantName: String,
    restaurantContactDetails: {
        email: {
            type: String,
            requried: true,
            validate: {
                validator: (value) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email address format
                },
                message: 'Invalid email address'
            }
        },
        contact1: String,
        contact2: String
    },
    restaurantWebsite: String,
    restaurantAddress: {
        zip: String,
        city: String,
        state: String,
        street: String,
        country: String,
        location: {
            lat: Number,
            lng: Number
        }
    },
    restaurantDescription: String,
})

// restaurantSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await Donor.remove({ restaurantId: { $in: doc } })
//     }
// })

restaurantSchema.pre('save', function () {
    console.log(this)
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
