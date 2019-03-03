const bcrypt = require('bcrypt'),
    mongodbConnection = require("../dbconfig/connection.js"),
    toTitleCase = str => {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    },
    register = (data, cb) => {
        const { username, password, firstName, lastName, email} = data;
        bcrypt.hash(password, 10, (err, hash) => {
            if (!err) {
                const collection = mongodbConnection.db().collection("login");
                collection.insert({
                    username: username.toLowerCase().trim(),
                    password: hash
                }, function (err, newuser) {
                    var uniqueID = newuser.ops[0]._id;
                    const userInfoCollection = mongodbConnection.db().collection("users");
                    userInfoCollection.insert({
                        _id: uniqueID,
                        firstName: toTitleCase(firstName),
                        lastName: toTitleCase(lastName),
                        userName: username,
                        email: email
                    }, (error, result) => {
                        if (error) cb(500,error)
                        else cb(200,result)
                    });
                });
            }
            else {
                console.dir(error);
                cb(500,error)
            }
        });
    }
module.exports = register;
