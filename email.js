require('dotenv').config()

const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const { createOTPEmailBody, createMessageEmailBody } = require('./emailtemplate')
const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
)

module.exports.sendVerifyEmail = async function (emailFrom, emailTo, generatedOTP) {
    const emailBody = createOTPEmailBody(generatedOTP)

    const emailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: 'Your OTP for food Donation',
        html: emailBody
    }

    transporter.sendMail(emailOptions)
        .then(() => console.log('Email Sent'))
        .catch((err) => console.log(err))
}

module.exports.sendMessage = async function (replyTo, senderName, messageText) {

    const emailBody = createMessageEmailBody(replyTo, senderName, messageText)

    const emailOptions = {
        from: process.env.SENDER_MAIL,
        to: {
            name: process.env.CONTACTS_EMAIL_NAME,
            address: process.env.CONTACTS_EMAIL
        },
        replyTo: {
            name: senderName,
            address: replyTo
        },
        subject: 'Help and Support Needed',
        html: emailBody
    }

    transporter.sendMail(emailOptions)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
}
