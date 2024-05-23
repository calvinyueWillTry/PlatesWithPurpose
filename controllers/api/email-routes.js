//-----------------------------------------------------------------
// email-routes.js - api/email routes
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Declarations
//-----------------------------------------------------------------
const router = require('express').Router();
const { User, EmailLog } = require('../../models');
const withAuth = require('../../utils/auth');
//const constants = require('../../utils/constants');
//const nodemailer  = require('nodemailer');
require('dotenv').config();
const email = require('../../utils/emailClass');

//-----------------------------------------------------------------
// End points
//-----------------------------------------------------------------

// Thank you page email response
router.get('/thankyou', async (req, res) => {

    if (req.session.logged_in) {
      const user = await User.findByPk(req.session.user_id );
      const userData = user.get({ plain: true })
  
      res.render('thankyou',{
         userData, logged_in: req.session.user_id
    });
    } else {
      res.render('thankyou');
    }

  });

// 
router.post('/log', async (req, res) => {
    try {
      const data = await EmailLog.create(req.body);
        res.status(200).json(data);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.post('/contact', async (req, res) => {
    
  

  try {
    let result =  email.send(
      process.env.SITE_ADMIN,
      "ADMIN INQUIRY from " + req.body.email + " : " + req.body.subject,  
      req.body.message,
      req.body.html
    );
    console.log("Response--------------------");
    console.log(result);

      res.status(200).json(result);
  } catch (err) {
    console.log("3Response--------------------");
    console.log(err);

    res.status(400).json(err);
  }
});

   

module.exports = router;
