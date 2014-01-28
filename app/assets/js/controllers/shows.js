var App = require('../app').instance;

App.ShowsController = Ember.ArrayController.extend({

  needs: 'application'

, sort: 'title'

, onSortChange: function () {
    this.set('shows', this.get('shows').sortBy(this.get('sort')));
  }.observes('sort')

, actions: {
    showClick: function (show) {
      this.transitionToRoute('show', {show: show});
    }
  }

});
