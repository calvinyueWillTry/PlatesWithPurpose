//-----------------------------------------------------------------
// user-routes.js - api/plates routes
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Declarations
//-----------------------------------------------------------------
const router = require('express').Router();
const { User } = require('../../models');
const constants = require('../../utils/constants');
//const email = require('../../utils/email');

//-----------------------------------------------------------------
// End points
//-----------------------------------------------------------------

router.post('/', async (req, res) => {
  try {

    const userData = await User.create(req.body);
       
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/profile', async (req, res) => {
  
  // Get user info from session
  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );

    const userData = user.get({ plain: true })
    
    // check if they have an order
    res.render('profileView',{
      userData, logged_in: req.session.logged_in
  });
  } else {
    res.render('profileCreate');
  }

});

/// Route for updating an existing user
router.put('/profile/:id', async (req, res) => {
  console.log("id:", req.params.id );
  console.log(req.body);
  //const { id } = req.params; // get id from url param
  try {
    const userData = req.body; // this is the new field data sent from the profileView
    const [updated] = await User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      type: req.body.userType,
      isAdmin: req.body.userType == 1 ? true : false,
      isReceiver: req.body.userType == 2 ? true : false,
      isGiver: req.body.userType == 3 ? true : false

    }, {
      where: { id: req.params.id } 
    });

  if (updated > 0) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user due to an error', error: error.toString() }); // give me an error json
  }
});

router.get('/login', async (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/logout', (req, res) => {
  
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  
});

module.exports = router;
