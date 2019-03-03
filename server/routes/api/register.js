const router = require('express').Router();
const register = require("../../controllers/register.js");

router.post("/", (req, res) => {
    register(req.body, (status, data = "ok") => res.status(status).send(data));
});


module.exports = router;