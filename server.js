var express = require("express");
var path = require("path");

// var api = require("./app/routing/apiRoutes.js");
// var html = require("./app/routing/htmlRoutes.js");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App running on PORT: " + PORT);
});