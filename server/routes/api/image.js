const router = require('express').Router(),
    axios = require("axios");


router.post("/", (req, res) => {
    let imagesResult = [];
    req.body.imgSrcs.forEach(img => {
        axios({
            method: 'post',
            url: 'https://eastus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessImage/Evaluate',
            headers: { "Content-Type": "application/json", "Ocp-Apim-Subscription-Key": process.env.AZURE_SUB_KEY },
            data: {
                "DataRepresentation": "URL",
                "Value": img
            }
        })
            .then(function (response) {
                if (response.IsImageAdultClassified && response.IsImageRacyClassified)
                    imagesResult.push({ "orgSrc": img, "safe": false });
                else imagesResult.push({ "orgSrc": img, "safe": true });
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    res.status(200).send(imagesResult)
});

module.exports = router;

