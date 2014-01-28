var App = require('../app').instance;
var Episode = require('../models/episode');

App.ShowController = Ember.ArrayController.extend({

  needs: 'application'

, currentEpisodeBinding: Ember.Binding.oneWay('controllers.application.currentEpisode')

, actions: {
    episodeClick: function (episode) {
      this.transitionToRoute('show.episode', {episode: episode});
    }
  }

});
