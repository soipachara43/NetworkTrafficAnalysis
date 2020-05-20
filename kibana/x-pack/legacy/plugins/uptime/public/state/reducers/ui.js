"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiReducer = void 0;

var _reduxActions = require("redux-actions");

var _ui = require("../actions/ui");

var _handleActions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  alertFlyoutVisible: false,
  basePath: '',
  esKuery: '',
  integrationsPopoverOpen: null,
  lastRefresh: Date.now()
};
var uiReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, String(_ui.toggleIntegrationsPopover), function (state, action) {
  return _objectSpread({}, state, {
    integrationsPopoverOpen: action.payload
  });
}), _defineProperty(_handleActions, String(_ui.setAlertFlyoutVisible), function (state, action) {
  var _action$payload;

  return _objectSpread({}, state, {
    alertFlyoutVisible: (_action$payload = action.payload) !== null && _action$payload !== void 0 ? _action$payload : !state.alertFlyoutVisible
  });
}), _defineProperty(_handleActions, String(_ui.setBasePath), function (state, action) {
  return _objectSpread({}, state, {
    basePath: action.payload
  });
}), _defineProperty(_handleActions, String(_ui.triggerAppRefresh), function (state, action) {
  return _objectSpread({}, state, {
    lastRefresh: action.payload
  });
}), _defineProperty(_handleActions, String(_ui.setEsKueryString), function (state, action) {
  return _objectSpread({}, state, {
    esKuery: action.payload
  });
}), _handleActions), initialState);
exports.uiReducer = uiReducer;