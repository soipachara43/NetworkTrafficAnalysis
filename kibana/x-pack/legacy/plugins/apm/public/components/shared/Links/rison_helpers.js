"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimepickerRisonData = getTimepickerRisonData;

var _constants = require("../../../context/UrlParamsContext/constants");

var _url_helpers = require("./url_helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getTimepickerRisonData(currentSearch) {
  var currentQuery = (0, _url_helpers.toQuery)(currentSearch);

  var nextQuery = _objectSpread({}, _constants.TIMEPICKER_DEFAULTS, {}, currentQuery);

  return {
    time: {
      from: encodeURIComponent(nextQuery.rangeFrom),
      to: encodeURIComponent(nextQuery.rangeTo)
    },
    refreshInterval: {
      pause: String(nextQuery.refreshPaused),
      value: String(nextQuery.refreshInterval)
    }
  };
}