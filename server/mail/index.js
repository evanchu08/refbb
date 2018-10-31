const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
require('dotenv').config();
const { purchase } = require('./purchase-template');
const { resetPass } = require('./resetpass_template');

/*
const mailer = require('nodemailer');
const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "refbbguitar@gmail.com",
        pass: process.env.EMAIL_PASS
    }
});

var mail = {
    from: "Refbb <refbbguitar@gmail.com>",
    to: "runnial@gmail.com",
    subject: "Send test email",
    text: "Testing our waves mails",
    html: "<b>Hellow guys this works</b>"
}

smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log('email sent')
    }
    smtpTransport.close();
})

*/

const getEmailData = (to, name, token, template, actionData) => {
    let data = null;

    switch (template) {
        case "welcome":
            data = {
                from: "Refbb <refbbguitar@gmail.com>",
                to,
                subject: `Welcome to refbb ${name}`,
                html: welcome()
            }
            break;
        case "purchase":
            data = {
                from: "Refbb <refbbguitar@gmail.com>",
                to,
                subject: `${name}, thank for buying in refbb`,
                html: purchase(actionData)
            }
            break;
        case "resetPassword":
            data = {
                from: "Refbb <refbbguitar@gmail.com>",
                to,
                subject: `${name}, Reset password in refbb`,
                html: resetPass(actionData)
            }
            break;
        default:
            data;
    }
    return data;
}

const sendEmail = (to, name, token, type, actionData = null) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "refbbguitar@gmail.com",
            pass: process.env.EMAIL_PASS
        }
    })

    const mail = getEmailData(to, name, token, type, actionData)

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('email sent')
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }