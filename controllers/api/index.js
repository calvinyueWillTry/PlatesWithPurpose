//-----------------------------------------------------------------
// index.js - api routes index 
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Declarations
//-----------------------------------------------------------------
const router = require('express').Router();
const userRoutes = require('./user-routes');
const plateRoutes = require('./plate-routes');
const emailRoutes = require('./email-routes');
const menuRoutes = require('./menu-routes');

//-----------------------------------------------------------------
// api Routes
//-----------------------------------------------------------------
router.use('/user', userRoutes);
router.use('/plate', plateRoutes);
router.use('/email', emailRoutes);
router.use('/menu', menuRoutes);

module.exports = router;