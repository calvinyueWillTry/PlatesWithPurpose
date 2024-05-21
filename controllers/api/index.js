const router = require('express').Router();
const userRoutes = require('./user-routes');
const plateRoutes = require('./plate-routes');
const emailRoutes = require('./email-routes');

router.use('/user', userRoutes);
router.use('/plate', plateRoutes);
router.use('/email', emailRoutes);

module.exports = router;