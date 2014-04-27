var StateManager = function() {
  this.states = {};
  this.renderOrder = [];
  this.updateOrder = [];
};

StateManager.prototype.add = function(name, state) {
  this.states[name] = this.newStateHolder(name, state);
  this.refreshOrder();
  return state;
};

StateManager.prototype.refreshOrder = function() {
  this.renderOrder.length = 0;
  this.updateOrder.length = 0;

  for (var name in this.states) {
    var holder = this.states[name];
    if (holder) {
      this.renderOrder.push(holder);
      this.updateOrder.push(holder);
    }
  }
};

StateManager.prototype.newStateHolder = function(name, state) {
  var holder = {};
  holder.name = name;
  holder.state = state;
  holder.enabled = true;
  holder.paused = false;
  holder.render = true;
  holder.initialized = false;
  holder.update = true;
  return holder;
};

StateManager.prototype.get = function(name) {
  return this.states[name];
};

StateManager.prototype.destroy = function(name) {
  var state = this.get(name);
  if (state) {
    state.state.close();
    delete this.states[name];
    this.refreshOrder();
  }
};

StateManager.prototype.update = function(time) {
  for (var i=0, len=this.updateOrder.length; i<len; i++) {
    var state = this.updateOrder[i];
    if (!state.initialized && state.state.init) {
      state.state.init();
      state.initialized = true;
    }

    if (state.enabled && state.update && !state.paused) {
      state.state.update(time);
    }
  }
};

StateManager.prototype.render = function() {
  for (var i=0, len=this.renderOrder.length; i<len; i++) {
    var state = this.renderOrder[i];
    if (state.enabled && state.update && !state.paused) {
      state.state.render();
    }
  }
};

StateManager.prototype.mouseup = function(x, y) {
  for (var i=0, len=this.updateOrder.length; i<len; i++) {
    var state = this.updateOrder[i];
    if (state && state.enabled && !state.paused) {
      state.state.mouseup(x, y);
    }
  }
};

StateManager.prototype.click = function(x, y, button) {
  for (var i=0, len=this.updateOrder.length; i<len; i++) {
    var state = this.updateOrder[i];
    if (state && state.enabled && !state.paused) {
      state.state.click(x, y, button);
    }
  }
};

StateManager.prototype.keypress = function(key) {
  for (var i=0, len=this.updateOrder.length; i<len; i++) {
    var state = this.updateOrder[i];
    if (state && state.enabled && !state.paused) {
      state.state.keypress(key);
    }
  }
};

module.exports = StateManager;
