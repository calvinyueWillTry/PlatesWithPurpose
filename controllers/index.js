const router = require('express').Router();

const Routes = require('./api');
const homeRoutes = require('./home-routes');
//const restaurantRoute = require("./Restaurant-Routes");//includes menu

router.use('/', homeRoutes);
//router.use("/restaurants", restaurantRoute)
router.use('/api', Routes);

module.exports = router;

