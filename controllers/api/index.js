const router = require('express').Router();
const userRoutes = require('./user-routes');
const plateRoutes = require('./plate-routes');

<<<<<<< HEAD
router.use('/user', userRoutes);
=======
router.use('/users', userRoutes);
>>>>>>> a0874c4c2c29db0fb36cdcf8ea46eb9315f6b6a0
router.use('/plate', plateRoutes);

module.exports = router;