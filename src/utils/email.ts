import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendMail = async (recipient: string, subject: string, message: string) => {
    
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const data = {
        from: process.env.ADMIN_EMAIL,
        to: recipient,
        subject,
        text: message
    }

    transport.sendMail(data, (err: Error | null, info: SMTPTransport.SentMessageInfo) => {
        if (err) console.log(err);

        console.log(info);
    })
}

export default sendMail;