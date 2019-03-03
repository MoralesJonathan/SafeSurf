const router = require('express').Router(),
      axios = require("axios");

const {AZURE_SUB_KEY_1, AZURE_SUB_KEY_2} = process.env;
// let useKey1 = true;
const api = axios.create({
    baseURL: 'https://eastus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/',
    timeout: 10000,
    headers:{'Ocp-Apim-Subscription-Key': Math.random() >= 0.5 ? AZURE_SUB_KEY_1 : AZURE_SUB_KEY_2, 'Content-Type': 'application/json'}
});

router.post("/", async (req, res) => {
    const {imgSrcs} = req.body;
    // useKey1 = !useKey1;
    // console.log(`using key #${useKey1 ? '1' : '2'}`)
    const results = imgSrcs.map(img => api.post('ProcessImage/Evaluate', {
        DataRepresentation: 'URL',
        Value: img
    }));
    try {
        var imgResults = await Promise.all(results);
        var data = imgResults.map((result, i ) => {
            const {IsImageAdultClassified, IsImageRacyClassified} = result.data;
            return {orgSrc: imgSrcs[i], safe: !IsImageAdultClassified || !IsImageRacyClassified}
        });
    }
    catch(err) {
        console.log('y u do dat :( ', err);
        res.status(500).json(err.message);
        req.next();
    }
    res.status(200).json(data)
});

module.exports = router;

