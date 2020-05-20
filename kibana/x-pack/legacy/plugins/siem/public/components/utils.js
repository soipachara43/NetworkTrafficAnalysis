"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThrottledResizeObserver = exports.histogramDateTimeFormatter = exports.getDaysDiff = void 0;

var _fp = require("lodash/fp");

var _react = require("react");

var _polyfilled = _interopRequireDefault(require("use-resize-observer/polyfilled"));

var _charts = require("@elastic/charts");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getDaysDiff = function getDaysDiff(minDate, maxDate) {
  var diff = maxDate.diff(minDate, 'days');

  if (diff <= 1 && !minDate.isSame(maxDate)) {
    return 2; // to return proper pattern from niceTimeFormatByDay
  }

  return diff;
};

exports.getDaysDiff = getDaysDiff;

var histogramDateTimeFormatter = function histogramDateTimeFormatter(domain, fixedDiff) {
  var diff = fixedDiff !== null && fixedDiff !== void 0 ? fixedDiff : getDaysDiff((0, _momentTimezone.default)(domain[0]), (0, _momentTimezone.default)(domain[1]));
  var format = (0, _charts.niceTimeFormatByDay)(diff);
  return (0, _charts.timeFormatter)(format);
};

exports.histogramDateTimeFormatter = histogramDateTimeFormatter;

var useThrottledResizeObserver = function useThrottledResizeObserver() {
  var wait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

  var _useState = (0, _react.useState)({
    width: 0,
    height: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  var onResize = (0, _react.useMemo)(function () {
    return (0, _fp.throttle)(wait, setSize);
  }, [wait]);

  var _useResizeObserver = (0, _polyfilled.default)({
    onResize: onResize
  }),
      ref = _useResizeObserver.ref;

  return _objectSpread({
    ref: ref
  }, size);
};

exports.useThrottledResizeObserver = useThrottledResizeObserver;