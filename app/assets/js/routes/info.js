var App = require('../app').instance;

App.InfoRoute = Ember.Route.extend(App.SetTab, {

  sidebarController: 'info'

, beforeModel: function () {
    this.setTab('info');
    this.enterController(this.sidebarController);
  }

, setupController: function() {
  }

, renderTemplate: function () {
  }

});


