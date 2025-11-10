import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from '@/lib/nodemailer/templates';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!
    }
});

export const sendWelcomeEmail = async ({ email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: '"Signalist <signalist@jsmastery.pro>"',
        to: email,
        subject: `Welcome to Signalist - your guide to the stock market`,
        text: 'Thanks for joining! Good luck on your investment journey!',
        html: htmlTemplate
    };

    await transporter.sendMail(mailOptions);
}