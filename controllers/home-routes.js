const router = require('express').Router();


// Landing page
router.get('/', async (req, res) => {
  
  res.render('homepage', { 
    
  });
});

router.get('/about-us', async (req, res) => {
  // awaiting handlebar definition

  // res.render('', { 
    
  // });
});

router.get('/login', async (req, res) => {

  res.render('login', { 
    
  });
});

router.get('/profile', async (req, res) => {
  res.render('profile', { 
    
  });
});

  // awaing handlebar definition

  // res.render('handlebar definition', {

  // })
})

module.exports = router;
