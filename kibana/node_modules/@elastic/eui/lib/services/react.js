"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enqueueStateChange = enqueueStateChange;

var _reactDom = require("react-dom");

var _queue = [];

function processQueue() {
  // the queued functions trigger react setStates which, if unbatched,
  // each cause a full update->render->dom pass _per function_
  // instead, tell React to wait until all updates are finished before re-rendering
  (0, _reactDom.unstable_batchedUpdates)(function () {
    for (var i = 0; i < _queue.length; i++) {
      _queue[i]();
    }

    _queue.length = 0;
  });
}

function enqueueStateChange(fn) {
  if (_queue.length === 0) {
    setTimeout(processQueue);
  }

  _queue.push(fn);
}