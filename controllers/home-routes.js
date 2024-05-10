const router = require('express').Router();


// Landing page
router.get('/', async (req, res) => {
  
  res.render('homepage', { 
    
  });
});

router.get('/contact', async (req, res) => {
  res.render('contact', { 
    
  });
});

router.get('/login', async (req, res) => {
  res.render('login', { 
    
  });
})

module.exports = router;
