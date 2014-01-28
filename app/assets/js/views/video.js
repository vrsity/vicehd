/* globals OO: false, YT: false */
var App = require('../app').instance;

App.VideoView = Ember.View.extend({
  templateName: 'video'

, tagName: 'main'

, classNames: ['content']

, classNameBindings: ['hasVideo', 'isLoadingVideoPlayer', 'videoType']

, videoType: function () {
    return 'show-'+this.get('videoProvider');
  }.property('videoProvider')

, animateOverlay: function () {
    if (this.get('isLoadingVideoPlayer')) {
      console.log('enter');
      this.$().removeClass('animate-title-exit').addClass('animate-title-enter');
    } else {
      this.animationTimer = Ember.run.later(this, function() {
        this.$().removeClass('animate-title-enter').addClass('animate-title-exit');
      }, 500);
    }
  }.observes('isLoadingVideoPlayer')

, onEpisodeChange: function () {
    this.set('hasVideo', !!(this.get('controller.currentEpisode')));
    this.createVideoPlayer();
  }.observes('controller.currentEpisode').on('didInsertElement')

, createVideoPlayer: function () {
    if (window.ENV.fastDev) return console.log('stubbing player');

    this.videoPlayer && this.videoPlayer.pause && this.videoPlayer.pause();
    this.ytPlayer && this.ytPlayer.pauseVideo && this.ytPlayer.pauseVideo();

    var episode = this.get('controller.currentEpisode');
    if (!episode) return;

    if (episode.videoId || episode.youtubeId) this.set('isLoadingVideoPlayer', true);

    if (episode.videoId) {
      this.createOOPlayer(episode.videoId);
      this.set('videoProvider', 'oo-player');
    } else if (episode.youtubeId) {
      this.createYTPlayer(episode.youtubeId);
      this.set('videoProvider', 'youtube-player');
    } else {
      var url = 'http://www.vice.com'+episode.path;
      var html = '<div class="no-video-msg"">No video found, watch on vice.com?<br><a target="_blank" href="'+url+'">'+url+'</a></div>';
      this.$('.no-video-msg').remove();
      this.$().append(html);
    }

  }

, createOOPlayer: function (videoId) {
    var self = this;
    var controller = this.get('controller.controllers.sidebar');
    var onCreate = function(player) {
      player.subscribe(OO.EVENTS.PLAYED,'m', function() {
        controller.send('onVideoEnd');
      });
      player.subscribe(OO.EVENTS.PLAYBACK_READY, 'm', function () {
        self.set('isLoadingVideoPlayer', false);
        self.get('controller').send('saveVideoDuration', player.duration);
      });
    };
    if (this.videoPlayer) {
      this.videoPlayer.setEmbedCode(videoId);
    } else {
      this.videoPlayer = OO.Player.create('video-area', videoId, {
          height:'100%', width: '100%', wmode:'opaque', autoplay:true, onCreate:onCreate
      });
    }
  }

, createYTPlayer: function (youtubeId) {
    var controller = this.get('controller.controllers.sidebar');

    if (this.ytPlayer) {
      return this.ytPlayer.loadVideoById(youtubeId);
    }

    this.ytPlayer = new YT.Player('youtube-area', {
      height: '100%',
      width: '100%',
      videoId: youtubeId,
      playerVars: { html5: 1, autoplay: 1, autohide: 1 },
      events: {
        'onReady': function () {
          this.set('isLoadingVideoPlayer', false);
          this.get('controller').send('saveVideoDuration', this.ytPlayer.getDuration());
        }.bind(this)
      , 'onStateChange': function (e) {
          if(e.data === 0) controller.send('onVideoEnd');
        }
      }
    });
  }

});
