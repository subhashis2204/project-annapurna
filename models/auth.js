const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Receiver = require('./Receiver')
const passportLocalMongoose = require('passport-local-mongoose')

const authCredentialSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email address format
            },
            message: 'Invalid email address'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'receiver', 'donor']
    }
})

// const options = {
//     usernameField: 'email',
// };

// authCredentialSchema.plugin(passportLocalMongoose, options)
authCredentialSchema.plugin(passportLocalMongoose, { usernameField: "email" });



// authCredentialSchema.statics.findAndValidate = async function (receiverEmail, password) {
//     const foundReceiver = await this.findOne({ _id: receiverEmail })

//     if (!foundReceiver) return false;

//     const isValid = await bcrypt.compare(password, foundReceiver.password)
//     return isValid ? foundReceiver : false;
// }

// authCredentialSchema.pre('save', async function () {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12)
//     }
//     console.log(this)
// })

// AuthCredential.plugin(passportLocalMongoose)

const AuthCredential = mongoose.model('AuthCredential', authCredentialSchema)

module.exports = AuthCredential
