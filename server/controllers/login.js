const bcrypt = require('bcrypt'),
    mongodbConnection = require("../dbconfig/connection.js"),
    login = (data, cb) => {
        const { username, password } = data;
        const collection = mongodbConnection.db().collection("login");
        collection.findOne({
            username: username.toLowerCase().trim()
        }, function (error, user) {
            if (user !== null && bcrypt.compareSync(password, user.password)) {
                cb(200, true);
            }
            else {
                cb(400, false)
            }
        })
    };

module.exports = login;
