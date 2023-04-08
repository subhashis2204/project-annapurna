const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 300 // expire the document after 5 minutes (300 seconds)
    }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
