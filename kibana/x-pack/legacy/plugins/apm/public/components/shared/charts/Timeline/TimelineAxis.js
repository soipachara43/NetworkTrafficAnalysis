"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineAxis = TimelineAxis;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactSticky = require("react-sticky");

var _reactVis = require("react-vis");

var _variables = require("../../../../style/variables");

var _formatters = require("../../../../utils/formatters");

var _LastTickValue = require("./LastTickValue");

var _Marker = require("./Marker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Remove any tick that is too close to topTraceDuration
var getXAxisTickValues = function getXAxisTickValues(tickValues, topTraceDuration) {
  if (topTraceDuration == null) {
    return tickValues;
  }

  var padding = (tickValues[1] - tickValues[0]) / 2;
  var lowerBound = topTraceDuration - padding;
  var upperBound = topTraceDuration + padding;
  return tickValues.filter(function (value) {
    var isInRange = (0, _lodash.inRange)(value, lowerBound, upperBound);
    return !isInRange && value !== topTraceDuration;
  });
};

function TimelineAxis(_ref) {
  var plotValues = _ref.plotValues,
      _ref$marks = _ref.marks,
      marks = _ref$marks === void 0 ? [] : _ref$marks,
      topTraceDuration = _ref.topTraceDuration;
  var margins = plotValues.margins,
      tickValues = plotValues.tickValues,
      width = plotValues.width,
      xDomain = plotValues.xDomain,
      xMax = plotValues.xMax,
      xScale = plotValues.xScale;
  var tickFormatter = (0, _formatters.getDurationFormatter)(xMax);
  var xAxisTickValues = getXAxisTickValues(tickValues, topTraceDuration);
  var topTraceDurationFormatted = tickFormatter(topTraceDuration).formatted;
  return _react.default.createElement(_reactSticky.Sticky, {
    disableCompensation: true
  }, function (_ref2) {
    var style = _ref2.style;
    return _react.default.createElement("div", {
      style: _objectSpread({
        position: 'absolute',
        borderBottom: "1px solid ".concat(_eui_theme_light.default.euiColorMediumShade),
        height: (0, _variables.px)(margins.top),
        zIndex: 2,
        width: '100%'
      }, style)
    }, _react.default.createElement(_reactVis.XYPlot, {
      dontCheckIfEmpty: true,
      width: width,
      height: margins.top,
      margin: {
        top: margins.top,
        left: margins.left,
        right: margins.right
      },
      xDomain: xDomain
    }, _react.default.createElement(_reactVis.XAxis, {
      hideLine: true,
      orientation: "top",
      tickSize: 0,
      tickValues: xAxisTickValues,
      tickFormat: function tickFormat(time) {
        return tickFormatter(time).formatted;
      },
      tickPadding: 20,
      style: {
        text: {
          fill: _eui_theme_light.default.euiColorDarkShade
        }
      }
    }), topTraceDuration > 0 && _react.default.createElement(_LastTickValue.LastTickValue, {
      x: xScale(topTraceDuration),
      value: topTraceDurationFormatted,
      marginTop: 28
    }), marks.map(function (mark) {
      return _react.default.createElement(_Marker.Marker, {
        key: mark.id,
        mark: mark,
        x: xScale(mark.offset)
      });
    })));
  });
}