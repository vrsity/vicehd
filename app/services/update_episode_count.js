var async = require('async');
var Show = require('../models/show');
var Episode = require('../models/episode');
var _ = require('underscore');

function UpdateEpisodeCount() {
}

UpdateEpisodeCount.run = function (options, cb) {
  if ('function' === typeof options) {
    cb = options;
    options = null;
  }
  return new UpdateEpisodeCount(options).run(cb);
};

var p = UpdateEpisodeCount.prototype;

p.updateCounts = function (shows, done) {
  async.whilst(
    function () { return shows.length; }
  , function (cb) {
      var show = shows.pop();
      Episode.findByShow(show.path, function (err, items) {
        show.episodeCount = items.length;
        items = _.sortBy(items, function(i){ return -i.date; });
        if (items.length) show.newestEpisodeDate = items[0].date;

        async.whilst(
          function () { return items.length; }
        , function (cb_) {
            var item = items.pop();
            item.showTitle = show.title;
            item.save(cb_);
          }
        , function (err) {
            if (err) console.log(err);
            show.save(cb);
          });
      });
    }
  , function (err) {
      if (err) console.log(err);
      done(err);
    });
};

p.run = function (done) {
  async.waterfall([
    function (cb) { Show.findAll(cb); }
  , function (shows, cb) { this.updateCounts(shows, cb); }.bind(this)
  ], function (err, result) {
    if (done) done(err, result);
  });
};

module.exports = UpdateEpisodeCount;
