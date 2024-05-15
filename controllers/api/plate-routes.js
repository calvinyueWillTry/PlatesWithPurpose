const router = require('express').Router();
const { Plates, Menu } = require('../../models');

router.get('/', async (req, res) => {
    
    res.render('order', { 
    
    });
})

router.get('/give', async (req, res) => {
    
    res.render('give', { 
    
    });
})

router.get('/order', async (req, res) => {
    
    try {
        const dbMenuData = await Menu.findAll();
    
        
        const menuItems = dbMenuData.map((item) =>
            item.get({ plain: true })
        );

        // Send over the 'loggedIn' session variable to the 'homepage' template
        res.render('order', {
            menuItems
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      } 
})

<<<<<<< HEAD
router.post('/order', async (req, res) => {
    
    try {
        const newPlate = await Plate.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(newProject);
      } catch (err) {
        res.status(400).json(err);
      }

})

module.exports = router;


=======
>>>>>>> a0874c4c2c29db0fb36cdcf8ea46eb9315f6b6a0
module.exports = router;
