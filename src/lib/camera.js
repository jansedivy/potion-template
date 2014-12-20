var Bounds = require('./bounds');
var math = require('./math');

var Camera = function(left, top, right, bottom) {
  this.bounds = new Bounds(left, top, right, bottom);

  this._targetX = left;
  this._targetY = top;

  this.friction = 0;
};

Camera.prototype.lerpTo = function(x, y, time) {
  this._targetX = x;
  this._targetY = y;

  var newX = x;
  var newY = y;

  if (this.friction > 0) {
    newX = math.lerp(this.bounds.centerX, x, time * this.friction);
    newY = math.lerp(this.bounds.centerY, y, time * this.friction);
  }

  this.bounds.move(newX - this.bounds.width/2, newY - this.bounds.height/2);
};

Camera.prototype.move = function(x, y) {
  this.bounds.move(x, y);
};

module.exports = Camera;
