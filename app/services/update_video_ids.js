var cheerioScraper = require('../../lib/cheerio_scraper');
var _ = require("underscore");
var async = require('async');
var Episode = require('../models/episode');

var update = function (episodes, done) {
  async.whilst(
    function () { return episodes.length; }
  , function (cb) {
      var episode = episodes.pop();
      var url = 'http://m.vice.com'+episode.path;

      console.log('Scraping', url);

      cheerioScraper(url, function (err, $) {
        var lines;
        var videoId;
        var playerId;

        try {
          lines = $('#video_area').html().split('\n');
          videoId = _.find(lines, function (l) { return l.match(/videoId/); });
          playerId = _.find(lines, function (l) { return l.match(/playerId/); });
          videoId = videoId.split("'")[1];
          playerId = playerId.split("'")[1];
          console.log('Found', videoId, playerId);
        } catch (e) {
          console.log('Error finding ids', episode.path);
        }

        episode.videoId = videoId;
        episode.playerId = playerId;

        try {
          if (!videoId) {
            var youtubeId = $('#video_area, .story-content').find('iframe').attr('src').split('embed/')[1];
            episode.youtubeId = youtubeId;
            console.log('Falling back to youtubeId', youtubeId);
          }
        } catch(e) {
          console.log('Error finding youtube id', e, episode.path);
        }

        episode.save(function () { setTimeout(cb, 10); });
      });
    }
  , function (err) {
      if (err) console.log(err);
      if (done) done(err);
  });
};

exports.run = function (cb) {
  Episode.find({ 'videoId' : { '$exists' : false }, 'youtubeId': { '$exists': false }}, function (err, docs) {
    console.log('Updating video ids for', docs.length, 'episodes');
    update(docs, cb);
  });
};
