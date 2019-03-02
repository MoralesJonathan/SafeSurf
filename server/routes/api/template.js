const router = require('express').Router();
const template = require("../../controllers/templates.js");

router.get("/:name", (req, res) => {
    template.getTemplate({"templateName":req.params.name,},(status, message = "ok") => res.status(status).send(message));
});

module.exports = router;