const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    apiRoutes = require("./routes/api"),
    PORT = process.env.PORT || 3001,
    app = express();

process.env.NODE_ENV === "production" ? app.use(express.static("client/build")) : null;

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use("/api", apiRoutes);

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

    .listen(PORT, function() {
        console.log(`Server running on port ${PORT}!`);
    });
