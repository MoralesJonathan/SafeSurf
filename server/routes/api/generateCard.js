const router = require('express').Router();
const imageGeneration = require("../../services/imageGenerationService");
const tracking = require("../../controllers/tracking.js");

router.get("/:index/:airline/:lookahead1-:lookahead2/:campaignId", (req, res) => {
    let { index, airline, campaignId, lookahead1, lookahead2 } = req.params;
    imageGeneration.retrieveImages(index, airline, [lookahead1, lookahead2], campaignId).then(image => {
        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Content-Length': image.length
        });
        res.end(image);
    }).catch(error => {
        res.send(500);
    })
});

router.get("/view/:campaignId", (req, res) => {
        const img = new Buffer("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
        tracking.logViewTracking({ "campaign": req.params.campaignId })
});

module.exports = router;

