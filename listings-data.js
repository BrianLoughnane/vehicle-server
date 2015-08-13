var request = require('request');
var helpers = require('./helpers');
var async = require('async');

module.exports = function(callback) {
  require('./listings-count')(function(count) {
    var waitMessage = setInterval(function() {
      console.log('Getting Carlypso Records, please wait...')
    }, 2000);

    console.log('count', count);
    var listings = [];
    var tasks = [];

    for(var min = 0; min < count; min += 10000) {
      // create a closure scope using an IIFE to avoid asynchronous evaluation of mutated variables
      (function() {
        var query = 'http://interview.carlypso.com/listings?offset='+min+'&limit=10000';
        tasks.push(
          function(cb) {
            request(query, function (error, response, body) {
              cb(error, JSON.parse(body));
            });
          } // end function(cb)
        ); // end tasks.push
      })(); // end anonymous IIFE
    } // end for loop

    async.parallel(tasks, function (err, results) {
      var mapped = results.map(function(obj) {
        return obj.value;
      }).forEach(function(subArray) {
        subArray.forEach(function(listing) {
          listings.push(listing);
        })
      });

      console.log('listings generation completed');
      clearInterval(waitMessage);

      waitMessage = setInterval(function() {
        console.log('Generating Price Index, please wait...')
      }, 2000);

      var priceIndex = listings.sort(function(a, b) { 
          if(a.price && b.price) {
            return a.price - b.price;
          } else if (a.price) {
            return a.price;
          } else if (b.price) {
            return b.price;
          } else {
            return undefined;
          }
      });


      console.log('priceIndex generation completed');
      clearInterval(waitMessage);

      callback({
        listings: listings,
        priceIndex: priceIndex
      });





    }); // end async parallel
  }); // end require counts
}
