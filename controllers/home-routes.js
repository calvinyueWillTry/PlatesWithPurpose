const router = require('express').Router();
const { User } = require('../models');
const constants = require('../utils/constants');

// Landing page
router.get('/', async (req, res) => {
  
  let userData;
  let isAdmin = false;
  let isReceiver = false;

// Get user info
if (req.session.logged_in) {
  const user = await User.findByPk(req.session.user_id );
  
  userData = user.get({ plain: true })

  if (userData.type == constants.ADMIN){
    isAdmin = true;
  } else if (userData.type == constants.RECEIEVER) {
    isReceiver = true;
  }

   // Send over the 'loggedIn' session variable to the 'homepage' template
   res.render('homepage', {
    userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
  });
  return;

} 
  
 // Send over the 'loggedIn' session variable to the 'homepage' template
 res.render('homepage', {

});


  
});

router.get('/contact', async (req, res) => {
  
  let userData;
  let isAdmin = false;
  let isReceiver = false;

// Get user info
if (req.session.logged_in) {
  const user = await User.findByPk(req.session.user_id );
  
  userData = user.get({ plain: true })

  if (userData.type == constants.ADMIN){
    isAdmin = true;
  } else if (userData.type == constants.RECEIEVER) {
    isReceiver = true;
  }

   // Send over the 'loggedIn' session variable to the 'contact' template
   res.render('contact', {
    userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
  });
  return;

} 
  
    // Send over the 'loggedIn' session variable to the 'contact' template
    res.render('contact', {
     });
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.render('/api/user/profile');
  } else {
    res.render('login');
}
});




module.exports = router;
