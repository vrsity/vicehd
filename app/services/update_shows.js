var _ = require('underscore');
var async = require('async');
var Show = require('../../app/models/show');
var cheerioScraper = require('../../lib/cheerio_scraper');
var ShowObject = require('../../scripts/scrape/models').Show;

var allShowsUrl = 'http://www.vice.com/shows';

function UpdateShows() {
  this.existingShows = [];
  this.newShows = [];
}

module.exports = UpdateShows;

UpdateShows.run = function (done) {
  return new UpdateShows().run(done);
};

var p = UpdateShows.prototype;

p.scrapeShows = function (cb) {
  console.log('Scraping shows');
  var self = this;

  cheerioScraper(allShowsUrl, function (err, $) {
    var showEls = $('.shows_grid .shows_grid_list li.story-square');
    var showObjects = [];

    showEls.each(function () {
      showObjects.push(new ShowObject(this));
    });
    self.showObjects = showObjects;
    cb(err, showObjects);
  });
};

p.saveShow = function (showObject, cb) {
  var data = showObject.toJSON();
  Show.findOrCreate({ path:data.path }, function (err, show) {
    if (show.isNew) {
      console.log('Found new show', data.path);
      this.newShows.push(show);
    } else {
      this.existingShows.push(show);
    }
    _.extend(show, data);
    show.save(cb);
  }.bind(this));
};

p.saveShows = function (done) {
  console.log('Saving or updating shows');
  var showObjects = this.showObjects;
  async.whilst(
    function () { return showObjects.length; }
  , function (cb) {
      this.saveShow(showObjects.pop(), cb);
    }.bind(this)
  , done);
};

p.run = function (done) {
  async.series([
    this.scrapeShows.bind(this)
  , this.saveShows.bind(this)
  ], function (err) {
    if (done) done(err, _.pick(this, 'newShows', 'existingShows'));
  }.bind(this));
};
