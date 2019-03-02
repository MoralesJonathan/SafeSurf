const router = require('express').Router();
const users = require("../../controllers/users.js");

router.get("/test", (req, res) => {
    users.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/users", (req, res) => {
    users.getAllusers((status, data = "ok") => res.status(status).send(data));
});

router.get("/:username", (req, res) => {
    users.getUser(req.params.username, (status, data = "ok") => res.status(status).send(data));
});

router.put("/", (req, res) => {
    users.createUser(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.put("/:username/add/", (req, res) => {
    users.createSubUser({"user": req.params.username, "subUser": req.body}, (status, data = "ok") => res.status(status).send(data));
});

router.post("/", (req, res) => {
    users.updateUser(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/:username", (req, res) => {
    users.deleteUser(req.params.username, (status, data = "ok") => res.status(status).send(data));
});


module.exports = router;