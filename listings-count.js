var request = require('request');
var helpers = require('./helpers');

module.exports = function(callback) {
  request('http://interview.carlypso.com/count', function (error, response, body) {
      if(error) {
        helpers.errorLogger(error);
      } else {
        responseObject = JSON.parse(body);
        count = responseObject.value;
        callback(count);
      }
  });
}


