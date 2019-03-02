const router = require('express').Router();
const customers = require("../../controllers/customers.js");


router.get("/test", (req, res) => {
    customers.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/customers/:iata", (req, res) => {
    customers.getAllCustomers(req.params.iata, (status, data = "ok") => res.status(status).send(data));
});

router.get("/:id", (req, res) => {
    customers.getCustomer(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.put("/", (req, res) => {
    customers.createCustomer(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/", (req, res) => {
    customers.updateCustomer(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/:id", (req, res) => {
    customers.deleteCustomer(req.params.id, (status, data = "ok") => res.status(status).send(data));
});


module.exports = router;