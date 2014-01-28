var App = require('../app').instance;

App.NavbarView = Ember.View.extend({
  templateName: 'navbar'

, classNames: ['nav-bar']

, tagName: 'nav'


, classNameBindings: ['controller.transition'],

});
