const router = require('express').Router();
const userConfigs = require("../../controllers/userConfigs.js");


router.get("/test", (req, res) => {
    userConfigs.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/", (req, res) => {
    userConfigs.getAllUserConfigs((status, data = "ok") => res.status(status).send(data));
});

router.get("/:user", (req, res) => {
    userConfigs.getUserConfig(req.params.user,(status, data = "ok") => res.status(status).send(data));
});

router.put("/", (req, res) => {
    const {preset, user} = req.params;
    userConfigs.getPreset(preset, templateArray => {
        userConfigs.setUserConfig({user:user, filter: templateArray}, (status, data = "ok") => res.status(status).send(data));
    })
});


module.exports = router;