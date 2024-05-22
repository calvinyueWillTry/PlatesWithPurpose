//-----------------------------------------------------------------
// menu-routes.js - api/menu routes
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Declarations
//-----------------------------------------------------------------
const router = require('express').Router();
const { Menu } = require('../../models');
const withAuth = require('../../utils/auth');

//-----------------------------------------------------------------
// End points
//-----------------------------------------------------------------

router.get('/',  async (req, res) => {

  try {
         
      const newMenuItem = await Menu.findAll();

      const menuItem = newMenuItem.map((item) => 
        item.get({ plain: true })
  );


      // Return results
      res.status(200).json(menuItem);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }

})

router.post('/',  async (req, res) => {

    try {
           
        const newMenuItem = await Menu.create({
          ...req.body
        });

        let menuData = newMenuItem.get({ plain: true });

        // Return results
        res.status(200).json(menuData);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }

})

router.delete('/:id', async (req, res) => {
  
  try {
    const newMenuItem = await Menu.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!newMenuItem) {
      res.status(404).json({ message: 'No menu to delete for this id!' });
      return;
    }

    res.status(200).json(newMenuItem);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});


module.exports = router;



