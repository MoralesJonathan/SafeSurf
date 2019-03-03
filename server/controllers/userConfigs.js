const mongodbConnection = require("../dbconfig/connection.js"),
userConfigs = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        getUserConfig: (user, cb) => {
            const collection = mongodbConnection.db().collection("userConfigs");
            collection.findOne({"user": user}, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getPreset: (preset, cb) => {
            const collection = mongodbConnection.db().collection("presets");
            collection.findOne({"preset": preset}, (err, result) => {
                !err ? cb(200, result.template) : cb(500, err);
            });
        },
        setUserConfig: (data, cb) => {
            const collection = mongodbConnection.db().collection("userConfigs");
            collection.insert(data, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getAllUserConfigs: (cb) => {
            const collection = mongodbConnection.db().collection("userConfigs");
            collection.find({}).toArray((err, result) => {
                if (!err) {
                    cb(200, result)
                }
                else {
                    cb(500, err);
                }
            });
        }
    };

module.exports = userConfigs;