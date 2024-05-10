const router = require('express').Router();
const { Plates } = require('../../models');

router.get('/', async (req, res) => {
    
    res.render('order', { 
    
    });
})

router.get('/give', async (req, res) => {
    
    res.render('give', { 
    
    });
})

router.get('/order', async (req, res) => {
    
    res.render('order', { 
    
    });
})

module.exports = router;
