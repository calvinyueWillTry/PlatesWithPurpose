//-----------------------------------------------------------------
// home-routes.js - routes home page
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// De
//-----------------------------------------------------------------
const router = require('express').Router();
const { User } = require('../models');

//-----------------------------------------------------------------
// End points
//-----------------------------------------------------------------
// Home landing page
router.get('/', async (req, res) => {
  let userData;

  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );
    userData = user.get({ plain: true });
}

   // Render home page
   res.render('homepage', {
    userData, logged_in: req.session.logged_in
  });

});

// Contact Page
router.get('/contact', async (req, res) => {
  let userData;

  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );
    userData = user.get({ plain: true });
  }

   // Render contact page
   res.render('contact', {
    userData, logged_in: req.session.logged_in
  });

});

// Logout
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.render('/api/user/profile');
  } else {
    res.render('login');
}
});

module.exports = router;
