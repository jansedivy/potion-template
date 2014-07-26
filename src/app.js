var Potion = require('potion');
var Debugger = require('potion-debugger');

var VideoMixin = require('./lib/video-mixin');
var StateManager = require('./lib/state-manager');

var app = Potion.init(document.querySelector('.game'), {
  resize: function() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
  },

  configure: function() {
    this.config.useRetina = true;
  },

  init: function() {
    this.runtime = {
      time: 0,
      realFps: 0
    };

    this.debug = new Debugger(this);

    this.game = null;

    var MenuState = require('./states/menu-state');

    this.video.include(VideoMixin);
    this.states = new StateManager();

    this.states.add('menu', new MenuState());
  },

  render: function() {
    this.states.render();

    this.debug.render();
  },

  update: function(time) {
    this.runtime.time = this.runtime.time + time;

    this.runtime.realFps = 1/time;

    if (this.debug.enableSlowDown) {
      this.states.update(time / 8);
    } else {
      this.states.update(time);
    }
  },

  exitUpdate: function(time) {
    this.debug.update(time);
  },

  keydown: function(key) {
    if (this.debug.keydown(key)) { return; }

    this.states.keydown(key);
  },

  keyup: function(key) {
    this.states.keyup(key);
  },

  keypress: function(key) {
    this.states.keypress(key);
  },

  click: function(x, y, button) {
    this.states.click(x, y, button);
  },

  mouseup: function(x, y) {
    this.states.mouseup(x, y);
  },

  mousedown: function(x, y) {
    this.states.mousedown(x, y);
  }
});

module.exports = app;
