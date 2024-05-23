//-----------------------------------------------------------------
// emailClass - Email handler
//-----------------------------------------------------------------
//-----------------------------------------------------------------
// Declarations
//-----------------------------------------------------------------
//const { User, Plate, Menu } = require('../models');
const nodemailer  = require('nodemailer');
require('dotenv').config();

//-----------------------------------------------------------------
// Class 
//-----------------------------------------------------------------

class EmailClass {
    constructor() {
      
  }

  send(email, subject, message, html) {

    console.log("send email----------------------------------------------------------------")
    console.log(email, subject, message, html);
    console.log("send email----------------------------------------------------------------")
    let result = [];
    result.ok = true;
//return result;
    try{
        var transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
        });

        
        const mailOptions = {
            from: process.env.MAILTRAP_ADMIN,  // sender address
            to: email,   // list of receivers
            subject: subject,  // Subject line
            text: message,  // plain text body
            html: html
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
            return console.log(error);
            }
            res.status(200).json(info.response);
            console.log('Email sent:', info.response);
        });
    }
    catch (err) {
        res.status(400).json(err);
    }        
}

};
  
module.exports = new EmailClass();
  