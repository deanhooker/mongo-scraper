var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/saved', function (req, res) {
    res.render('saved');
});

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});