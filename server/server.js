const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    apiRoutes = require("./routes/api"),
    PORT = process.env.PORT || 3001,
    app = express();

process.env.NODE_ENV === "production" ? app.use(express.static("client/build")) : null;

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
    next();
}

  app.use(bodyParser.urlencoded({ extended: true }))
    .use(allowCrossDomain)
    .use(bodyParser.json())
    .use("/api", apiRoutes);

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

    .listen(PORT, function() {
        console.log(`Server running on port ${PORT}!`);
    });
