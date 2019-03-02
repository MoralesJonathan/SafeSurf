const router = require('express').Router();
const tracking = require("../../controllers/tracking.js");

router.get("/test", (req, res) => {
    tracking.test((status, message = "ok") => res.status(status).send(message));
});

module.exports = router;