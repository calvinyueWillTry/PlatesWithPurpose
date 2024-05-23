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
    where: { user_id: req.session.user_id, paid_for: false },
  }).then((plate) => {
    if (plate) res.redirect(`/api/plate/order/${plate.id}`);
  });

});


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
    
      const dbPlateData = await Plate.findAll({
        include: [{  model: User }],
        where: {
          paid_for: false,
        }
      }); 
  
      const dbMenuData = await Plate.findAll({
        include: [{  model: Menu }],
        where: {
          paid_for: false,
        }
      }); 
  
      const plateItems = dbPlateData.map((item) => 
          item.get({ plain: true })
    );

    
    plateItems.forEach(item => {
      item.date_order = formatTimeDiff( new Date(item.date_order));
    });
     
      res.render('give', {
        plateItems,  userData, logged_in: req.session.logged_in, noRecords: plateItems.length > 0 ? false : true
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } 
})

router.get('/order', withAuth , async (req, res) => {
  console.log("ORDER-----------------------------------");
  let existingOrder = false;

  // Get user info
  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );
    userData = user.get({ plain: true })
  } 
  
  // if user already has an order render their order page
  Plate.findOne({
    where: { user_id: req.session.user_id, paid_for: false },
  }).then((plate) => {
    if (plate) {
      existingOrder = true;
      const plataData = plate.get({ plain: true });
      console.log(plataData);
       res.redirect(`/api/plate/order/${plataData.id}`);
  }
});
  
  // Show user menu to place an new order
  if (!existingOrder){
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
      plateData.date_order = formatTimeDiff( new Date(plateData.date_order));
      

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
           
      const menuItem1 = await Menu.findByPk(req.body.menu_id);
      const menuData1 = menuItem1.get({ plain: true });

        const newPlate = await Plate.create({
          ...req.body,
          description: menuData1.menuItem_name,
          cost: menuData1.cost,
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

router.post('/give',  withAuth , async (req, res) => {
  
  // Get user info
  if (req.session.logged_in) {
    const user = await User.findByPk(req.session.user_id );
    userData = user.get({ plain: true })
  }
  
  // Lookup receiver email
  const dbPlateData = await Plate.findOne({
    include: [{  model: User }],
    where: {
      id: req.body.id,
    }
  }); 
  
  const plateData = dbPlateData.get({ plain: true });

  // Update plate to paid for
  try {
    const [updated] = await Plate.update({
      paid_for: true
    }, {
      where: { id: req.body.id } 
    });

    
  

    if (updated > 0) {
      // Email to reciepient
      email.send(
        plateData.user.email,
        "You meal have been paid for",
        `Your ${plateData.description} will be delivered once we have finished preparing it. Be sure to reach out to us if your address has changed so our delivery person can find you.`,
        `<h2>Your ${plateData.description} will be delivered once we have finished preparing it.</h2><br><h3>Be sure to reach out to us if your address has changed so our delivery person can find you.</h3>`,
      );
      // Email to gifter
      email.send(
        userData.email,
        "Thank you for your payment",
        `Your $ ${plateData.cost} have helped another, and we thank you for your generosity.`,
        `<h2>Your $ ${plateData.cost} have helped another, and we thank you for your generosity.,</h2>`,
      );
      res.json({ message: 'plate updated successfully' });
    } else {
      res.status(404).json({ message: 'Plate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update plate due to an error', error: error.toString() }); // give me an error json
  }
})


// Helper function to format date to hours/minutes
const formatTimeDiff = (date) => {
  let hour = "";
  

  let diff  = new Date().getTime() - date.getTime() ;

  let msec = diff;
  const hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  const mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  const ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  
  if (hh > 0 ) {
    hour = `${hh} hours`;
  } 

 

  return `${hour} ${mm < 10 ? '0' : ''}${mm} minutes`;
};


module.exports = router;



