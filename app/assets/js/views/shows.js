var App = require('../app').instance;

App.ShowsView = Ember.View.extend(App.Animatable, InfiniteScroll.ViewMixin, {
  templateName: 'shows'

, classNames: ['sidebar-content-view', 'scrollable']

, classNameBindings: ['controller.isLoading', 'controller.isShowing']

//, onCurrentShowChange: function () {
    //var currentShow = this.get('controller.currentShow');
    //if (currentShow) {
      //this.$('[data-id="'+currentShow._id+'"]').addClass('active');
    //} else {
      //Ember.run.later(this, function() {
        //this.$('.active').removeClass('active');
      //}, 100);
    //}
  //}.observes('controller.currentShow')

});
