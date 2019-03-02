const axios = require('axios');
const imageCompositionService = require("../services/imageCompositionService");
process.env.NODE_ENV === "production" ? null : require("dotenv").config()
imageGenerationService = {
    getFlightInfo: (index, airline, routesDateSecondsOffset, campaignId) => {
        return axios.post(`${process.env.FARES_API}${airline}/fares/grouped-routes`, { "flightType": "ROUND_TRIP", "priceFormat": { "decimalSeparator": ".", "thousandSeparator": ",", "decimalPlaces": 0 }, "datePattern": "MM/dd/yyyy", "languageCode": "en", "outputCurrencies": [ "USD" ], "faresPerRoute": 1, "routesLimit": 10, "dataExpirationWindow": "2d", "outputFields": [ "returnDate", "usdTotalPrice", "popularity", "originCity", "destinationCity", "destinationAirportImage", "destinationCityImage", "destinationStateImage", "destinationCountryImage", "farenetTravelClass", "travelClass" ], "sorting": [ { "popularity": "DESC" }, { "usdTotalPrice": "ASC" } ], "departure": { "start": new Date(new Date().getTime() + parseInt(routesDateSecondsOffset[0])).toISOString().slice(0, 10), "end": new Date(new Date().getTime() + parseInt(routesDateSecondsOffset[1])).toISOString().slice(0, 10) }, "origins": [], "destinations": [] }, {
            headers: {
                "Authorization": `${process.env.FARES_TOKEN}`
            },
            dataType: "json",
            contentType: "application/json;charset=UTF-8"
        })
    },
    retrieveImages(index, airline, routesLookahead, campaignId) {
        return this.getFlightInfo(index, airline, routesLookahead, campaignId).then((res) => {
            let fare = res.data[index - 1];
            let insertData = {
                route: `${fare.originCity} (${fare.origin}) to ${fare.destinationCity} (${fare.destination})`,
                destinationCityImage: fare.destinationCityImage,
                departureDate: fare.fares[0].departureDate,
                fareClass: fare.fares[0].farenetTravelClass,
                searchDate: fare.fares[0].searchDate,
                price: fare.fares[0].usdTotalPrice,
                airline: airline
            }
            return imageCompositionService.compositeImage(insertData).then(image => {
                return image
            }).catch(error => {
                console.log("Could not generate image");
                console.log(error);
                return false;
            })
        }).catch(err => {
            console.log("Could not fetch fares");
            console.log(err);
            return false;
        });
    }
}

module.exports = imageGenerationService;