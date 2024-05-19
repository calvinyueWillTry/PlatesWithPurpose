const router = require('express').Router();
const { User, Plate, Menu } = require('../../models');
const constants = require('../../utils/constants');

router.get('/', async (req, res) => {
    
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


    res.render('order',{
      userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
  });
  } else {
    res.render('login');
  }

});

router.get('/give', async (req, res) => {
    
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

} else {
  // redirect to login it not logged in
  res.render('login');
}

  try {
    
      const dbPlateData = await Plate.findAll({
        include: [
        {
          model: Menu,
          attributes: ['description', 'cost'],
        },{
          model: User,
          attributes: ['email', 'password'],
        }
      ],
    });
      
      const plateItems = dbPlateData.map((item) =>
          item.get({ plain: true })
      );
console.log(dbPlateData);
      // Send over the 'loggedIn' session variable to the 'homepage' template
      res.render('give', {
        plateItems, userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
})

router.get('/order', async (req, res) => {
    
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

  } else {
    // redirect to login it not logged in
    res.render('login');
  }

    try {
      
        const dbMenuData = await Menu.findAll();
        
        const menuItems = dbMenuData.map((item) =>
            item.get({ plain: true })
        );

        // Send over the 'loggedIn' session variable to the 'homepage' template
        res.render('order', {
            menuItems, userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      } 
})

router.get('/order/:id', async (req, res) => {
    
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

} else {
  // redirect to login it not logged in
  res.render('login');
}

  try {
    
      const dbPlateData = await Plate.findByPk(req.params.id);
      
      const plateData = dbPlateData.get({ plain: true });
      
      const dbMenuData = await Menu.findByPk(plateData.menu_id);
      
      const menuData = dbMenuData.get({ plain: true });

      
      res.render('order-view', {
        plateData, menuData, userData, logged_in: true, isAdmin, isReceiver, isGiver: !isReceiver
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
})

router.post('/order', async (req, res) => {
    try {
        const newPlate = await Plate.create({
          ...req.body,
          user_id: req.session.user_id,
        });
        res.status(200).json(newPlate);
      } catch (err) {
        res.status(400).json(err);
      }

})

module.exports = router;



