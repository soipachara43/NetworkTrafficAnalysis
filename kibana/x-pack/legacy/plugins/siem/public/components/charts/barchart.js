"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChart = exports.BarChartComponent = exports.BarChartBase = exports.BarChartBaseComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _fp = require("lodash/fp");

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _utils = require("../utils");

var _kibana = require("../../lib/kibana");

var _chart_place_holder = require("./chart_place_holder");

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var checkIfAllTheDataInTheSeriesAreValid = function checkIfAllTheDataInTheSeriesAreValid(series) {
  return series != null && !!(0, _fp.get)('value.length', series) && (series.value || []).every(function (_ref) {
    var x = _ref.x,
        y = _ref.y;
    return (0, _fp.isNumber)(y) && y >= 0;
  });
};

var checkIfAnyValidSeriesExist = function checkIfAnyValidSeriesExist(data) {
  return Array.isArray(data) && !(0, _common.checkIfAllValuesAreZero)(data) && data.some(checkIfAllTheDataInTheSeriesAreValid);
}; // Bar chart rotation: https://ela.st/chart-rotations


var BarChartBaseComponent = function BarChartBaseComponent(_ref2) {
  var data = _ref2.data,
      chartConfigs = _objectWithoutProperties(_ref2, ["data"]);

  var theme = (0, _common.useTheme)();
  var timeZone = (0, _kibana.useTimeZone)();
  var xTickFormatter = (0, _fp.get)('configs.axis.xTickFormatter', chartConfigs);
  var yTickFormatter = (0, _fp.get)('configs.axis.yTickFormatter', chartConfigs);
  var tickSize = (0, _fp.getOr)(0, 'configs.axis.tickSize', chartConfigs);
  var xAxisId = "stat-items-barchart-".concat(data[0].key, "-x");
  var yAxisId = "stat-items-barchart-".concat(data[0].key, "-y");

  var settings = _objectSpread({}, _common.chartDefaultSettings, {}, (0, _deepmerge.default)((0, _fp.get)('configs.settings', chartConfigs), {
    theme: theme
  }));

  return chartConfigs.width && chartConfigs.height ? _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, settings), data.map(function (series) {
    var barSeriesKey = series.key;
    return checkIfAllTheDataInTheSeriesAreValid ? _react.default.createElement(_charts.BarSeries, {
      id: barSeriesKey,
      key: barSeriesKey,
      name: series.key,
      xScaleType: (0, _fp.getOr)(_charts.ScaleType.Linear, 'configs.series.xScaleType', chartConfigs),
      yScaleType: (0, _fp.getOr)(_charts.ScaleType.Linear, 'configs.series.yScaleType', chartConfigs),
      xAccessor: "x",
      yAccessors: ['y'],
      timeZone: timeZone,
      splitSeriesAccessors: ['g'],
      data: series.value,
      stackAccessors: (0, _fp.get)('configs.series.stackAccessors', chartConfigs),
      color: series.color ? series.color : undefined
    }) : null;
  }), _react.default.createElement(_charts.Axis, {
    id: xAxisId,
    position: _charts.Position.Bottom,
    showOverlappingTicks: false,
    tickSize: tickSize,
    tickFormat: xTickFormatter
  }), _react.default.createElement(_charts.Axis, {
    id: yAxisId,
    position: _charts.Position.Left,
    tickSize: tickSize,
    tickFormat: yTickFormatter
  })) : null;
};

exports.BarChartBaseComponent = BarChartBaseComponent;
BarChartBaseComponent.displayName = 'BarChartBaseComponent';

var BarChartBase = _react.default.memo(BarChartBaseComponent);

exports.BarChartBase = BarChartBase;
BarChartBase.displayName = 'BarChartBase';

var BarChartComponent = function BarChartComponent(_ref3) {
  var barChart = _ref3.barChart,
      configs = _ref3.configs;

  var _useThrottledResizeOb = (0, _utils.useThrottledResizeObserver)(),
      measureRef = _useThrottledResizeOb.ref,
      width = _useThrottledResizeOb.width,
      height = _useThrottledResizeOb.height;

  var customHeight = (0, _fp.get)('customHeight', configs);
  var customWidth = (0, _fp.get)('customWidth', configs);
  var chartHeight = (0, _common.getChartHeight)(customHeight, height);
  var chartWidth = (0, _common.getChartWidth)(customWidth, width);
  return checkIfAnyValidSeriesExist(barChart) ? _react.default.createElement(_common.WrappedByAutoSizer, {
    ref: measureRef,
    height: chartHeight
  }, _react.default.createElement(BarChartBase, {
    height: chartHeight,
    width: chartHeight,
    data: barChart,
    configs: configs
  })) : _react.default.createElement(_chart_place_holder.ChartPlaceHolder, {
    height: chartHeight,
    width: chartWidth,
    data: barChart
  });
};

exports.BarChartComponent = BarChartComponent;

var BarChart = _react.default.memo(BarChartComponent);

exports.BarChart = BarChart;