"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfAllValuesAreZero = exports.getChartWidth = exports.getChartHeight = exports.chartDefaultSettings = exports.useTheme = exports.SeriesType = exports.WrappedByAutoSizer = exports.defaultChartWidth = exports.defaultChartHeight = void 0;

var _charts = require("@elastic/charts");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _kibana = require("../../lib/kibana");

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var defaultChartHeight = '100%';
exports.defaultChartHeight = defaultChartHeight;
var defaultChartWidth = '100%';
exports.defaultChartWidth = defaultChartWidth;
var chartDefaultRotation = 0;
var chartDefaultRendering = 'canvas';

var WrappedByAutoSizerComponent = _styledComponents.default.div.withConfig({
  displayName: "WrappedByAutoSizerComponent",
  componentId: "sc-1ymm3r1-0"
})(["", " position:relative;&:hover{z-index:100;}"], function (style) {
  return "\n    height: ".concat(style.height != null ? style.height : defaultChartHeight, ";\n  ");
});

WrappedByAutoSizerComponent.displayName = 'WrappedByAutoSizer';

var WrappedByAutoSizer = _react.default.memo(WrappedByAutoSizerComponent);

exports.WrappedByAutoSizer = WrappedByAutoSizer;
var SeriesType; // Apply margins and paddings: https://ela.st/charts-spacing

exports.SeriesType = SeriesType;

(function (SeriesType) {
  SeriesType["BAR"] = "bar";
  SeriesType["AREA"] = "area";
  SeriesType["LINE"] = "line";
})(SeriesType || (exports.SeriesType = SeriesType = {}));

var theme = {
  chartMargins: {
    left: 0,
    right: 0,
    // Apply some paddings to the top to avoid chopping the y tick https://ela.st/chopping-edge
    top: 4,
    bottom: 0
  },
  chartPaddings: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  scales: {
    barsPadding: 0.05
  }
};

var useTheme = function useTheme() {
  var isDarkMode = (0, _kibana.useUiSetting)(_constants.DEFAULT_DARK_MODE);
  var defaultTheme = isDarkMode ? _charts.DARK_THEME : _charts.LIGHT_THEME;
  var themeValue = (0, _react.useMemo)(function () {
    return (0, _charts.mergeWithDefaultTheme)(theme, defaultTheme);
  }, []);
  return themeValue;
};

exports.useTheme = useTheme;
var chartDefaultSettings = {
  rotation: chartDefaultRotation,
  rendering: chartDefaultRendering,
  animatedData: false,
  showLegend: false,
  showLegendExtra: false,
  debug: false,
  legendPosition: _charts.Position.Bottom
};
exports.chartDefaultSettings = chartDefaultSettings;

var getChartHeight = function getChartHeight(customHeight, autoSizerHeight) {
  var height = customHeight || autoSizerHeight;
  return height ? "".concat(height, "px") : defaultChartHeight;
};

exports.getChartHeight = getChartHeight;

var getChartWidth = function getChartWidth(customWidth, autoSizerWidth) {
  var height = customWidth || autoSizerWidth;
  return height ? "".concat(height, "px") : defaultChartWidth;
};

exports.getChartWidth = getChartWidth;

var checkIfAllValuesAreZero = function checkIfAllValuesAreZero(data) {
  return Array.isArray(data) && data.every(function (series) {
    return Array.isArray(series.value) && series.value.every(function (_ref) {
      var y = _ref.y;
      return y === 0;
    });
  });
};

exports.checkIfAllValuesAreZero = checkIfAllValuesAreZero;