var App = require('../app').instance;
var Episode = require('../models/episode');

App.FeedController = Ember.ArrayController.extend({

  needs: ['application', 'sidebar']

, currentEpisodeBinding: Ember.Binding.oneWay('controllers.application.currentEpisode')

, isCurrent: function () {
    return 'feed' === this.get('controllers.sidebar.currentControllerName');
  }

, init: function () {
    this.set('page', 1);
  }

, getMore: function () {
    this.set('isLoading', true);
    Ember.$.getJSON('/api/episodes', {page: this.get('page')}, function(data) {
      var episodes = data.episodes.map(function(data) { return Episode.create(data); });
      this.get('episodes').pushObjects(episodes);
      this.allLoaded = this.get('model').length < data.total;
      this.set('isLoading', false);
    }.bind(this));
  }

, actions: {
    episodeClick: function (episode) {
      episode.set('active', true);
      this.controllerFor('application').setCurrentEpisode(episode);
    }

  , didScrollToBottom: function () {
      if (this.get('isLoading') || this.get('allLoaded')) return;
      this.incrementProperty('page');
      this.getMore();
    }

  , autoPlay: function () {
      if (this.get('controllers.application.isSmall')) return;
      if (this.isCurrent()) {
        this.send('episodeClick', this.get('episodes.firstObject'));
      }
    }

  }

});
