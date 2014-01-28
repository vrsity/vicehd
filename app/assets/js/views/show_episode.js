var App = require('../app').instance;

App.ShowEpisodeView = Ember.View.extend(App.EpisodeList, App.Animatable, {
  templateName: 'feed'

, classNames: ['sidebar-content-view', 'scrollable']

});
