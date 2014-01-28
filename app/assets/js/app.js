window.Handlebars = require('handlebars');
require('./vendor/ember');
require('ember-ga');
require('fastClick');
require('infiniteScroll');
require('./templates');
require('jquery-replace-class')(Ember.$);

Ember.Handlebars.registerBoundHelper('wrapCharacters', require('./helpers').wrapCharacters);

var App = exports.instance = window.App = Ember.Application.create();

if (window.history && window.history.pushState) {
  App.Router.reopen({ location: 'history' });
}

require('./mixins');
require('./controllers');
require('./views');
require('./routes');

App.Router.map(function () {
  this.route('feed', {path: '/' });
  this.route('shows');
  this.route('info');
  this.route('show', {path: '/:slug'});
  this.route('show.episode', {path: '/:slug/:episodeSlug'});
});

