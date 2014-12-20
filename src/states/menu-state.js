var app = require('../app');

var GameState = require('./game-state');

var MenuState = function() {};

MenuState.prototype.init = function() {
  app.states.add('game', new GameState());
  app.states.destroy('menu');
};

MenuState.prototype.update = function() {};

MenuState.prototype.render = function() {
  app.video.ctx.save();
  app.video.ctx.fillStyle = 'blck';
  app.video.ctx.textAlign = 'center';
  app.video.ctx.font = '15px sans-serif';
  app.video.ctx.fillText('Press any key to start the game', app.width/2, 200);
  app.video.ctx.restore();
};

module.exports = MenuState;
