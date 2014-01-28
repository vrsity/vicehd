var App = require('../app').instance;

App.InfoView = Ember.View.extend(App.Animatable, {
  templateName: 'info'

, classNames: ['sidebar-content-view', 'scrollable']

, classNameBindings: ['controller.isShowing']

});
