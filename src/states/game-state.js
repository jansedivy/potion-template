var State = require('../lib/state');

module.exports = function(app) {
  var GameState = function() {
  };

  GameState.prototype = Object.create(State.prototype);
  GameState.constructor = State;

  return GameState;
};
