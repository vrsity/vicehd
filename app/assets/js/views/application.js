var App = require('../app').instance;

var KEY_CODES = {
  UP: 38
, DOWN: 40
, J: 74
, K: 75
};

App.ApplicationView = Ember.View.extend({

  classNames: 'app'

, classNameBindings: ['controller.videoIsExpanded']

, didInsertElement: function(){
    Ember.$(document).on('keydown', this.onKeyDown_.bind(this));
    Ember.$(window).on('resize', this.onResize_.bind(this));
    this.onResize_();
    window.scrollTo(0,1);
  }

, onResize_: function () {
    this.set('controller.isSmall', Ember.$( window ).width() <= 600);
  }

, onKeyDown_: function (e) {
    switch (e.keyCode) {
      case KEY_CODES.DOWN:
      case KEY_CODES.J:
        this.get('controller').send('advance');
      break;
      case KEY_CODES.UP:
      case KEY_CODES.K:
        this.get('controller').send('advance', -1);
      break;
    }
  }

});
