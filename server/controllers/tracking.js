const mongodbConnection = require("../dbconfig/connection.js"),
    airlines = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        }
    };

module.exports = airlines;