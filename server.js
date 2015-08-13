// dependencies
var express = require('express');
var app = express();

// load records from database
require('./listings-data.js');

// require middleware
require('./middleware.js')(app, express);

// set port
var port = process.env.PORT || 3000;

// listen on port
app.listen(port, function () {
  console.log("Watchly is listening on port " + port);
});
