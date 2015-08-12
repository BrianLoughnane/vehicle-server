// dependencies
var express = require('express');
var app = express();

require('./middleware.js')(app, express);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Watchly is listening on port " + port);
});
