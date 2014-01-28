var App = require('../app').instance;
var Show = require('../models/show');

App.ShowsRoute = Ember.Route.extend(App.SetTab, {
  sidebarController: 'shows'

, beforeModel: function () {
    this.setTab('shows');
    this.enterController(this.sidebarController);
  }

, model: function () {
    var controller = this.controllerFor('shows');
    var shows = controller.get('shows');

    if (!shows && window.DATA.shows) {
      shows = window.DATA.shows.map(function(data) { return Show.create(data); });
      window.DATA.shows = null;
    }

    if (shows) return {shows: shows};

    controller.set('isLoading', true);
    return Ember.$.getJSON('/api/shows').then(function (res) {
      controller.set('isLoading', false);
      var shows_ = res.shows.map(function(data) { return Show.create(data); });
      return {shows: shows_};
    });
  }

, setupController: function(controller, model) {
    if (!controller.set('shows', model.shows)) controller.set('shows', model.shows);
    Ember.run.later(this, function () {
      var applicationController = this.controllerFor('application');
      var currentShow = applicationController.get('currentShow');
      if (currentShow)  {
        currentShow.set('active', false);
        applicationController.set('currentShow', null);
      }
    }, 200);
  }

, renderTemplate: function () {}

});

