"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeTimeRange = void 0;

var _maybe_date = require("../formatted_date/maybe_date");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var normalizeTimeRange = function normalizeTimeRange(dateRange) {
  var maybeTo = (0, _maybe_date.getMaybeDate)(dateRange.to);
  var maybeFrom = (0, _maybe_date.getMaybeDate)(dateRange.from);
  var to = maybeTo.isValid() ? maybeTo.valueOf() : Number(dateRange.to);
  var from = maybeFrom.isValid() ? maybeFrom.valueOf() : Number(dateRange.from);
  return _objectSpread({}, dateRange, {
    to: to,
    from: from
  });
};

exports.normalizeTimeRange = normalizeTimeRange;