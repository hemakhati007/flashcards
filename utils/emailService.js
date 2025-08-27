const dns = require("dns");
const nodemailer = require("nodemailer");

// ✅ Check if email domain exists
const validateEmailDomain = (email) => {
    return new Promise((resolve, reject) => {
        const domain = email.split("@")[1];
        dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                return resolve(false);
            }
            resolve(true);
        });
    });
};

//notifucation send

const sendNotificationEmail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
    });
};

module.exports = { validateEmailDomain, sendNotificationEmail };