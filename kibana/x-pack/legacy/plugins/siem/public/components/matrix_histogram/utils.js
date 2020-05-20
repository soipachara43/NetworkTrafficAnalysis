"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomChartData = exports.formatToChartDataItem = exports.getBarchartConfigs = exports.DEFAULT_Y_TICK_FORMATTER = exports.DEFAULT_CHART_HEIGHT = void 0;

var _charts = require("@elastic/charts");

var _fp = require("lodash/fp");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_CHART_HEIGHT = 174;
exports.DEFAULT_CHART_HEIGHT = DEFAULT_CHART_HEIGHT;

var DEFAULT_Y_TICK_FORMATTER = function DEFAULT_Y_TICK_FORMATTER(value) {
  return value.toLocaleString();
};

exports.DEFAULT_Y_TICK_FORMATTER = DEFAULT_Y_TICK_FORMATTER;

var getBarchartConfigs = function getBarchartConfigs(_ref) {
  var chartHeight = _ref.chartHeight,
      from = _ref.from,
      legendPosition = _ref.legendPosition,
      to = _ref.to,
      onBrushEnd = _ref.onBrushEnd,
      yTickFormatter = _ref.yTickFormatter,
      showLegend = _ref.showLegend;
  return {
    series: {
      xScaleType: _charts.ScaleType.Time,
      yScaleType: _charts.ScaleType.Linear,
      stackAccessors: ['g']
    },
    axis: {
      xTickFormatter: (0, _utils.histogramDateTimeFormatter)([from, to]),
      yTickFormatter: yTickFormatter != null ? yTickFormatter : DEFAULT_Y_TICK_FORMATTER,
      tickSize: 8
    },
    settings: {
      legendPosition: legendPosition !== null && legendPosition !== void 0 ? legendPosition : _charts.Position.Right,
      onBrushEnd: onBrushEnd,
      showLegend: showLegend !== null && showLegend !== void 0 ? showLegend : true,
      showLegendExtra: true,
      theme: {
        scales: {
          barsPadding: 0.08
        },
        chartMargins: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        chartPaddings: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    },
    customHeight: chartHeight !== null && chartHeight !== void 0 ? chartHeight : DEFAULT_CHART_HEIGHT
  };
};

exports.getBarchartConfigs = getBarchartConfigs;

var formatToChartDataItem = function formatToChartDataItem(_ref2) {
  var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];

  return {
    key: key,
    value: value
  };
};

exports.formatToChartDataItem = formatToChartDataItem;

var getCustomChartData = function getCustomChartData(data, mapping) {
  if (!data) return [];
  var dataGroupedByEvent = (0, _fp.groupBy)('g', data);
  var dataGroupedEntries = (0, _fp.toPairs)(dataGroupedByEvent);
  var formattedChartData = (0, _fp.map)(formatToChartDataItem, dataGroupedEntries);
  if (mapping) return (0, _fp.map)(function (item) {
    var mapItem = (0, _fp.get)(item.key, mapping);
    return _objectSpread({}, item, {
      color: mapItem === null || mapItem === void 0 ? void 0 : mapItem.color
    });
  }, formattedChartData);else return formattedChartData;
};

exports.getCustomChartData = getCustomChartData;