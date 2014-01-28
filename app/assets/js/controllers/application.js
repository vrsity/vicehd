var App = require('../app').instance;

App.ApplicationController = Ember.Controller.extend({

  needs: ['sidebar', 'show']

, currentControllerNameBinding: Ember.Binding.oneWay('controllers.sidebar.currentControllerName')

, actions: {
    onVideoEnd: function () {
      this.get('currentEpisode').set('isWatched', true);
      this.send('advance');
    }

  , advance: function (dir) {
      var next;
      if ('feed' === this.get('currentControllerName')) {
        next = this.nextEpisode(dir);
        if (next) this.setCurrentEpisode(next);
      } else if ('show' === this.get('currentControllerName')) {
        next = this.nextEpisode(dir);
        this.transitionToRoute('show.episode', {episode: next});
      }
    }

  , saveVideoDuration: function (duration) {
      if (!this.get('currentEpisode')) return;
      if (this.get('currentEpisode.duration')) return;
      Ember.$.post('/api/episodes/'+this.get('currentEpisode.id'), { duration: duration, _method: 'PUT' }, function (data) {
        var episode = data.episode;
        var currentEpisode = this.get('currentEpisode');
        if (currentEpisode.get('id') !== episode.id) return;
        currentEpisode.set('humanDuration', episode.humanDuration);
        currentEpisode.set('duration', episode.duration);
      }.bind(this));
    }

  , closeVideo: function () {
      this.setCurrentEpisode(false);
    }

  , expandVideo: function () {
      this.toggleProperty('videoIsExpanded');
    }
  }

, setCurrentEpisode: function (episode) {
    if (this.get('currentEpisode')) this.set('currentEpisode.active', false);
    this.set('currentEpisode', episode);
    episode && episode.set('active', true);
  }

, setCurrentShow: function (show) {
    if (this.get('currentShow')) this.set('currentShow.active', false);
    this.set('currentShow', show);
    show && show.set('active', true);
  }

, nextEpisode: function (dir) {
    dir || (dir = 1);
    var episodes = this.controllerFor(this.get('currentControllerName')).get('episodes');
    var index;
    if (!episodes) return;

    if (this.get('currentEpisode')) {
      index = episodes.indexOf(this.get('currentEpisode'));
      return episodes[index+dir];
    }
    if (episodes && 1 === dir && episodes[0]) return episodes[0];
  }

});
