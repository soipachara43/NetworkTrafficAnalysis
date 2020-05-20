"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlJobsReducer = void 0;

var _reduxActions = require("redux-actions");

var _actions = require("../actions");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  mlJob: (0, _utils.getAsyncInitialState)(),
  createJob: (0, _utils.getAsyncInitialState)(),
  deleteJob: (0, _utils.getAsyncInitialState)(),
  anomalies: (0, _utils.getAsyncInitialState)(),
  mlCapabilities: (0, _utils.getAsyncInitialState)()
};
var mlJobsReducer = (0, _reduxActions.handleActions)(_objectSpread({}, (0, _utils.handleAsyncAction)('mlJob', _actions.getExistingMLJobAction), {}, (0, _utils.handleAsyncAction)('mlCapabilities', _actions.getMLCapabilitiesAction), {}, (0, _utils.handleAsyncAction)('createJob', _actions.createMLJobAction), {}, (0, _utils.handleAsyncAction)('deleteJob', _actions.deleteMLJobAction), {}, (0, _utils.handleAsyncAction)('anomalies', _actions.getAnomalyRecordsAction), {}, _defineProperty({}, String(_actions.resetMLState), function (state) {
  return _objectSpread({}, state, {
    mlJob: {
      loading: false,
      data: null,
      error: null
    },
    createJob: {
      data: null,
      error: null,
      loading: false
    },
    deleteJob: {
      data: null,
      error: null,
      loading: false
    }
  });
})), initialState);
exports.mlJobsReducer = mlJobsReducer;