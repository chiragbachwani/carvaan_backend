const nodemailer = require('nodemailer');

exports.sendResetEmail = async (email, resetURL) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the following link to reset your password: ${resetURL}`
    };

    await transporter.sendMail(message);
};
