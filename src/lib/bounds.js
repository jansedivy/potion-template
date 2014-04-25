var Bounds = function(l, t, r, b) {
  this.set(l, t, r, b);
};

Bounds.prototype.set = function(l, t, r, b) {
  this.l = l;
  this.t = t;
  this.r = r;
  this.b = b;
};

Bounds.prototype.move = function(l, t) {
  this.set(l, t, l + this.getWidth(), t + this.getHeight());
};

Bounds.prototype.moveX = function(l) {
  this.set(l, this.t, l + this.getWidth(), this.b);
};

Bounds.prototype.moveY = function(t) {
  this.set(this.l, t, this.r, t + this.getHeight());
};

Bounds.prototype.setWidth = function(width) {
  this.r = this.l + width;
};

Bounds.prototype.setHeight = function(height) {
  this.b = this.t + height;
};

Bounds.prototype.getWidth = function() {
  return this.r - this.l;
};

Bounds.prototype.getHeight = function() {
  return this.b - this.t;
};

Bounds.prototype.nudge = function(x, y) {
  x = x || 0;
  y = y || 0;

  this.l = this.l + x;
  this.t = this.t + y;
  this.r = this.r + x;
  this.b = this.b + y;
};

Bounds.prototype.getCenterX = function() {
  return this.l + this.getWidth() * 0.5;
};

Bounds.prototype.getCenterY = function() {
  return this.t + this.getHeight() * 0.5;
};

Bounds.prototype.inside = function(x, y) {
  return !(x < this.l || x > this.r || y < this.t || y > this.b);
};

Bounds.prototype.intersect = function(other) {
  return (this.r >= other.l &&
          this.b >= other.t &&
          this.l <= other.r &&
          this.t <= other.b);
};

Bounds.prototype.resolveCollision = function(other) {
  var dx = (this.getCenterX() - other.getCenterX()) / other.getWidth();
  var dy = (this.getCenterY() - other.getCenterY()) / other.getHeight();

  if (Math.abs(dx) > Math.abs(dy)) {
    if (this.getCenterX() > other.getCenterX()) {
      this.nudge(other.r - this.l, 0);
      return 1;
    } else {
      this.nudge(other.l - this.r, 0);
      return 3;
    }
  } else {
    if (this.getCenterY() > other.getCenterY()) {
      this.nudge(0, other.b - this.t);
      return 2;
    } else {
      this.nudge(0, other.t - this.b);
      return 0;
    }
  }
};

module.exports = Bounds;
