var request = require('request');
var helpers = require('./helpers');
var async = require('async');

require('./listings-count')(function(count) {
  console.log('listings count fired');
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
  }); // end async parallel
}); // end require counts
