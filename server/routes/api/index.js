const router = require("express").Router();
const userConfigRoutes = require('./userConfig');
const trackingRoutes = require('./tracking');
const userRoute = require('./user');
const imageRoute = require('./image');
const loginRoute = require('./login');
const registerRoute = require('./register');

router.use("/userConfig", userConfigRoutes);
router.use("/tracking", trackingRoutes);
router.use("/user", userRoute);
router.use("/image", imageRoute);
router.use("/login", loginRoute);
router.use("/register", registerRoute);

module.exports = router;