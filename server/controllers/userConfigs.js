const mongodbConnection = require("../dbconfig/connection.js"),
userConfigs = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        getUserConfig: (config, cb) => {
            const collection = mongodbConnection.db().collection("userConfigs");
            collection.findOne({"configName": config}, (err, result) => {
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