const router = require("express").Router();
const userConfigRoutes = require('./userConfig');
const trackingRoutes = require('./tracking');
const userRoute = require('./user')
const cardRoute = require('./generateCard')

router.use("/userConfig", userConfigRoutes);
router.use("/tracking", trackingRoutes);
router.use("/user", userRoute);
router.use("/generateCard", cardRoute);

module.exports = router;