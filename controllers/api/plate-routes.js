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

module.exports = router;
