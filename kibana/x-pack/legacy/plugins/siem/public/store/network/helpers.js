"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNetworkQueriesActivePageToZero = exports.setNetworkDetailsQueriesActivePageToZero = exports.setNetworkPageQueriesActivePageToZero = void 0;

var _model = require("./model");

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setNetworkPageQueriesActivePageToZero = function setNetworkPageQueriesActivePageToZero(state) {
  var _objectSpread2;

  return _objectSpread({}, state.page.queries, (_objectSpread2 = {}, _defineProperty(_objectSpread2, _model.NetworkTableType.topCountriesSource, _objectSpread({}, state.page.queries[_model.NetworkTableType.topCountriesSource], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.NetworkTableType.topCountriesDestination, _objectSpread({}, state.page.queries[_model.NetworkTableType.topCountriesDestination], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.NetworkTableType.topNFlowSource, _objectSpread({}, state.page.queries[_model.NetworkTableType.topNFlowSource], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.NetworkTableType.topNFlowDestination, _objectSpread({}, state.page.queries[_model.NetworkTableType.topNFlowDestination], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.NetworkTableType.dns, _objectSpread({}, state.page.queries[_model.NetworkTableType.dns], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.NetworkTableType.tls, _objectSpread({}, state.page.queries[_model.NetworkTableType.tls], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread2, _model.NetworkTableType.http, _objectSpread({}, state.page.queries[_model.NetworkTableType.http], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _objectSpread2));
};

exports.setNetworkPageQueriesActivePageToZero = setNetworkPageQueriesActivePageToZero;

var setNetworkDetailsQueriesActivePageToZero = function setNetworkDetailsQueriesActivePageToZero(state) {
  var _objectSpread3;

  return _objectSpread({}, state.details.queries, (_objectSpread3 = {}, _defineProperty(_objectSpread3, _model.IpDetailsTableType.topCountriesSource, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.topCountriesSource], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.IpDetailsTableType.topCountriesDestination, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.topCountriesDestination], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.IpDetailsTableType.topNFlowSource, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.topNFlowSource], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.IpDetailsTableType.topNFlowDestination, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.topNFlowDestination], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.IpDetailsTableType.tls, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.tls], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.IpDetailsTableType.users, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.users], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _defineProperty(_objectSpread3, _model.IpDetailsTableType.http, _objectSpread({}, state.details.queries[_model.IpDetailsTableType.http], {
    activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE
  })), _objectSpread3));
};

exports.setNetworkDetailsQueriesActivePageToZero = setNetworkDetailsQueriesActivePageToZero;

var setNetworkQueriesActivePageToZero = function setNetworkQueriesActivePageToZero(state, type) {
  if (type === _model.NetworkType.page) {
    return setNetworkPageQueriesActivePageToZero(state);
  } else if (type === _model.NetworkType.details) {
    return setNetworkDetailsQueriesActivePageToZero(state);
  }

  throw new Error("NetworkType ".concat(type, " is unknown"));
};

exports.setNetworkQueriesActivePageToZero = setNetworkQueriesActivePageToZero;