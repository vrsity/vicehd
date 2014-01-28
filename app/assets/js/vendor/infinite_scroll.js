(function(window, Ember){
  var InfiniteScroll = {
  };

  InfiniteScroll.ViewMixin = Ember.Mixin.create({
    setupScrollWatcher: function(options){
      options || (options = {});
      if (!options.debounce) options.debounce = 150;
      if (!options.action) options.action = 'didScrollToBottom';

      var getEl = function (name) {
        var ret;
        if (options[name]) {
          ret = this.scrollFrame();
          if ('string' === typeof ret) ret = this.$(ret);
        }
        return ret;
      };

      options.scrollFrame = getEl('scrollFrame') || this.$();
      options.scrollContent = getEl('scrollContent') || options.scrollFrame.children().first();

      this._scrollWatcherOptions = options;
      options.scrollFrame.on('scroll.ember-scroll-frame', this.didScroll.bind(this));
    },

    teardownScrollWatcher: function(){
      this._scrollFrame.off('scroll.ember-scroll-frame');
      delete this._scrollWatcherOptions;
    },

    didScroll: function(){
      var options = this._scrollWatcherOptions;
      Ember.run.debounce(this, function () {
        this.set('isScrolling', true);
        clearTimeout(this._scrollTimer);
        this._scrollTimer = setTimeout(function () { this.set('isScrolling', false); }.bind(this), 500);

        if (this.isScrolledToBottom()) {
          this.get('controller').send(options.action);
        }
      }, options.debounce);
    },

    isScrolledToBottom: function(){
      var options = this._scrollWatcherOptions;
      var distanceToViewportTop = (options.scrollContent.height() - options.scrollFrame.height());
      var viewPortTop = options.scrollFrame.scrollTop();

      if (viewPortTop === 0) return false;

      return (viewPortTop - distanceToViewportTop === 0);
    }
  });

  window.InfiniteScroll = InfiniteScroll;
})(this, Ember);
