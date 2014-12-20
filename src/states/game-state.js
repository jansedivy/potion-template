var app = require('../app');

var Camera = require('../lib/camera');

var GameState = function() {};

GameState.prototype.init = function() {
  this.camera = new Camera(0, 0, app.width, app.height);
};

GameState.prototype.update = function() {
};

GameState.prototype.render = function() {
  app.video.ctx.translate(-this.camera.bounds.l, -this.camera.bounds.t);

  app.video.ctx.translate(this.camera.bounds.l, this.camera.bounds.t);
};

module.exports = GameState;
