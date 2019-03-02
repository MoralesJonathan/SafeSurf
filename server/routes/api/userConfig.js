const router = require('express').Router();
const userConfigs = require("../../controllers/userConfigs.js");


router.get("/test", (req, res) => {
    userConfigs.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/", (req, res) => {
    userConfigs.getAllUserConfigs((status, data = "ok") => res.status(status).send(data));
});

router.get("/:config", (req, res) => {
    userConfigs.getUserConfig(req.params.config, (status, data = "ok") => res.status(status).send(data));
});


module.exports = router;