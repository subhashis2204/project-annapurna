const mongoose = require('mongoose')

const receiverSchema = new mongoose.Schema({
    username: String,
    receiverName: String,
    receiverAreaOfWork: [String],
    receiverWebsite: String,
    receiverContactDetails: {
        contact1: String,
        contact2: String,
        email: {
            type: String,
            requried: true,
            validate: {
                validator: (value) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email address format
                },
                message: 'Invalid email address'
            }
        }
    },
    receiverAddress: {
        country: String,
        state: String,
        city: String,
        zip: String,
        street: String,
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    },
    receiverRegistrationNo: String,
    idProofImg: String
})

receiverSchema.post('save', function (doc) {
    console.log(doc)
})

const Receiver = mongoose.model('Receiver', receiverSchema)

module.exports = Receiver
