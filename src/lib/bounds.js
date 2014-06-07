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
  this.set(l, t, l + this.width, t + this.height);
};

Bounds.prototype.moveX = function(l) {
  this.set(l, this.t, l + this.width, this.b);
};

Bounds.prototype.moveY = function(t) {
  this.set(this.l, t, this.r, t + this.height);
};

Object.defineProperty(Bounds.prototype, 'width', {
  get: function() {
    return this.r - this.l;
  },

  set: function(value) {
    this.r = this.l + value;
  }
});

Object.defineProperty(Bounds.prototype, 'height', {
  get: function() {
    return this.b - this.t;
  },

  set: function(value) {
    this.b = this.l + value;
  }
});

Object.defineProperty(Bounds.prototype, 'centerX', {
  get: function() {
    return this.l + this.width * 0.5;
  }
});

Object.defineProperty(Bounds.prototype, 'centerY', {
  get: function() {
    return this.t + this.height * 0.5;
  }
});

Bounds.prototype.nudge = function(x, y) {
  x = x || 0;
  y = y || 0;

  this.l = this.l + x;
  this.t = this.t + y;
  this.r = this.r + x;
  this.b = this.b + y;
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
  var dx = (this.centerX - other.centerX) / other.width;
  var dy = (this.centerY - other.centerY) / other.height;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (this.centerX > other.centerX) {
      this.nudge(other.r - this.l, 0);
      return 1;
    } else {
      this.nudge(other.l - this.r, 0);
      return 3;
    }
  } else {
    if (this.centerY > other.centerY) {
      this.nudge(0, other.b - this.t);
      return 2;
    } else {
      this.nudge(0, other.t - this.b);
      return 0;
    }
  }
};

module.exports = Bounds;
