module.exports = {
  lerp: function(v0, v1, time) {
    return v0 + (v1 - v0) * time;
  },

  distance2: function(x1, y1, x2, y2) {
    var xd = x2 - x1;
    var yd = y2 - y1;

    return xd*xd + yd*yd;
  },

  distance: function(x1, y1, x2, y2) {
    return Math.sqrt(this.distance2(x1, y1, x2, y2));
  },

  angleBetweenPoints: function(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  },

  insideCircle: function(x, y, radius, targeX, targeY) {
    return this.distance(x, y, targeX, targeY) <= radius;
  },

  overlapingCircles: function(x1, y1, radius1, x2, y2, radius2) {
    return this.distance(x1, y1, x2, y2) <= radius1 + radius2;
  },

  normalizeAngle: function(angle)  {
    angle = angle % (2 * Math.PI);
    if (angle >= 0) {
      return angle;
    } else {
      return angle + 2 * Math.PI;
    }
  }
};
