const mongodbConnection = require("../dbconfig/connection.js"),
templates = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        getTemplate: (data, cb) => {
            const collection = mongodbConnection.db().collection("templates");
            collection.findOne({"name":data.templateName}, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        }
    };

module.exports = templates;