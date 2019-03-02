const mongodbConnection = require("../dbconfig/connection.js"),
    users = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        createUser: (data, cb) => {
            const collection = mongodbConnection.db().collection("users");
            collection.insertOne(data, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        createSubUser: (data, cb) => {
            const collection = mongodbConnection.db().collection("users");
            collection.updateOne({"userName":data.user}, {$set: {"subUsers": data.subUser}}, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getUser: (id, cb) => {
            const collection = mongodbConnection.db().collection("users");
            collection.findOne({ userName: id }, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getAllusers: cb => {
            const collection = mongodbConnection.db().collection("users");
            collection.find({}).toArray((err, result) => {
                if (!err) {
                    let users = result.map(user => user.userName);
                    cb(200, users)
                }
                else {
                    cb(500, err);
                }
            });
        },
        deleteUser: (id, cb) => {
            const collection = mongodbConnection.db().collection("users");
            collection.deleteOne({ userName: id }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        updateUser: (data, cb) => {
            const { userName, ...rest } = data
            const collection = mongodbConnection.db().collection("users");
            collection.updateOne({ userName: userName }, { $set: rest }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        }
    };

module.exports = users;