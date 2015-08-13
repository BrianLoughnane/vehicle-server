// load records from database

var data;

require('./listings-data.js')(function(listings) {  
  data = listings;

  module.exports = {
    hello: function (req, res) {
      res.send('hello');
    },
    yo: function (req, res) {
      res.send('yo');
    }
  } 
});
