var App = require('../app').instance;

function enterTransition (old, next) {
  if ('show' === old && 'show' === next) return;
  if ('shows' === old && 'show' === next) return 'enter-left';
  if ('show' === old && 'shows' === next) return 'enter-right';
  return 'enter';
}

function exitTransition (old, next) {
  if ('show' === old && 'show' === next) return;
  if ('shows' === old && 'show' === next) return 'exit-left';
  if ('show' === old && 'shows' === next) return 'exit-right';
  return 'exit';
}

function navbarTransition (old, next) {
  if (old === 'shows' && next === 'show') return 'animate-title-enter';
  if (old === 'show' && next === 'shows') return 'animate-controls-enter';
  if (next === 'shows') return 'show-controls';
  if (next === 'show' || next === 'episode') return 'show-title';
}

App.SetTab = Ember.Mixin.create({

  setTab: function (name) {
    this.controllerFor('sidebar').set('currentTab', name);
  }

, enterController: function (name) {
    var sidebar = this.controllerFor('sidebar');
    var old = sidebar.get('currentControllerName');
    var next = this.controllerFor(name);
    var oldController, exit, delay;

    sidebar.set('currentControllerName', name);

    if (old === name) return;
    if (old) {
      exit = exitTransition(old, name);
      oldController = this.controllerFor(old);
      oldController.set('transition', exit);
      delay = exit.match(/left|right/) ? 300 : 0;

      Ember.run.later(this, function() {
        oldController.set('isShowing', false);
      }, delay);
    }

    next.setProperties({
      transition: enterTransition(old, name)
    , isShowing: true
    });

    sidebar.set('transition', navbarTransition(old, name));
  }

});
