const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: 'the.annapurna.project@outlook.com',
        pass: 'Annapurna2204'
    }
})
// const Mailgen = require('mailgen')

module.exports.sendVerifyEmail = async function (emailFrom, emailTo, generatedOTP) {
    const message = {
        "from": emailFrom,
        "template_id": 'd-7127419b67fb4ceba594cc8df68100ce',
        "personalizations": [{
            "to": [{
                "email": emailTo
            }]
        }],
        "dynamic_template_data": {
            "otp": generatedOTP,
            "subject": 'Your OTP for donation verification'
        }
    }

    await sgMail
        .send(message)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports.sendMessage = async function (emailFrom, emailTo, replyTo, senderName, messageText) {
    const message = {
        "from": emailFrom,
        "replyTo": {
            "email": replyTo,
            "name": senderName
        },
        "personalizations": [{
            "to": [{
                "email": emailTo
            }]
        }],
        "subject": 'Help and Support Needed',
        "content": [{
            "type": 'text/html',
            "value": messageText
        }]
    }
    await sgMail
        .send(message)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports.sendMessageNodemailer = async function (emailFrom, emailTo, replyTo, senderName, messageText) {
    const emailOptions = {
        from: emailFrom,
        to: {
            name: 'SUBHASHIS PAUL',
            address: emailTo
        },
        replyTo: {
            name: senderName,
            address: replyTo
        },
        subject: 'Help and Support Needed',
        text: messageText
    }

    transporter.sendMail(emailOptions)
        .then(() => console.log('Sent Successfully'))
        .catch((err) => console.log(err))
}
