const router = require('express').Router();
const airlines = require("../../controllers/airlines.js");

router.get("/test", (req, res) => {
    airlines.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/airlines", (req, res) => {
    airlines.getAllAirlines((status, data = "ok") => res.status(status).send(data));
});

router.get("/:id", (req, res) => {
    airlines.getAirline(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.put("/", (req, res) => {
    airlines.createAirline(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/", (req, res) => {
    airlines.updateAirline(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/:id", (req, res) => {
    airlines.deleteAirline(req.params.id, (status, data = "ok") => res.status(status).send(data));
});


module.exports = router;