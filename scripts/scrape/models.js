var _ = require('underscore');

exports.Show = Show;
exports.Episode = Episode;

var sharedMethods = {
  title: function () {
    return this.$el.find('h2').text().trim();
  }

, description: function () {
    return this.$el.find('p').text().trim();
  }

, thumbnailUrl: function () {
    return this.$el.find('img').attr('src').trim();
  }

, path: function () {
    return this.$el.find('.story_thumbnail').attr('href').trim();
  }

, url: function () {
    return 'http://www.vice.com'+this.path().trim();
  }
};

function Show ($el) {
  this.$el = $el;
}

_.extend(Show.prototype, sharedMethods);

Show.prototype.toJSON = function () {
  return {
    title: this.title()
  , description: this.description()
  , thumbnailUrl: this.thumbnailUrl()
  , path: this.path()
  };
};

function Episode ($el, show) {
  this.$el = $el;
  this.$meta = $el.find('.story_meta');
  this.showPath = _.result(show, 'path');
}

_.extend(Episode.prototype, sharedMethods);

Episode.prototype.date = function () {
  var date = this.$meta.find('span:nth-child(2)').text();
  if (date) return new Date(Date.parse(date.trim()));
};

Episode.prototype.author = function () {
  var author = this.$meta.find('span.author').text();
  if (author) return author.trim();
};

Episode.prototype.authorPath = function () {
  var authorPath = this.$meta.find('span.author a').attr('href');
  if (authorPath) return authorPath.trim();
};

Episode.prototype.category = function () {
  var category = this.$meta.find('span.category').text();
  if (category) return category.trim();
};

Episode.prototype.categoryPath = function () {
  var categoryPath = this.$meta.find('span.category a').attr('href');
  if (categoryPath) return categoryPath.trim();
};

Episode.prototype.toJSON = function () {
  return {
    title: this.title()
  , description: this.description()
  , thumbnailUrl: this.thumbnailUrl()
  , path: this.path()
  , date: this.date()
  , author: this.author()
  , authorPath: this.authorPath()
  , category: this.category()
  , categoryPath: this.categoryPath()
  , showPath: this.showPath
  };
};
