var App = require('../app').instance;

App.TabsView = Ember.View.extend({
  templateName: 'tabs'

, tagName: 'nav'

, classNames: ['cf', 'tab-bar']

, setActiveTab: function () {
    this.$('.active').removeClass('active');
    var ct = this.get('controller.currentTab');
    this.$('[data-tab="'+ct+'"]').addClass('active');
  }.observes('controller.currentTab').on('didInsertElement')

});
