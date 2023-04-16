const Joi = require('joi')
const joiPostalCode = Joi.extend(require('joi-postalcode'))

module.exports.restaurantSchema = Joi.object({
    restaurantName: Joi.string().required(),
    restaurantWebsite: Joi.string(),
    restaurantAddress: Joi.object({
        zip: joiPostalCode.string().postalCode('IN'),
        city: Joi.string(),
        state: Joi.string(),
        street: Joi.string(),
        country: Joi.string()
    }).required(),
    restaurantDescription: Joi.string().required(),
    restaurantContactDetails: Joi.object({
        email: Joi.string().email().required(),
        contact1: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).required(),
        contact2: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).allow(null, "")
    }).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
})
module.exports.restaurantUpdateSchema = Joi.object({
    restaurantName: Joi.string().required(),
    restaurantWebsite: Joi.string(),
    restaurantAddress: Joi.object({
        zip: joiPostalCode.string().postalCode('IN'),
        city: Joi.string(),
        state: Joi.string(),
        street: Joi.string(),
        country: Joi.string()
    }).required(),
    restaurantDescription: Joi.string().required(),
    restaurantContactDetails: Joi.object({
        email: Joi.string().email().required(),
        contact1: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).required(),
        contact2: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).allow(null, "")
    }).required(),
    // password: Joi.string().required(),
    // confirmPassword: Joi.ref('password')
})

module.exports.receiverSchema = Joi.object({
    receiverName: Joi.string().required(),
    // receiverEmail: Joi.string().email().required(),
    receiverRegistrationNo: Joi.string().required(),
    receiverWebsite: Joi.string(),
    receiverAreaOfWork: Joi.array().items(Joi.string()).required(),
    receiverContactDetails: Joi.object({
        email: Joi.string().email().required(),
        contact1: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).required(),
        contact2: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).allow(null, "")
    }).required(),
    receiverAddress: Joi.object({
        country: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required()
    }).required(),
    receiverDescription: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    idProofImg: Joi.object({
        url: Joi.string().required(),
        blobName: Joi.string().required()
    }).required()
}).required()


module.exports.receiverUpdateSchema = Joi.object({
    receiverName: Joi.string().required(),
    // receiverEmail: Joi.string().email().required(),
    receiverRegistrationNo: Joi.string().required(),
    receiverWebsite: Joi.string(),
    receiverAreaOfWork: Joi.array().items(Joi.string()).required(),
    receiverContactDetails: Joi.object({
        email: Joi.string().email().required(),
        contact1: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).required(),
        contact2: Joi.string().pattern(new RegExp('^(0|91)?[6-9][0-9]{9}$')).allow(null, "")
    }).required(),
    receiverAddress: Joi.object({
        country: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required()
    }).required(),
    receiverDescription: Joi.string().required(),
    idProofImg: Joi.object({
        url: Joi.string(),
        blobName: Joi.string()
    })
}).required()