var App = require('../app').instance;
var Episode = require('../models/episode');

App.FeedRoute = Ember.Route.extend(App.SetTab, {
  sidebarController: 'feed'

, beforeModel: function () {
    this.setTab('feed');
    this.enterController(this.sidebarController);
  }

, model: function () {
    var controller = this.controllerFor('feed');
    var episodes = controller.get('episodes');
    if (!episodes && window.DATA.episodes) {
      episodes = window.DATA.episodes.map(function(data) { return Episode.create(data); });
      window.DATA.episodes = null;
    }

    if (episodes && episodes.length >= 20) return {episodes: episodes};

    controller.set('isLoading', true);

    return Ember.$.getJSON('/api/episodes').then(function (res) {
      controller.set('isLoading', false);
      var eps = res.episodes.map(function(data) { return Episode.create(data); });
      return {episodes: eps};
    }.bind(this));
  }

, setupController: function(controller, model) {
    controller.set('episodes', model.episodes);
  }

, renderTemplate: function () {
  }

});

