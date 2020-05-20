"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsChart = MetricsChart;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _CustomPlot = _interopRequireDefault(require("../CustomPlot"));

var _formatters = require("../../../../utils/formatters");

var _isValidCoordinateValue = require("../../../../utils/isValidCoordinateValue");

var _useChartsSync = require("../../../../hooks/useChartsSync");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MetricsChart(_ref) {
  var chart = _ref.chart;
  var formatYValue = getYTickFormatter(chart);
  var formatTooltip = getTooltipFormatter(chart);
  var transformedSeries = chart.series.map(function (series) {
    return _objectSpread({}, series, {
      legendValue: formatYValue(series.overallValue)
    });
  });
  var syncedChartProps = (0, _useChartsSync.useChartsSync)();
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, chart.title)), _react.default.createElement(_CustomPlot.default, _extends({}, syncedChartProps, {
    series: transformedSeries,
    tickFormatY: formatYValue,
    formatTooltipValue: formatTooltip,
    yMax: chart.yUnit === 'percent' ? 1 : 'max'
  })));
}

function getYTickFormatter(chart) {
  switch (chart.yUnit) {
    case 'bytes':
      {
        var max = Math.max.apply(Math, _toConsumableArray(chart.series.flatMap(function (series) {
          return series.data.map(function (coord) {
            return coord.y || 0;
          });
        })));
        return (0, _formatters.getFixedByteFormatter)(max);
      }

    case 'percent':
      {
        return function (y) {
          return (0, _formatters.asPercent)(y || 0, 1);
        };
      }

    case 'time':
      {
        return function (y) {
          return (0, _formatters.asDuration)(y);
        };
      }

    case 'integer':
      {
        return function (y) {
          return (0, _isValidCoordinateValue.isValidCoordinateValue)(y) ? (0, _formatters.asInteger)(y) : y;
        };
      }

    default:
      {
        return function (y) {
          return (0, _isValidCoordinateValue.isValidCoordinateValue)(y) ? (0, _formatters.asDecimal)(y) : y;
        };
      }
  }
}

function getTooltipFormatter(_ref2) {
  var yUnit = _ref2.yUnit;

  switch (yUnit) {
    case 'bytes':
      {
        return function (c) {
          return (0, _formatters.asDynamicBytes)(c.y);
        };
      }

    case 'percent':
      {
        return function (c) {
          return (0, _formatters.asPercent)(c.y || 0, 1);
        };
      }

    case 'time':
      {
        return function (c) {
          return (0, _formatters.asDuration)(c.y);
        };
      }

    case 'integer':
      {
        return function (c) {
          return (0, _isValidCoordinateValue.isValidCoordinateValue)(c.y) ? (0, _formatters.asInteger)(c.y) : c.y;
        };
      }

    default:
      {
        return function (c) {
          return (0, _isValidCoordinateValue.isValidCoordinateValue)(c.y) ? (0, _formatters.asDecimal)(c.y) : c.y;
        };
      }
  }
}