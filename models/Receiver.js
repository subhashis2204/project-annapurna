const mongoose = require('mongoose')

const axios = require('axios')

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
    receiverDescription: String,
    receiverRegistrationNo: String,
    idProofImg: {
        url: String,
        blobName: String
    }
})

receiverSchema.pre('findOneAndUpdate', async function() {
    console.log(this._update)
    const address = this._update.receiverAddress

    const options = {
        address: `${this.receiverSchemaName},${address.street}, ${address.city}, ${address.state},${address.zip}, ${address.country}`,
        key: process.env.GOOGLEMAP_TOKEN
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: options })
        // .then(function (request) {
        //     console.log(request.data)
        //     const { lat, lng } = request.data.results[0].geometry.location
        //     const geometry = {
        //         type: 'Point',
        //         coordinates: [lng, lat]
        //     }
        //     console.log(this)
        //     this._update.receiverSchemaAddress.geometry = geometry
        // })
        // .catch(err => console.log(err))

    const { lat, lng } = response.data.results[0].geometry.location
    const geometry = {
            type: 'Point',
            coordinates: [lng, lat]
        }
        // console.log(this)
    this._update.receiverAddress.geometry = geometry

    console.log(response.data.results[0].geometry)
        // const geodata = await geocoder.forwardGeocode({
        //     query: `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
        //     limit: 1
        // }).send()

    // this._update.receiverSchemaAddress.geometry = geodata.body.features[0].geometry
})

receiverSchema.post('save', function(doc) {
    console.log(doc)
})

const Receiver = mongoose.model('Receiver', receiverSchema)

module.exports = Receiver