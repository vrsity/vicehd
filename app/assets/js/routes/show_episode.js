var App = require('../app').instance;
var Episode = require('../models/episode');
var Show = require('../models/show');

App.ShowEpisodeRoute = Ember.Route.extend(App.SetTab, {
  sidebarController: 'show'

, beforeModel: function () {
    this.setTab('shows');
    this.enterController(this.sidebarController);
  }

, model: function (params) {
    this.set('currentEpisodeSlug', params.episodeSlug);
    var controller = this.controllerFor('show');
    var episodes; //= controller.get('episodes');
    var episode; //= controller.get('episodes');
    var show; //= controller.get('show');

    if (!show && window.DATA.show && window.DATA.show) {
      show = Show.create(window.DATA.show);
      window.DATA.show = null;
    }

    if (!episodes && window.DATA.episodes) {
      episodes = window.DATA.episodes.map(function(data) { return Episode.create(data); });
      episode = episodes.findBy('path', show.get('path')+'/'+params.episodeSlug);
      window.DATA.episodes = null;
    }

    if (show && episodes && episodes.length >= 1) {
      return {episodes: episodes, show: show, episode:episode};
    }

    controller.set('isLoading', true);
    return Ember.$.getJSON('/api/shows/'+params.slug).then(function (res) {
      controller.set('isLoading', false);
      show = Show.create(res.show);
      episodes = res.episodes.map(function(data) { return Episode.create(data); });
      episode = episodes.findBy('path', show.get('path')+'/'+params.EpisodeSlug);
      return {episodes: episodes, show: show};
    });
  }

, setupController: function(controller, model) {
    if (model.episodes) this.controllerFor('show').set('episodes', model.episodes);
    this.controllerFor('application').setCurrentEpisode(model.episode);
    this.controllerFor('application').setCurrentShow(model.show);
  }

, serialize: function(model) {
    var episode = model.episode;

    if (!episode && model.episodes && model.show) {
      episode = model.episodes.findBy('path', model.show.path+'/'+this.get('currentEpisodeSlug'));
    }

    return {
      slug: episode.get('path').split('/')[1]
    , episodeSlug: episode.get('path').split('/')[2]
    };
  }

, renderTemplate: function () {}

});
