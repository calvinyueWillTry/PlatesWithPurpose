const router = require('express').Router();


// Landing page
router.get('/', async (req, res) => {
  
  res.render('homepage', { 
    
  });
});

<<<<<<< HEAD
router.get('/about-us', async (req, res) => {
  // awaiting handlebar definition

  // res.render('', { 
    
  // });
});

router.get('/login', async (req, res) => {
  // awaing handlebar definition

  // res.render('handlebar definition', {

  // })
=======
router.get('/contact', async (req, res) => {
  res.render('contact', { 
    
  });
});

router.get('/login', async (req, res) => {
  res.render('login', { 
    
  });
>>>>>>> a0874c4c2c29db0fb36cdcf8ea46eb9315f6b6a0
})

module.exports = router;
