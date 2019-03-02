const router = require("express").Router();
const campaignRoutes = require('./campaign');
const customerRoutes = require('./customer');
const trackingRoutes = require('./tracking');
const airlineRoute = require('./airline')
const templateRoute = require('./template')
const cardRoute = require('./generateCard')

router.use("/campaign", campaignRoutes);
router.use("/tracking", trackingRoutes);
router.use("/customer", customerRoutes);
router.use("/airline", airlineRoute);
router.use("/generateCard", cardRoute);
router.use("/template", templateRoute);

module.exports = router;