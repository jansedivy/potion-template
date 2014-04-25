var MenuState, GameState, Debugger;

var Potion = require('potion');

var VideoMixin = require('./lib/video-mixin');
var Timer = require('./lib/timer');
var StateManager = require('./lib/state-manager');

var Stats = require('./lib/stats.js');

var app = Potion.init(document.querySelector('.game'), {
  resize: function() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
  },

  configure: function() {
    // this.width = 700;
    // this.height = 600;
  },

  init: function() {
    this.config = {
      stepTime: 0.01666,
      fixedStep: false
    };

    this.runtime = {
      time: 0,
      realFps: 0,
      strayTime: 0
    };

    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    this.stats = stats;

    this.timer = new Timer();

    this.debug = new Debugger();

    this.video.include(VideoMixin);
    this.states = new StateManager();

    this.states.add('menu', new MenuState());
    this.switchState('game');
  },

  render: function() {
    this.states.render();
    this.debug.render();
    this.stats.end();
  },

  update: function(time) {
    this.stats.begin();
    this.runtime.time = this.runtime.time + time;

    this.runtime.realFps = 1/time;

    if (this.config.fixedStep) {
      this.runtime.strayTime = this.runtime.strayTime + time;
      while (this.runtime.strayTime >= this.config.stepTime) {
        this.runtime.strayTime = this.runtime.strayTime - this.config.stepTime;
        this._update(this.config.stepTime);
      }
    } else {
      this._update(time);
    }
  },

  _update: function(time) {
    this.debug.update(time);
    this.timer.update(time);
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
      this.states.add('game', new GameState());
    }
  }
});

MenuState = require('./states/menu-state')(app);
GameState = require('./states/game-state')(app);
Debugger = require('./lib/debugger')(app);
