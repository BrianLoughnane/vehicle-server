// dependencies
var express = require('express');
var app = express();

 
// // require middleware
// require('./middleware.js')(app, express);

require('./listings-data.js')(function(listingsAndIndex) {

  app
    .get('/sorted', function (req, res) {
      res.send(['hello']);
    })
    .get('/price/:min/:max', function (req, res) {
      var result = [];
      var index = listingsAndIndex.priceIndex;
      var min = req.params.min;
      var max = req.params.max;
      
      for(var i = 0; i < index.length; i++) {
        if((index[i].price >= min) && (index[i].price <=max)) {
          result.push(index[i]);
        }
      }

      res.send(result);
    })

  // set port
  var port = process.env.PORT || 3000;

  // listen on port
  app.listen(port, function () {
    console.log("Watchly is listening on port " + port);
  });
});
