var cheerio = require('cheerio');
var request = require('request');

module.exports = function (url, cb) {
  request(url, function (err, response, body) {
    var $ = cheerio.load(body);
    cb(err, $);
  });
};
