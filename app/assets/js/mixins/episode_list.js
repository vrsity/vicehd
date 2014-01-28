var App = require('../app').instance;

function isElementInViewport (parent, el) {
  var parentRect = parent.getBoundingClientRect();
  var itemRect = el.getBoundingClientRect();
  var wiggleRoom = 20;
  var top = itemRect.top - parentRect.top + wiggleRoom;
  var bottom = (itemRect.bottom - parentRect.top) - wiggleRoom;
  if ((top >= 0) && (bottom <= parent.clientHeight)) {
    return false;
  } else {
    return {parentRect: parentRect, itemRect: itemRect};
  }
}

App.EpisodeList = Ember.Mixin.create({

  currentEpisodeId: function () {
    var e = this.get('controller.currentEpisode');
    return e && e._id;
  }

, scrollIntoView: function ($el) {
    if (this.controller.controllerFor('application').get('isSmall')) return;
    var parent = this.$()[0];
    var el = $el[0];
    var rects = isElementInViewport(parent, el);
    if (!rects) return;
    var top = rects.itemRect.top - rects.parentRect.top + parent.scrollTop;
    top = top - (rects.parentRect.height/2) + (rects.itemRect.height/2);
    this.$().animate({scrollTop:top}, 200);
  }

, updateAcitveLink: function () {
    var $next = this.$('[data-id="'+this.currentEpisodeId()+'"]');
    if ($next && $next.length) {
      if (!this.get('isScrolling')) this.scrollIntoView($next);
    }
  }.on('didInsertElement').observes('controller.currentEpisode')

});
