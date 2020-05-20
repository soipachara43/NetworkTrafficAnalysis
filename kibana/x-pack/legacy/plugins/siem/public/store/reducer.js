"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.createInitialState = exports.initialState = void 0;

var _redux = require("redux");

var _app = require("./app");

var _drag_and_drop = require("./drag_and_drop");

var _hosts = require("./hosts");

var _inputs = require("./inputs");

var _network = require("./network");

var _reducer = require("./timeline/reducer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  app: _app.initialAppState,
  dragAndDrop: _drag_and_drop.initialDragAndDropState,
  hosts: _hosts.initialHostsState,
  inputs: _inputs.initialInputsState,
  network: _network.initialNetworkState,
  timeline: _reducer.initialTimelineState
};
exports.initialState = initialState;

var createInitialState = function createInitialState() {
  return _objectSpread({}, initialState, {
    inputs: (0, _inputs.createInitialInputsState)()
  });
};

exports.createInitialState = createInitialState;
var reducer = (0, _redux.combineReducers)({
  app: _app.appReducer,
  dragAndDrop: _drag_and_drop.dragAndDropReducer,
  hosts: _hosts.hostsReducer,
  inputs: _inputs.inputsReducer,
  network: _network.networkReducer,
  timeline: _reducer.timelineReducer
});
exports.reducer = reducer;