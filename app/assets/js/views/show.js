var App = require('../app').instance;

App.ShowView = Ember.View.extend(App.EpisodeList, App.Animatable, {
  templateName: 'feed'

, classNames: ['sidebar-content-view', 'scrollable']

, classNameBindings: ['controller.isLoading', 'controller.isShowing']

});
