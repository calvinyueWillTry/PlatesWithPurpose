const router = require('express').Router();


// Landing page
router.get('/', async (req, res) => {
  
  res.render('homepage', { 
    
  });
});


module.exports = router;
