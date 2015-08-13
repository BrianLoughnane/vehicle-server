// dependencies
var express = require('express');
var app = express();

 
// // require middleware
// require('./middleware.js')(app, express);

require('./listings-data.js')(function(listingsAndIndex) {

  app
    .get('/sorted/:sort1', function (req, res) {
      var listings = listingsAndIndex.listings;
      var sort1 = req.params.sort1;
      var sort2 = req.params.sort2;
      var sort3 = req.params.sort3;

      first = listings.sort(function(a,b) {
        if(typeof sort1 === 'number') {
          swapped = a[sort1] - b[sort1];
        } else if (typeof sort1 === 'string') {
          if(a[sort1] < b[sort1]) return -1;
          if(a[sort1] > b[sort1]) return 1;
          return 0;
        }
      });

      res.send(first);
    })
    .get('/sorted/:sort1/:sort2', function (req, res) {
      var listings = listingsAndIndex.listings;
      var sort1 = req.params.sort1;
      var sort2 = req.params.sort2;
      var sort3 = req.params.sort3;

      var first = listings.sort(function(a,b) {
        if(typeof sort1 === 'number') {
          swapped = a[sort1] - b[sort1];
        } else if (typeof sort1 === 'string') {
          if(a[sort1] < b[sort1]) return -1;
          if(a[sort1] > b[sort1]) return 1;
          return 0;
        }
      });

      if(sort2) {
        var second = first.sort(function(a,b) {
          if(a[sort1] !== b[sort1]) {
            return -1;
          } else {
            if(typeof sort2 === 'number') {
              swapped = a[sort2] - b[sort2];
            } else if (typeof sort2 === 'string') {
              if(a[sort2] < b[sort2]) return -1;
              if(a[sort2] > b[sort2]) return 1;
              return 0;
            }
          }
        });
      } else {
        res.send(first);
      }
      res.send(second);
    })
    .get('/sorted/:sort1/:sort2/:sort3', function (req, res) {
      var listings = listingsAndIndex.listings;
      var sort1 = req.params.sort1;
      var sort2 = req.params.sort2;
      var sort3 = req.params.sort3;

      var first = listings.sort(function(a,b) {
        if(typeof sort1 === 'number') {
          swapped = a[sort1] - b[sort1];
        } else if (typeof sort1 === 'string') {
          if(a[sort1] < b[sort1]) return -1;
          if(a[sort1] > b[sort1]) return 1;
          return 0;
        }
      });

      if(sort2) {
        var second = first.sort(function(a,b) {
          if(a[sort1] !== b[sort1]) {
            return -1;
          } else {
            if(typeof sort2 === 'number') {
              swapped = a[sort2] - b[sort2];
            } else if (typeof sort2 === 'string') {
              if(a[sort2] < b[sort2]) return -1;
              if(a[sort2] > b[sort2]) return 1;
              return 0;
            }
          }
        });
      } else {
        res.send(first);
      }

      if(sort3) {
        var second = first.sort(function(a,b) {
          if(a[sort1] !== b[sort1]) {
            return -1;
          } else if(a[sort2] !== b[sort2]) {
            return -1
          } else {
            if(typeof sort3 === 'number') {
              swapped = a[sort3] - b[sort3];
            } else if (typeof sort3 === 'string') {
              if(a[sort3] < b[sort3]) return -1;
              if(a[sort3] > b[sort3]) return 1;
              return 0;
            }
          }
        });
      } else {
        res.send(second);
      }
      res.send(third);
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
