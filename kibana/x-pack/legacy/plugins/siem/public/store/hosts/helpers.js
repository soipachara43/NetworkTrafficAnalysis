"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHostsQueriesActivePageToZero = exports.setHostDetailsQueriesActivePageToZero = exports.setHostPageQueriesActivePageToZero = void 0;

var _constants = require("../constants");

var _model = require("./model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setHostPageQueriesActivePageToZero = function setHostPageQueriesActivePageToZero(state) {
  var _objectSpread2;

  return _objectSpread({}, state.page.queries, (_objectSpread2 = {}, _defineProperty(_objectSpread2, _model.HostsTableType.authentications, _objectSpread({}, state.page.queries[_model.HostsTableType.authentications], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.HostsTableType.hosts, _objectSpread({}, state.page.queries[_model.HostsTableType.hosts], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.HostsTableType.events, _objectSpread({}, state.page.queries[_model.HostsTableType.events], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.HostsTableType.uncommonProcesses, _objectSpread({}, state.page.queries[_model.HostsTableType.uncommonProcesses], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.HostsTableType.alerts, _objectSpread({}, state.page.queries[_model.HostsTableType.alerts], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _objectSpread2));
};

exports.setHostPageQueriesActivePageToZero = setHostPageQueriesActivePageToZero;

var setHostDetailsQueriesActivePageToZero = function setHostDetailsQueriesActivePageToZero(state) {
  var _objectSpread3;

  return _objectSpread({}, state.details.queries, (_objectSpread3 = {}, _defineProperty(_objectSpread3, _model.HostsTableType.authentications, _objectSpread({}, state.details.queries[_model.HostsTableType.authentications], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.HostsTableType.hosts, _objectSpread({}, state.details.queries[_model.HostsTableType.hosts], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.HostsTableType.events, _objectSpread({}, state.details.queries[_model.HostsTableType.events], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.HostsTableType.uncommonProcesses, _objectSpread({}, state.details.queries[_model.HostsTableType.uncommonProcesses], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.HostsTableType.alerts, _objectSpread({}, state.page.queries[_model.HostsTableType.alerts], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _objectSpread3));
};

exports.setHostDetailsQueriesActivePageToZero = setHostDetailsQueriesActivePageToZero;

var setHostsQueriesActivePageToZero = function setHostsQueriesActivePageToZero(state, type) {
  if (type === _model.HostsType.page) {
    return setHostPageQueriesActivePageToZero(state);
  } else if (type === _model.HostsType.details) {
    return setHostDetailsQueriesActivePageToZero(state);
  }

  throw new Error("HostsType ".concat(type, " is unknown"));
};

exports.setHostsQueriesActivePageToZero = setHostsQueriesActivePageToZero;