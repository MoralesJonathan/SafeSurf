const router = require('express').Router();
const login = require("../../controllers/login.js");

router.post("/", (req, res) => {
    login(req.body, (status, data = "ok") => res.status(status).send(data));
});


module.exports = router;