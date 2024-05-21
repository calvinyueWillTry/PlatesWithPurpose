//-----------------------------------------------------------------
// plate-routes.js - api/plates routes
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Declarations
//-----------------------------------------------------------------
const router = require('express').Router();
const { User, Plate, Menu } = require('../../models');
const email = require('../../utils/emailClass');
const withAuth = require('../../utils/auth');

//-----------------------------------------------------------------
// End points
//-----------------------------------------------------------------

router.get('/',  withAuth , async (req, res) => {
    
  // if user already has an order render their order page
  Plate.findOne({
    where: { user_id: req.session.user_id, delivered: false },
  }).then((plate) => {
    if (plate) res.redirect(`/api/plate/order/${plate.id}`);
  });

});

// Needs work
router.get('/give',  withAuth ,async (req, res) => {
      

// Get user info
if (req.session.logged_in) {
  const user = await User.findByPk(req.session.user_id );
  userData = user.get({ plain: true })
} else {
  // redirect to login if not logged in
  res.render('login');
}

  try {
    
      const dbPlateData = await Menu.findAll({
        include: [
          {
            model: User,
            through: Plate

          }
      ],
    }); 
      
      const plateItems = dbPlateData.map((item) =>
          item.get({ plain: true })
      );
console.log(plateItems);
      res.render('give', {
        plateItems, userData, logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
})

router.get('/order', withAuth , async (req, res) => {

  // Get user info
  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );
    userData = user.get({ plain: true })
  } 

  // if user already has an order render their order page
  Plate.findOne({
    where: { user_id: req.session.user_id, delivered: false },
  }).then((plate) => {
    if (plate) res.redirect(`/api/plate/order/${plate.id}`);
  });
  
  // Show user menu to place an new order
  try {
    
      const dbMenuData = await Menu.findAll();
      
      const menuItems = dbMenuData.map((item) =>
          item.get({ plain: true })
      );

      // Render menu for user to select from
      res.render('order', {
          menuItems, userData, logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
})

router.get('/order/:id',  withAuth , async (req, res) => {
    
  // Get user info
  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );
    userData = user.get({ plain: true })
  }

  try {
    
      const dbPlateData = await Plate.findByPk(req.params.id);
      
      const plateData = dbPlateData.get({ plain: true });
      
      const dbMenuData = await Menu.findByPk(plateData.menu_id);
      
      const menuData = dbMenuData.get({ plain: true });

      
      res.render('order-view', {
        plateData, menuData, userData, logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
})

router.post('/order',  withAuth ,async (req, res) => {

    try {
           
        const newPlate = await Plate.create({
          ...req.body,
          user_id: req.session.user_id,
        });

        // Send user email for new order
         // Get user info and menu item
        const user = await User.findByPk(newPlate.user_id );
        let userData = user.get({ plain: true });
        let userBlock = `${userData.firstName} ${userData.lastName}\n${userData.address}\n${userData.city} ${userData.state}, ${userData.zip}`;
        const menu = await Menu.findByPk(newPlate.menu_id );
        let menuData = menu.get({ plain: true });

        email.send(
          userData.email,
          "You order has been received",
          `Your order has been placed for ${menuData.menuItem_name}\n\nIt will be delivered to \n${userBlock}\n\nOnce someone has gifted it, we will deliver.`,
          `<h2>You order has been placed for ${menuData.menuItem_name}</h2><br><h3>It will be delivered to</h2><br>${userBlock}<br><br><h3>Once someone has gifted it, we will deliver.</h3>`,
        );
        // Return results
        res.status(200).json(newPlate);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }

})

router.delete('/order/:id', withAuth, async (req, res) => {
  
  try {
    const plateData = await Plate.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!plateData) {
      res.status(404).json({ message: 'No plate to delete for user with this id!' });
      return;
    }

    // Send user email for canceled order
    // Get user info and menu item
    
    console.log(plateData);
    const user = await User.findByPk(req.session.user_id);
    let userData = user.get({ plain: true });
   
    email.send(
      userData.email,
      "You order has been canceled",
      `Your order has been canceled`,
      `<h2>Your order has been canceled</h2>`,
    );

    res.status(200).json(plateData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

module.exports = router;



