"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultAppState = getDefaultAppState;
exports.getCurrentAppState = getCurrentAppState;
exports.getAppState = getAppState;
exports.assignAppState = assignAppState;
exports.setFullscreen = setFullscreen;
exports.setAutoplayInterval = setAutoplayInterval;
exports.setRefreshInterval = setRefreshInterval;

var _queryString = require("query-string");

var _lodash = require("lodash");

var _initial_state = require("../state/initial_state");

var _get_window = require("./get_window");

var _history_provider = require("./history_provider");

var _router_provider = require("./router_provider");

var _time_interval = require("./time_interval");

var _types = require("../../types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDefaultAppState() {
  var transientState = (0, _initial_state.getInitialState)('transient');
  var state = {};

  if (transientState.fullscreen) {
    state[_types.AppStateKeys.FULLSCREEN] = true;
  }

  if (transientState.refresh.interval > 0) {
    state[_types.AppStateKeys.REFRESH_INTERVAL] = (0, _time_interval.createTimeInterval)(transientState.refresh.interval);
  }

  if (transientState.autoplay.enabled) {
    state[_types.AppStateKeys.AUTOPLAY_INTERVAL] = (0, _time_interval.createTimeInterval)(transientState.autoplay.interval);
  }

  return state;
}

function getCurrentAppState() {
  var history = (0, _history_provider.historyProvider)((0, _get_window.getWindow)());

  var _history$getLocation = history.getLocation(),
      search = _history$getLocation.search;

  var qs = !!search ? (0, _queryString.parse)(search.replace(/^\?/, ''), {
    sort: false
  }) : {};
  var appState = assignAppState({}, qs);
  return appState;
}

function getAppState(key) {
  var appState = _objectSpread({}, getDefaultAppState(), {}, getCurrentAppState());

  return key ? (0, _lodash.get)(appState, key) : appState;
}

function assignAppState(obj, appState) {
  var fullscreen = appState[_types.AppStateKeys.FULLSCREEN];
  var refreshKey = appState[_types.AppStateKeys.REFRESH_INTERVAL];
  var autoplayKey = appState[_types.AppStateKeys.AUTOPLAY_INTERVAL];

  if (fullscreen) {
    obj[_types.AppStateKeys.FULLSCREEN] = true;
  } else {
    delete obj[_types.AppStateKeys.FULLSCREEN];
  }

  var refresh = Array.isArray(refreshKey) ? refreshKey[0] : refreshKey;

  if (refresh && (0, _time_interval.isValidTimeInterval)(refresh)) {
    obj[_types.AppStateKeys.REFRESH_INTERVAL] = refresh;
  } else {
    delete obj[_types.AppStateKeys.REFRESH_INTERVAL];
  }

  var autoplay = Array.isArray(autoplayKey) ? autoplayKey[0] : autoplayKey;

  if (autoplay && (0, _time_interval.isValidTimeInterval)(autoplay)) {
    obj[_types.AppStateKeys.AUTOPLAY_INTERVAL] = autoplay;
  } else {
    delete obj[_types.AppStateKeys.AUTOPLAY_INTERVAL];
  }

  return obj;
}

function setFullscreen(payload) {
  var appState = getAppState();
  var appValue = appState[_types.AppStateKeys.FULLSCREEN];

  if (payload === false && appValue) {
    delete appState[_types.AppStateKeys.FULLSCREEN];
    (0, _router_provider.routerProvider)().updateAppState(appState);
  } else if (payload === true && !appValue) {
    appState[_types.AppStateKeys.FULLSCREEN] = true;
    (0, _router_provider.routerProvider)().updateAppState(appState);
  }
}

function setAutoplayInterval(payload) {
  var appState = getAppState();
  var appValue = appState[_types.AppStateKeys.AUTOPLAY_INTERVAL];

  if (payload !== appValue) {
    if (!payload && appValue) {
      delete appState[_types.AppStateKeys.AUTOPLAY_INTERVAL];
      (0, _router_provider.routerProvider)().updateAppState(appState);
    } else if (payload) {
      appState[_types.AppStateKeys.AUTOPLAY_INTERVAL] = payload;
      (0, _router_provider.routerProvider)().updateAppState(appState);
    }
  }
}

function setRefreshInterval(payload) {
  var appState = getAppState();
  var appValue = appState[_types.AppStateKeys.REFRESH_INTERVAL];

  if (payload !== appValue) {
    if ((0, _time_interval.getTimeInterval)(payload)) {
      appState[_types.AppStateKeys.REFRESH_INTERVAL] = payload;
      (0, _router_provider.routerProvider)().updateAppState(appState);
    } else {
      delete appState[_types.AppStateKeys.REFRESH_INTERVAL];
      (0, _router_provider.routerProvider)().updateAppState(appState);
    }
  }
}