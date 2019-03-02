const router = require("express").Router();
const userConfigRoutes = require('./userConfig');
const trackingRoutes = require('./tracking');
const userRoute = require('./user')
const imageRoute = require('./image')

router.use("/userConfig", userConfigRoutes);
router.use("/tracking", trackingRoutes);
router.use("/user", userRoute);
router.use("/image", imageRoute);

module.exports = router;