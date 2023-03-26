// const { options } = require('joi');
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email address format
            },
            message: 'Invalid email address'
        }
    },
    documentReferenceId: {
        type: mongoose.Schema.Types.ObjectId
    },
    role: {
        type: String,
        enum: ['donor', 'receiver', 'admin']
    }
})

const option = {
    usernameField: 'email'
}

userSchema.plugin(passportLocalMongoose, option)
// userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

module.exports = User
