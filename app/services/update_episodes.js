var async = require('async');
var cheerioScraper = require('../../lib/cheerio_scraper');
var _ = require('underscore');
var Show = require('../../app/models/show');
var Episode = require('../../app/models/episode');
var EpisodeObject = require('../../scripts/scrape/models').Episode;

function UpdateEpisodes(options) {
  options = options || {};
  if (options.shows || options.length) {
    this.shows = options.shows;
  }
  this.existingEpisodes = [];
  this.newEpisodes = [];
  this.scrapedEpisodes = [];
  this.scrapedPaths = [];
  this.scrapedPartsPaths = [];
}

module.exports = UpdateEpisodes;

UpdateEpisodes.run = function (options, done) {
  if ('function' === typeof options) {
    done = options;
    options = null;
  }
  return new UpdateEpisodes(options).run(done);
};

var p = UpdateEpisodes.prototype;

p.ensureShows = function (done) {
  if (this.shows) return done();
  var query = Show.find({}).select('path');
  query.exec(function (err, shows) {
    this.shows = shows; //.slice(0,1);
    done();
  }.bind(this));
};

p.scrapeEpisode = function (show, done) {
  var self = this;
  var scrapeLoop = function (url) {
    cheerioScraper(url, function (err, $) {
      var episodeEls = $('.more_from_this_show .story_list li.story');
      var episodes = [];

      episodeEls.each(function () {
        episodes.push(new EpisodeObject(this, show.toJSON()).toJSON());
      });

      console.log('Scraped episodes page:', url, episodes.length, 'Episodes');
      self.scrapedEpisodes = self.scrapedEpisodes.concat(episodes);

      var nextUrl = $('.pager .next a').attr('href');
      if (nextUrl) nextUrl = 'http://www.vice.com'+nextUrl;
      if (nextUrl === url) nextUrl = null; // Protect form inifinit loop
      if (nextUrl) {
        console.log('Next page:', nextUrl);
        return scrapeLoop(nextUrl);
      }
      done();
    });
  };

  scrapeLoop(show.url());
};

p.scrapeEpisodes = function (done) {
  var shows = this.shows;
  async.whilst(
    function () { return shows.length; }
  , function (cb) { this.scrapeEpisode(shows.pop(), cb); }.bind(this)
  , done
  );
};


p.scrapeEpisodePart = function (episode, done) {
  if (!episode) {
    console.log('no ep');
    return done();
  }
  cheerioScraper(episode.url(), function (err, $) {
    this.scrapedPartsPaths.push(episode.path);
    console.log('Loading potential part', episode.url());

    var linkEls = $('.right .list-view').first().find('a');
    var links = [];

    linkEls.each(function () {
      links.push({
        path: this.attr('href')
      , thumb: this.find('img').attr('src')
      });
    });
    console.log('Found potentail part links', links);

    async.whilst(
      function () { return links.length; }
    , function (cb) {
        var link = links.pop();
        this.scrapedPartsPaths.push(link.path);
        this.saveEpisodePart(link, cb);
      }.bind(this)
    , done
    );
  }.bind(this));
};

p.saveEpisodePart = function (url, cb) {
  var self = this;
  console.log('Checking for episode', url.path);
  if (this.scrapedPaths.indexOf(url.path) > -1) {
    console.log('Skipping, found', url.path, 'in scrapped paths', this.scrapedPaths.length);
    this.scrapedPartsPaths.push(url.path);
    return cb();
  }
  Episode.findOne({ path: url.path }, 'path', function (err, ep) {
    if(ep) {
      console.log('Skipping', url.path, '(already exists)');
      self.scrapedPartsPaths.push(url.path);
      self.scrapedPaths.push(url.path);
      cb(null);
    } else {
      console.log('Scraping episode part', url.path);
      cheerioScraper('http://www.vice.com/'+url.path, function (err, $) {
        var e = new Episode();
        e.title = $('.episode-title').text();
        e.description = $('.article_content p').first().text();
        e.thumbnailUrl = url.thumb;
        e.path = url.path;
        e.date = $('.story_meta .date').text();
        e.showPath = $('.show-info a').attr('href');
        e.showTitle = $('.show-info a').text();
        console.log('Saving another part', e.path);
        self.newEpisodes.push(e);
        self.scrapedPaths.push(url.path);
        e.save(cb);
      });
    }
  });
};

p.scrapeEpisodeParts = function (done) {
  console.log('Scraping parts');
  var query = Episode.find().batchSize(50).select('path');
  query.exec(function (err, episodes) {
    this.scrapedPaths = this.scrapedPaths.concat(episodes.map(function (e) { return e.path; }));
    async.whilst(
      function () { return episodes.length; }
    , function (cb) {
        episodes = _.filter(episodes, function (e) { return this.scrapedPartsPaths.indexOf(e.path) === -1; }, this);
        console.log(episodes.length, 'parts left to check');
        this.scrapeEpisodePart(episodes.pop(), cb);
      }.bind(this)
    , done
    );
  }.bind(this));
};

p.saveEpisodes = function (done) {
  console.log('Saving or updating episodes');
  var self = this;
  var scrapedEpisodes = this.scrapedEpisodes;
  async.whilst(
    function () { return scrapedEpisodes.length; }
  , function (cb) {
      console.log(scrapedEpisodes.length, 'left');
      self.saveEpisode(scrapedEpisodes.pop(), cb);
    }
  , done);
};

p.saveEpisode = function (data, cb) {
  Episode.findOrCreate({ path:data.path }, function (err, episode) {
    _.extend(episode, data);
    this.scrapedPaths.push(data.path);
    if (episode.isNew) {
      console.log('Found new show', data.path);
      this.newEpisodes.push(episode);
    } else {
      console.log('Updated', data.path);
      this.existingEpisodes.push(episode);
    }
    episode.save(cb);
  }.bind(this));
};

p.run = function (done) {
  async.series([
    this.ensureShows.bind(this)
  , this.scrapeEpisodes.bind(this)
  , this.saveEpisodes.bind(this)
  , this.scrapeEpisodeParts.bind(this)
  ], function (err) {
    console.log(err, 'Finished looking through/updating', this.scrapedPaths, 'episodes');
    if (done) done(err, _.pick(this, 'newEpisodes', 'existingEpisodes'));
  }.bind(this));
};
