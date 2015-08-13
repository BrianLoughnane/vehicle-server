// dependencies
var express = require('express');
var app = express();

 
// // require middleware
// require('./middleware.js')(app, express);

require('./listings-data.js')(function(listings) {

  app
    .get('/', function (req, res) {
      res.send('yay');
    });

  // set port
  var port = process.env.PORT || 3000;

  // listen on port
  app.listen(port, function () {
    console.log("Watchly is listening on port " + port);
  });
});
