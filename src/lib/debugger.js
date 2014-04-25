module.exports = function(app) {
  var Debugger = function() {
    this.logs = [];
    this.showDebug = true;

    this.keyShortcuts = [
      { key: 93, entry: 'showDebug', type: 'toggle' },
      { key: 91, entry: 'reload', type: 'call' }
    ];
  };

  Debugger.prototype.reload = function() {
    // app.running = false;
    // var script = document.createElement('script');
    // script.src = 'bundle.js';
    // document.body.appendChild(script);
  };

  Debugger.prototype.log = function(text) {
    this.logs.push({ text: text, life: 4 });
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
      app.video.ctx.lineCap = 'round';
      app.video.ctx.fillStyle = 'white';
      app.video.ctx.lineWidth = 3;

      for (var i=0, len=this.logs.length; i<len; i++) {
        var log = this.logs[i];

        app.video.ctx.strokeText(log.text, 10, -10 + app.height + (i - this.logs.length + 1) * 20);
        app.video.ctx.fillText(log.text, 10, -10 + app.height + (i - this.logs.length + 1) * 20);
      }
      app.video.ctx.restore();
    }
  };

  return Debugger;
};
