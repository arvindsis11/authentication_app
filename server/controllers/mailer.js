import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';


//https://ethereal.email/create --create mail

// let nodeconfig = {
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: ENV.EMAIL, // generated ethereal user
//         pass: ENV.PASSWORD, // generated ethereal password
//     },
// }

//let transporter = nodemailer.createTransport(nodeconfig);
const transporter = nodemailer.createTransport({
    name: 'example.com' ,
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'timmy32@ethereal.email',
        pass: 'DavdMQAexNaB7y7eY7'
    }
});

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
    var emailBody = MailGenerator.generate(email);
    let message = {
        from: 'timmy32@ethereal.email',
        to: userEmail,
        subject: subject || "Thank you for registering!",
        html: emailBody
    }

    //sending mail
    transporter.sendMail(message)
        .then(() => {
            //console.log(res);
            return res.status(200).send({ msg: "You should recieve an email from us." });
        })
        .catch(error => {
            res.status(500).send({ error });
        })
}