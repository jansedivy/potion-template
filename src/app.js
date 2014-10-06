var Potion = require('potion');

var VideoMixin = require('./lib/video-mixin');

var app = Potion.init(document.querySelector('.game'), {
  configure: function() {
    this.config.useRetina = false;
  },

  init: function() {
    this.runtime = {
      time: 0
    };

    this.game = null;

    var MenuState = require('./states/menu-state');

    this.video.include(VideoMixin);

    this.states.add('menu', new MenuState());
  },

  update: function(time) {
    this.runtime.time = this.runtime.time + time;
  }
});

module.exports = app;
