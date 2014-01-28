var App = require('../app').instance;
var Show = require('../models/show');
var Episode = require('../models/episode');

App.ShowRoute = Ember.Route.extend(App.SetTab, {
  sidebarController: 'show'

, beforeModel: function () {
    this.setTab('shows');
    this.enterController(this.sidebarController);
  }

, model: function (params) {
    var controller = this.controllerFor('show');
    var episodes; //= controller.get('episodes');
    var show; //= controller.get('show');

    if (!show && window.DATA.shows && window.DATA.shows[0]) {
      show = Show.create(window.DATA.shows[0]);
      window.DATA.shows = null;
    }

    if (!episodes && window.DATA.episodes) {
      episodes = window.DATA.episodes.map(function(data) { return Episode.create(data); });
      window.DATA.episodes = null;
    }

    if (show && episodes && episodes.length >= 1) {
      return {episodes: episodes, show: show};
    }

    controller.set('isLoading', true);
    return Ember.$.getJSON('/api/shows/'+params.slug).then(function (res) {
      controller.set('isLoading', false);
      show = Show.create(res.show);
      episodes = res.episodes.map(function(data) { return Episode.create(data); });
      return {episodes: episodes, show: show};
    });
  }

, setupController: function(controller, model) {
    var episodes = model.episodes;
    controller.set('show', model.show);
    this.controllerFor('application').setCurrentShow(model.show);
    controller.set('episodes', episodes);
  }

, serialize: function(model) {
    if (model.show) {
      return {slug: model.show.get('path').substr(1)};
    }
  }

, renderTemplate: function (controller) {
    this.fetchEpisodes(controller);
  }

, fetchEpisodes: function (controller) {
    var show = controller.get('show');
    if (!show) return;
    var episodes = controller.get('episodes');
    if (episodes && episodes.length) return;
    controller.set('isLoading', true);
    var now = new Date();
    Ember.$.getJSON('/api/shows'+show.path+'/episodes').then(function (res) {
      var episodes = res.episodes.map(function(data) { return Episode.create(data); });
      var diff = new Date() - now;
      setTimeout(function () {
        controller.setProperties({episodes: episodes, isLoading: false});
      }, Math.max(310 - diff, 0));
    });
  }

});
