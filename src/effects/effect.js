module.exports = function(app) {
  var Effect = function(x, y) {
    this.x = x - 10;
    this.y = y - 5;
    this.dead = false;

    this.opacity = 1;
  };

  Effect.prototype.update = function(time) {
    this.opacity = this.opacity + (-1 - this.opacity) * time;

    if (this.opacity < 0) {
      this.opacity = 0;
      this.dead = true;
    }
  };

  Effect.prototype.render = function() {
    app.video.ctx.fillStyle = 'rgba(0, 100, 250, ' + this.opacity + ')';
    app.video.ctx.beginPath();
    app.video.drawEllipse(this.x, this.y, 20, 10);
    app.video.ctx.fill();
    app.video.ctx.closePath();
  };

  return Effect;
};
