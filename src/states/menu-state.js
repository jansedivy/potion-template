var State = require('../lib/state');

module.exports = function(app) {
  var MenuState = function() {
  };

  MenuState.prototype = Object.create(State.prototype);
  MenuState.prototype.constructor = MenuState;

  MenuState.prototype.init = function() {
  };

  MenuState.prototype.keypress = function() {
    app.switchState('game');
  };

  MenuState.prototype.render = function() {
    app.video.ctx.save();
    app.video.ctx.fillStyle = 'blck';
    app.video.ctx.textAlign = 'center';
    app.video.ctx.font = '15px sans-serif';
    app.video.ctx.fillText('Press any key to start the game', app.width/2, 200);
    app.video.ctx.restore();
  };

  return MenuState;
};
