var App = require('../app').instance;

App.FeedView = Ember.View.extend(App.EpisodeList, InfiniteScroll.ViewMixin, App.Animatable, {
  templateName: 'feed'

, classNames: ['sidebar-content-view', 'scrollable']

, classNameBindings: ['controller.isLoading', 'isScrolling', 'controller.isShowing']

, didInsertElement: function(){
    this.animate();
    this.setupScrollWatcher();
  }

, willDestroyElement: function(){
    this.teardownScrollWatcher();
  }

, autoPlay: function () {
    this.get('controller').send('autoPlay');
  }.on('didInsertElement')

});
