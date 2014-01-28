var App = require('../app').instance;

App.ShowEpisodeController = Ember.Controller.extend({

  needs: 'application'

, currentEpisodeBinding: Ember.Binding.oneWay('controllers.application.currentEpisode')

});
