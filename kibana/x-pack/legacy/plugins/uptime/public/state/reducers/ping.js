"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pingReducer = void 0;

var _reduxActions = require("redux-actions");

var _actions = require("../actions");

var _handleActions;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  pingHistogram: null,
  loading: false,
  errors: []
};
var pingReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, String(_actions.getPingHistogram), function (state) {
  return _objectSpread({}, state, {
    loading: true
  });
}), _defineProperty(_handleActions, String(_actions.getPingHistogramSuccess), function (state, action) {
  return _objectSpread({}, state, {
    loading: false,
    pingHistogram: _objectSpread({}, action.payload)
  });
}), _defineProperty(_handleActions, String(_actions.getPingHistogramFail), function (state, action) {
  return _objectSpread({}, state, {
    errors: [].concat(_toConsumableArray(state.errors), [action.payload]),
    loading: false
  });
}), _handleActions), initialState);
exports.pingReducer = pingReducer;