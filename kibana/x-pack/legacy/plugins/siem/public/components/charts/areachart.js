"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaChart = exports.AreaChartComponent = exports.AreaChartBase = exports.AreaChartBaseComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _fp = require("lodash/fp");

var _utils = require("../utils");

var _chart_place_holder = require("./chart_place_holder");

var _kibana = require("../../lib/kibana");

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// custom series styles: https://ela.st/areachart-styling
var getSeriesLineStyle = function getSeriesLineStyle() {
  return {
    area: {
      opacity: 0.04,
      visible: true
    },
    line: {
      strokeWidth: 1,
      visible: true
    },
    point: {
      visible: false,
      radius: 0.2,
      strokeWidth: 1,
      opacity: 1
    }
  };
};

var checkIfAllTheDataInTheSeriesAreValid = function checkIfAllTheDataInTheSeriesAreValid(series) {
  return !!(0, _fp.get)('value.length', series) && (0, _fp.get)('value', series).every(function (_ref) {
    var x = _ref.x,
        y = _ref.y;
    return !(0, _fp.isNull)(x) && (0, _fp.isNumber)(y) && y > 0;
  });
};

var checkIfAnyValidSeriesExist = function checkIfAnyValidSeriesExist(data) {
  return Array.isArray(data) && data.some(checkIfAllTheDataInTheSeriesAreValid);
}; // https://ela.st/multi-areaseries


var AreaChartBaseComponent = function AreaChartBaseComponent(_ref2) {
  var data = _ref2.data,
      chartConfigs = _objectWithoutProperties(_ref2, ["data"]);

  var theme = (0, _common.useTheme)();
  var timeZone = (0, _kibana.useTimeZone)();
  var xTickFormatter = (0, _fp.get)('configs.axis.xTickFormatter', chartConfigs);
  var yTickFormatter = (0, _fp.get)('configs.axis.yTickFormatter', chartConfigs);
  var xAxisId = "group-".concat(data[0].key, "-x");
  var yAxisId = "group-".concat(data[0].key, "-y");

  var settings = _objectSpread({}, _common.chartDefaultSettings, {
    theme: theme
  }, (0, _fp.get)('configs.settings', chartConfigs));

  return chartConfigs.width && chartConfigs.height ? _react.default.createElement("div", {
    style: {
      height: chartConfigs.height,
      width: chartConfigs.width,
      position: 'relative'
    }
  }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, settings), data.map(function (series) {
    var seriesKey = series.key;
    return checkIfAllTheDataInTheSeriesAreValid(series) ? _react.default.createElement(_charts.AreaSeries, {
      id: seriesKey,
      key: seriesKey,
      name: series.key.replace('Histogram', ''),
      data: series.value || [],
      xScaleType: (0, _fp.getOr)(_charts.ScaleType.Linear, 'configs.series.xScaleType', chartConfigs),
      yScaleType: (0, _fp.getOr)(_charts.ScaleType.Linear, 'configs.series.yScaleType', chartConfigs),
      timeZone: timeZone,
      xAccessor: "x",
      yAccessors: ['y'],
      areaSeriesStyle: getSeriesLineStyle(),
      color: series.color ? series.color : undefined
    }) : null;
  }), _react.default.createElement(_charts.Axis, {
    id: xAxisId,
    position: _charts.Position.Bottom,
    showOverlappingTicks: false,
    tickFormat: xTickFormatter,
    tickSize: 0
  }), _react.default.createElement(_charts.Axis, {
    id: yAxisId,
    position: _charts.Position.Left,
    tickSize: 0,
    tickFormat: yTickFormatter
  }))) : null;
};

exports.AreaChartBaseComponent = AreaChartBaseComponent;
AreaChartBaseComponent.displayName = 'AreaChartBaseComponent';

var AreaChartBase = _react.default.memo(AreaChartBaseComponent);

exports.AreaChartBase = AreaChartBase;
AreaChartBase.displayName = 'AreaChartBase';

var AreaChartComponent = function AreaChartComponent(_ref3) {
  var areaChart = _ref3.areaChart,
      configs = _ref3.configs;

  var _useThrottledResizeOb = (0, _utils.useThrottledResizeObserver)(),
      measureRef = _useThrottledResizeOb.ref,
      width = _useThrottledResizeOb.width,
      height = _useThrottledResizeOb.height;

  var customHeight = (0, _fp.get)('customHeight', configs);
  var customWidth = (0, _fp.get)('customWidth', configs);
  var chartHeight = (0, _common.getChartHeight)(customHeight, height);
  var chartWidth = (0, _common.getChartWidth)(customWidth, width);
  return checkIfAnyValidSeriesExist(areaChart) ? _react.default.createElement(_common.WrappedByAutoSizer, {
    ref: measureRef,
    height: chartHeight
  }, _react.default.createElement(AreaChartBase, {
    data: areaChart,
    height: chartHeight,
    width: chartWidth,
    configs: configs
  })) : _react.default.createElement(_chart_place_holder.ChartPlaceHolder, {
    height: chartHeight,
    width: chartWidth,
    data: areaChart
  });
};

exports.AreaChartComponent = AreaChartComponent;

var AreaChart = _react.default.memo(AreaChartComponent);

exports.AreaChart = AreaChart;