const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => { 
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Auth System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: message,
        });
        
        console.log("Verification mail sent!");
    } catch (error) {
        console
            .error("Error sending mail:", error);
    }
}

module.exports = sendEmail;