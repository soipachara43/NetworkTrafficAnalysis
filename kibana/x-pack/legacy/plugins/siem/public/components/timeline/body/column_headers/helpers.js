"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionsColumnWidth = exports.getColumnWidthFromType = exports.getColumnHeaders = void 0;

var _fp = require("lodash/fp");

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Enriches the column headers with field details from the specified browserFields */
var getColumnHeaders = function getColumnHeaders(headers, browserFields) {
  return headers.map(function (header) {
    var splitHeader = header.id.split('.'); // source.geo.city_name -> [source, geo, city_name]

    return _objectSpread({}, header, {}, (0, _fp.get)([splitHeader.length > 1 ? splitHeader[0] : 'base', 'fields', header.id], browserFields));
  });
};

exports.getColumnHeaders = getColumnHeaders;

var getColumnWidthFromType = function getColumnWidthFromType(type) {
  return type !== 'date' ? _constants.DEFAULT_COLUMN_MIN_WIDTH : _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH;
};
/** Returns the (fixed) width of the Actions column */


exports.getColumnWidthFromType = getColumnWidthFromType;

var getActionsColumnWidth = function getActionsColumnWidth(isEventViewer) {
  var showCheckboxes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var additionalActionWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return (showCheckboxes ? _constants.SHOW_CHECK_BOXES_COLUMN_WIDTH : 0) + (isEventViewer ? _constants.EVENTS_VIEWER_ACTIONS_COLUMN_WIDTH : _constants.DEFAULT_ACTIONS_COLUMN_WIDTH) + additionalActionWidth;
};

exports.getActionsColumnWidth = getActionsColumnWidth;