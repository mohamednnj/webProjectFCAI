import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export default async function sendEmail(to, subject, content) {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: content,
        };

        const info = await transporter.sendMail(mailOptions);
        return {success: true, messageId: info.messageId};
    } catch (error) {
        console.error('Error sending email:', error);
        return {success: false, error: error.message};
    }
}
