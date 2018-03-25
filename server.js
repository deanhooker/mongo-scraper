var express = require('express');
// var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var router = require('./routes/routes.js');

var app = express();

var PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// Start express app
app.listen(PORT, function(err){
        console.log("App running on port: " + PORT);
});