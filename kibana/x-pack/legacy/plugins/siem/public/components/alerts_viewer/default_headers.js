"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertsDefaultModel = exports.alertsHeaders = void 0;

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _constants = require("../timeline/body/constants");

var _defaults = require("../../store/timeline/defaults");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alertsHeaders = [{
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: '@timestamp',
  width: _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.module',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH,
  linkField: 'rule.reference'
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.dataset',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.category',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.severity',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'observer.name',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'host.name',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'message',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'agent.id',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'agent.type',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}];
exports.alertsHeaders = alertsHeaders;

var alertsDefaultModel = _objectSpread({}, _defaults.timelineDefaults, {
  columns: alertsHeaders,
  showRowRenderers: false
});

exports.alertsDefaultModel = alertsDefaultModel;