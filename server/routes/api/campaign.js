const router = require('express').Router();
const campaigns = require("../../controllers/campaigns.js");


router.get("/test", (req, res) => {
    campaigns.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/campaigns/:airline", (req, res) => {
    campaigns.getAllCampaigns(req.params.airline, (status, data = "ok") => res.status(status).send(data));
});

router.get("/:airline/:id", (req, res) => {
    campaigns.getCampaign(req.params.airline, req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.put("/", (req, res) => {
    campaigns.createCampaign(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/", (req, res) => {
    campaigns.updateCampaign(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/:airline/:id", (req, res) => {
    campaigns.deleteCampaign(req.params.airline, req.params.id, (status, data = "ok") => res.status(status).send(data));
});

module.exports = router;