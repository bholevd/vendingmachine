var nodemailer = require('nodemailer');
const { mailer } = require("../config/constants");

exports.sendMail = (to, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: mailer.service,
        port: mailer.port,
        secure: false,
        host: mailer.host,
        auth: {
            user: mailer.username,
            pass: mailer.password,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: mailer.from,
        to: to,
        subject: subject,
        html: body, // email content in HTML
    };
    return transporter.sendMail(mailOptions);
}
