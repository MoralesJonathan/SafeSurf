const router = require('express').Router();
const tracking = require("../../controllers/tracking.js");

router.get("/:campaign/clicks", (req, res) => {
    tracking.logClickTracking({"campaign":req.params.campaign})
    res.redirect('https://www.spirit.com/en/flights');
});

router.get("/:iata", (req, res) => {
    tracking.getTracking(req.params.iata, (status, message = "ok") => res.status(status).send(message));
});


module.exports = router;