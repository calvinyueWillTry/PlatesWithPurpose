const router = require('express').Router();

//const restaurantRoute = require("./Restaurant-Routes");

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
