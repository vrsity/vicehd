var App = require('../app').instance;

App.SidebarController = Ember.Controller.extend({

  needs: ['shows', 'show']

, tabItems: [
    { route:'feed', title: 'feed' }
  , { route:'shows', title: 'shows' }
  , { route:'info', title: 'info' }
  ]

, hasNavbar: function () {
    return this.get('currentTab') === 'shows';
  }.property('currentTab')

, showTitle: Ember.computed.alias('controllers.show.show.title')

, isSortTitle: function () {
    return this.get('controllers.shows.sort') === 'title';
  }.property('controllers.shows.sort')

, isSortDate: function () {
    return this.get('controllers.shows.sort') === 'newestEpisodeDate';
  }.property('controllers.shows.sort')

, actions: {
    tabSelect: function (route) {
      this.transitionToRoute(route);
    }

  , sortClick: function (type) {
      this.get('controllers.shows').set('sort', type);
    }

  }

});
