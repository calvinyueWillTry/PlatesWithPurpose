const router = require('express').Router();
const { User, Plate, Menu, EmailLog } = require('../../models');
const constants = require('../../utils/constants');
const nodemailer  = require('nodemailer');
require('dotenv').config();

router.get('/thankyou', async (req, res) => {

      if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );

    const userData = user.get({ plain: true })
    
    let isAdmin = false;
    let isReceiver = false;

    if (userData.type == constants.ADMIN){
      isAdmin = true;
    } else if (userData.type == constants.RECEIEVER) {
      isReceiver = true;
    }


    res.render('thankyou',{
      userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
  });
  } else {
    res.render('thankyou');
  }

  

  });

router.post('/log', async (req, res) => {
    try {
      const data = await EmailLog.create(req.body);
        res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.post('/send', async (req, res) => {
    
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
            to: req.body.email,   // list of receivers
            subject: req.body.subject,  // Subject line
            text: req.body.message,  // plain text body
            html: req.body.html
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
            return console.log(error);
            }
            res.status(200).json(info.response);
            console.log('Email sent:', info.response);
           
            //res.render("thankyou");
        });
    }
    catch (err) {
        res.status(400).json(err);
      }        
      //res.render('contact');
})

router.post('/contact', async (req, res) => {
    
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
            to: process.env.SITE_ADMIN,   // list of receivers
            subject: "ADMIN INQUIRY from " + req.body.email + " : " + req.body.subject,  // Subject line
            text: req.body.message,  // plain text body
            html: req.body.html
        };
        
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
            return console.log(error);
            }
            res.status(200).json(info.response);
            console.log('Email sent:', info.response);
           
            //res.render("thankyou");
        });
    }
    catch (err) {
        res.status(400).json(err);
      }        
      //res.render('contact');
})

module.exports = router;
