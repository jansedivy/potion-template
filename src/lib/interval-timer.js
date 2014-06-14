var IntervalTimer = function() {
  this._interval = 0;
  this._current = 0;
};

IntervalTimer.prototype.update = function(time) {
  this._current += time;
  if (this._current < 0) {
    this._current = 0;
  }
};

IntervalTimer.prototype.passed = function() {
  return this._current >= this._interval;
};

IntervalTimer.prototype.reset = function() {
  if (this._current >= this._interval) {
    this._current -= this._interval;
  }
};

IntervalTimer.prototype.setInterval = function(interval) {
  this._interval = interval;
};

IntervalTimer.prototype.setCurrent = function(current) {
  this._current = current;
};

module.exports = IntervalTimer;
