var MenuState, GameState, Debugger;

var Potion = require('potion');

var VideoMixin = require('./lib/video-mixin');
var StateManager = require('./lib/state-manager');

var app = Potion.init(document.querySelector('.game'), {
  resize: function() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
  },

  init: function() {
    GameState = require('./states/game-state')(this);
    MenuState = require('./states/menu-state')(this);

    this.runtime = {
      time: 0,
      realFps: 0
    };

    this.game = null;

    this.debug = new Debugger();

    this.video.include(VideoMixin);
    this.states = new StateManager();

    this.states.add('menu', new MenuState());
    this.switchState('game');
  },

  render: function() {
    this.states.render();
    this.debug.render();

    this.debug.endFrame();
  },

  update: function(time) {
    this.debug.beginFrame();
    this.runtime.time = this.runtime.time + time;

    this.runtime.realFps = 1/time;

    this.debug.update(time);
    this.states.update(time);
  },

  keypress: function(key) {
    if (this.debug.keypress(key)) { return; }

    this.states.keypress(key);
  },

  click: function(x, y, button) {
    this.states.click(x, y, button);
  },

  mouseup: function(x, y) {
    this.states.mouseup(x, y);
  },

  switchState: function(name) {
    this.states.destroy('menu');

    if (name === 'game') {
      if (this.states.get('game')) {
        this.states.remove('game');
      }
      this.game = this.states.add('game', new GameState());
    }
  }
});

Debugger = require('./lib/debugger')(app);
