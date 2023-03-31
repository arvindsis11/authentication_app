import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';


//https://ethereal.email/create --create mail

// let nodeconfig = {
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: ENV.EMAIL_USERNAME, // generated ethereal user
//         pass: ENV.EMAIL_PASSWORD // generated ethereal password
//     },
// }
//using real gmail account!
let nodeconfig = {
    service : 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL_USERNAME, // gmail
        pass: ENV.EMAIL_PASSWORD // password
    },
}
const transporter = nodemailer.createTransport(nodeconfig);
let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8080/api/registerMail
 * 
 * @param 
 * {
 * "username":"arvindsis35",
 * "userEmail":"admin@gmail.com",
 * "text":"testing",
 * "subject":"example subject line",
 * } res 
 */
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    //body of the email
    var email = {
        body: {
            name: username,
            intro: text || 'Thank you for joining us!',
            outro: 'Need help, or queries? just reply to this email, we\'d love to help you'
        }
    }
    //generates the email
    var emailBody = MailGenerator.generate(email);
    let message = {
        from: ENV.EMAIL_USERNAME,
        to: userEmail,
        subject: subject || "Thank you for registering!",
        html: emailBody
    }

    //sending mail
    transporter.sendMail(message)
        .then((info) => {
            return res.status(200).send({
                msg: "You should recieve an email from us.",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            });
        })
        .catch(error => {
            res.status(500).send({ error });
        })
}