const router = require('express').Router(),
    axios = require("axios");

const {AZURE_SUB_KEY} = process.env;
const api = axios.create({
    baseURL: 'https://eastus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': AZURE_SUB_KEY
    }
});

router.post("/", async (req, res) => {
    const {imgSrcs} = req.body;
    
    const results = imgSrcs.map(img => api.post('ProcessImage/Evaluate', {
        DataRepresentation: 'URL',
        Value: img
    }));

    const imgResults = await Promise.all(results);
    const data = imgResults.map((result, i ) => {
        const {IsImageAdultClassified, IsImageRacyClassified} = result.data;
        return {orgSrc: imgSrcs[i], safe: IsImageAdultClassified || IsImageRacyClassified}
    });

   
    res.status(200).json(data)
});

module.exports = router;

