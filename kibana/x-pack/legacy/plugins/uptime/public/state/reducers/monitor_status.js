"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monitorStatusReducer = void 0;

var _reduxActions = require("redux-actions");

var _actions = require("../actions");

var _handleActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  status: null,
  monitor: null,
  loading: false
};
var monitorStatusReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, String(_actions.getSelectedMonitorAction), function (state, action) {
  return _objectSpread({}, state, {
    loading: true
  });
}), _defineProperty(_handleActions, String(_actions.getSelectedMonitorActionSuccess), function (state, action) {
  return _objectSpread({}, state, {
    loading: false,
    monitor: _objectSpread({}, action.payload)
  });
}), _defineProperty(_handleActions, String(_actions.getSelectedMonitorActionFail), function (state, action) {
  return _objectSpread({}, state, {
    loading: false
  });
}), _defineProperty(_handleActions, String(_actions.getMonitorStatusAction), function (state, action) {
  return _objectSpread({}, state, {
    loading: true
  });
}), _defineProperty(_handleActions, String(_actions.getMonitorStatusActionSuccess), function (state, action) {
  return _objectSpread({}, state, {
    loading: false,
    status: _objectSpread({}, action.payload)
  });
}), _defineProperty(_handleActions, String(_actions.getMonitorStatusActionFail), function (state, action) {
  return _objectSpread({}, state, {
    loading: false
  });
}), _handleActions), initialState);
exports.monitorStatusReducer = monitorStatusReducer;