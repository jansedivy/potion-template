var Stats = require('stats.js');
var util = require('util');

var indexToNumberAndLowerCaseKey = function(index) {
  if (index <= 9) {
    return 48 + index;
  } else if (index === 10) {
    return 48;
  } else if (index > 10 && index <= 36) {
    return 64 + (index-10);
  } else {
    return null;
  }
};

module.exports = function(app) {
  var Debugger = function() {
    this.logs = [];

    this.showDebug = true;

    this.enableSlowDown = false;
    this.enableDebugKeys = true;
    this.enableShortcuts = false;

    this.enableShortcutsKey = 220;

    this.keyShortcuts = [
      { key: 123, entry: 'showDebug', type: 'toggle' }
    ];

    this.options = [
      { name: 'Slow Down', entry: 'enableSlowDown', type: 'toggle' }
    ];

    this.stats = new Stats(200);
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.right = '0px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);

    var self = this;
    window.onerror = function(error) { self.error(error); };
  };

  Debugger.prototype.error = function(message) {
    this.print(message, 'error');
  };

  Debugger.prototype.warning = function(message) {
    this.print(message, 'warning');
  };

  Debugger.prototype.log = function(message) {
    this.print(message, 'log');
  };

  Debugger.prototype.print = function(message, type) {
    this.logs.push({ text: util.inspect(message), life: 4, type: type });
  };

  Debugger.prototype.update = function(time) {
    for (var i=0, len=this.logs.length; i<len; i++) {
      var log = this.logs[i];
      if (log) {
        log.life -= time;
        if (log.life <= 0) {
          var index = this.logs.indexOf(log);
          if (index > -1) { this.logs.splice(index, 1); }
        }
      }
    }
  };

  Debugger.prototype.keydown = function(key) {
    var i;

    if (this.enableDebugKeys) {
      if (key === this.enableShortcutsKey) {
        this.enableShortcuts = !this.enableShortcuts;
        return true;
      }

      if (this.enableShortcuts) {
        for (i=0; i<this.options.length; i++) {
          var option = this.options[i];

          var keyIndex = i + 1;

          keyIndex = indexToNumberAndLowerCaseKey(keyIndex);

          if (keyIndex && key === keyIndex) {
            if (option.type === 'toggle') {
              this[option.entry] = !this[option.entry];
              if (this[option.entry]) {
                this.log('toggles ' + option.name + ' ON');
              } else {
                this.log('toggles ' + option.name + ' OFF');
              }
            } else if (option.type === 'call') {
              this[option.entry]();
            }

            return true;
          }
        }
      }
    }

    for (i=0; i<this.keyShortcuts.length; i++) {
      var keyShortcut = this.keyShortcuts[i];
      if (keyShortcut.key === key) {

        if (keyShortcut.type === 'toggle') {
          this[keyShortcut.entry] = !this[keyShortcut.entry];
        } else if (keyShortcut.type === 'call') {
          this[keyShortcut.entry]();
        }

        return true;
      }
    }

    return false;
  };

  Debugger.prototype.render = function() {
    if (this.showDebug) {
      app.video.ctx.save();
      app.video.ctx.font = '15px sans-serif';
      app.video.ctx.strokeStyle = 'black';
      app.video.ctx.textAlign = 'left';
      app.video.ctx.lineJoin = 'round';
      app.video.ctx.lineWidth = 3;

      for (var i=0, len=this.logs.length; i<len; i++) {
        var log = this.logs[i];

        var color = 'white';

        if (log.type === 'error') {
          color = '#F6442E';
        } else if (log.type === 'warning') {
          color = 'yellow';
        }

        app.video.ctx.fillStyle = color;

        var x = 10;
        var y = -10 + app.height + (i - this.logs.length + 1) * 20;
        app.video.ctx.strokeText(log.text, x, y);
        app.video.ctx.fillText(log.text, x, y);
      }
      app.video.ctx.restore();
    }
  };

  Debugger.prototype.beginFrame = function() {
    this.stats.begin();
  };

  Debugger.prototype.endFrame = function() {
    this.stats.end();
  };

  return Debugger;
};
