const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    schedule = require("node-schedule"),
    emailer = require("../services/mailerService"),
    customers = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        createCustomer: (data, cb) => {
            const collection = mongodbConnection.db().collection("mailingList");
            let { selected, ...obj } = data;
            collection.insertOne(obj, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getCustomer: (name, cb) => {
            const fullName = decodeURI(name)
            const collection = mongodbConnection.db().collection("mailingList");
            collection.findOne({name:fullName}, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getAllCustomers: (iataCode, cb) => {
            const collection = mongodbConnection.db().collection("mailingList");
            collection.find({"iata":iataCode}).toArray((err, result) => {
                if (!err) {
                    result = result.map(a => a.name);
                    cb(200, result)
                }
                else {
                    cb(500, err);
                }
            });
        },
        deleteCustomer: (name, cb) => {
            const collection = mongodbConnection.db().collection("mailingList");
            collection.deleteOne({ name: name }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        updateCustomer: (data, cb) => {
            const { _id, ...rest } = data
            const collection = mongodbConnection.db().collection("mailingList");
            collection.updateOne({ _id: new ObjectId(data._id) }, { $set: rest }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        }
    };

module.exports = customers;