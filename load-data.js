var request = require('request');
var helpers = require('./helpers');
var listingsCount = require('./listings-count');
var data;

request('http://interview.carlypso.com/count', function (error, response, body) {
  if(error) {
    helpers.errorLogger(error);
  } else {
    responseObject = JSON.parse(body);
    count = responseObject.value;
  }
});

module.exports = count;

