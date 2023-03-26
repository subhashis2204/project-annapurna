const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose')
const Receiver = require('../models/Receiver')

mongoose.connect('mongodb://localhost:27017/restaurants')
    .then(() => {
        console.log('CONNECTION SUCCESSFUL')
    })
    .catch(() => {
        console.log('CONNECTION FAILED')
    })

const createReceiver = async () => {
    // await Receiver.deleteMany({})
    for (let i = 0; i < 5; i++) {
        const receiver = new Receiver({
            receiverName: faker.company.name()
        })
        await receiver.save()
        console.log('document inputed')
    }
}

// createReceiver()

// module.exports = createReceiver
