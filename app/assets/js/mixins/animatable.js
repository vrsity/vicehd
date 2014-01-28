var App = require('../app').instance;

App.Animatable = Ember.Mixin.create({
  animate: function () {
    var transition, className, $el = this.$();
    if ($el) {
      transition = this.get('controller.transition');
      className = transition ? 'animate-'+transition : '';
      if (className) $el.replaceClass(/animate-/, className);
    }
  }.observes('controller.transition').on('didInsertElement')

});
