var Timer = function() {
  this.timers = {};
};

Timer.prototype.every = function(name, time, callback) {
  this.new(name, time, callback, true);
};

Timer.prototype.after = function(name, time, callback) {
  this.new(name, time, callback, false);
};

Timer.prototype.new = function(name, time, callback, repeat) {
  var timer = this.timers[name];
  if (timer) { return; }

  this.timers[name] = {
    original: time,
    time: time,
    callback: callback,
    repeat: repeat
  };
};

Timer.prototype.update = function(time) {
  for (var name in this.timers) {
    var timer = this.timers[name];
    timer.time -= time;
    if (timer.time < 0) {
      timer.callback();
      timer.time = timer.original;

      if (!timer.repeat) {
        delete this.timers[name];
      }
    }
  }
};

module.exports = Timer;
