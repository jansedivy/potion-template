var Stats = require('stats.js');

module.exports = function(app) {
  var Debugger = function() {
    this.logs = [];
    this.showDebug = true;

    this.keyShortcuts = [
      { key: 93, entry: 'showDebug', type: 'toggle' }
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
    if (message) {
      if (message !== null && typeof message === 'object') {
        message = this.stringifyObject(message);
      } else {
        message = message.toString();
      }

      this.logs.push({ text: message, life: 4, type: type });
    }
  };

  Debugger.prototype.stringifyObject = function(o) {
    var cache = [];

    var result = JSON.stringify(o, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });

    cache = null;

    return result;
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

  Debugger.prototype.keypress = function(key) {
    for (var i=0; i<this.keyShortcuts.length; i++) {
      var keyShortcut = this.keyShortcuts[i];
      if (keyShortcut.key === key) {

        if (keyShortcut.type === 'toggle') {
          this[keyShortcut.entry] = !this[keyShortcut.entry];
        } else if (keyShortcut.type === 'call') {
          this[keyShortcut.entry]();
        }
        break;
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
