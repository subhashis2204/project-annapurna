const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')
const Quantity = require('../models/Quantity')
const Food = require('../models/Food')
const Donor = require('../models/Donor')
const Receiver = require('../models/Receiver')
const { receiverSchema } = require('../schemas')
const catchAsync = require('../utils/CatchAsync')
const ExpressError = require('../utils/ExpressError')
const upload = require('../utils/imageUpload')
const AuthCredential = require('../models/auth')
const User = require('../models/User')
const axios = require('axios')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')

const mapBoxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

const validateReceiver = (req, res, next) => {
    req.body.receiverAreaOfWork = req.body.receiverAreaOfWork.split(',').map(area => area.trim())
    req.body.idProofImg = req.file.url

    const { error } = receiverSchema.validate(req.body)
    if (error) {
        // console.log(error)
        const message = error.details.map(detail => detail.message).join(',')
        throw new ExpressError(message, 400)
    } else {
        next()
    }
}

router.get('/new', (req, res) => {
    res.render('receivers/new')
})

router.post('/new', upload.single('image'), validateReceiver, catchAsync(async (req, res) => {
    const { receiverContactDetails, password } = req.body
    const receiverEmail = receiverContactDetails.email
    const receiver = new Receiver({ username: receiverEmail, ...req.body })
    // const auth = new AuthCredential({ _id: receiverEmail, role: 'receiver', password: password })

    const address = req.body.receiverAddress

    // const options = {
    //     "api-version": '2022-09-01-preview',
    //     "addressLine": address.street,
    //     "locality": address.city,
    //     "postalCode": address.zip,
    //     "countryRegionSet": address.country,
    //     "top": 1,
    //     "subscription-key": 'cTUVCkmWjD01M59hEpbbyGPvWJv2vi2B7-1TWkVta_M'
    // }

    // const options = {
    //     query: `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
    // }

    // axios.get('https://atlas.microsoft.com/geocode', { params: options })
    //     .then(response => {
    //         const data = response.data
    //         const [lng, lat] = data.features[0].geometry.coordinates
    //         console.log(lat, lng)
    //     }).catch(err => console.log(err))


    const geodata = await geocoder.forwardGeocode({
        query: `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`,
        limit: 1
    }).send()

    receiver.receiverAddress.geometry = geodata.body.features[0].geometry

    const user = new User({ email: receiverEmail, role: 'receiver', documentReferenceId: receiver._id })
    await User.register(user, password)
        .then(async (doc) => {
            console.log(doc)

            await receiver.save()


            console.log(receiver)
            req.flash('success', 'successfully created a receiver')
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)

            req.flash('error', `${err.message}`)
            res.redirect('/receivers/new')
        })
}))

module.exports = router



// {
//     "type": "FeatureCollection",
//         "features": [{
//             "type": "Feature",
//             "properties": {
//                 "address": {
//                     "countryRegion": {
//                         "ISO": "IN",
//                         "name": "India"
//                     },
//                     "adminDistricts": [{
//                         "shortName": "JH"
//                     }],
//                     "formattedAddress": "831009, India",
//                     "locality": "Jamshedpur",
//                     "postalCode": "831009"
//                 },
//                 "type": "Postcode1",
//                 "confidence": "Medium",
//                 "matchCodes": [
//                     "UpHierarchy"
//                 ],
//                 "geocodePoints": [{
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             86.2313385,
//                             22.80536842
//                         ]
//                     },
//                     "calculationMethod": "Rooftop",
//                     "usageTypes": [
//                         "Display"
//                     ]
//                 }]
//             },
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     86.2313385,
//                     22.80536842
//                 ]
//             },
//             "bbox": [
//                 86.21053314208984,
//                 22.796545028686523,
//                 86.2425537109375,
//                 22.817655563354492
//             ]
//         }]
// }
