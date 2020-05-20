"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalsHistogram = void 0;

var _charts = require("@elastic/charts");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _common = require("../../../../components/charts/common");

var _utils = require("../../../../components/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_CHART_HEIGHT = 174;

var SignalsHistogram = _react.default.memo(function (_ref) {
  var _ref$chartHeight = _ref.chartHeight,
      chartHeight = _ref$chartHeight === void 0 ? DEFAULT_CHART_HEIGHT : _ref$chartHeight,
      data = _ref.data,
      from = _ref.from,
      _ref$legendPosition = _ref.legendPosition,
      legendPosition = _ref$legendPosition === void 0 ? 'right' : _ref$legendPosition,
      loading = _ref.loading,
      to = _ref.to,
      updateDateRange = _ref.updateDateRange;
  var theme = (0, _common.useTheme)();
  var chartSize = (0, _react.useMemo)(function () {
    return ['100%', chartHeight];
  }, [chartHeight]);
  var xAxisId = 'signalsHistogramAxisX';
  var yAxisId = 'signalsHistogramAxisY';
  var id = 'signalsHistogram';
  var yAccessors = (0, _react.useMemo)(function () {
    return ['y'];
  }, []);
  var splitSeriesAccessors = (0, _react.useMemo)(function () {
    return ['g'];
  }, []);
  var tickFormat = (0, _react.useMemo)(function () {
    return (0, _utils.histogramDateTimeFormatter)([from, to]);
  }, [from, to]);
  return _react.default.createElement(_react.default.Fragment, null, loading && _react.default.createElement(_eui.EuiProgress, {
    "data-test-subj": "loadingPanelSignalsHistogram",
    size: "xs",
    position: "absolute",
    color: "accent"
  }), _react.default.createElement(_charts.Chart, {
    size: chartSize
  }, _react.default.createElement(_charts.Settings, {
    legendPosition: legendPosition,
    onBrushEnd: updateDateRange,
    showLegend: true,
    showLegendExtra: true,
    theme: theme
  }), _react.default.createElement(_charts.Axis, {
    id: xAxisId,
    position: "bottom",
    tickFormat: tickFormat
  }), _react.default.createElement(_charts.Axis, {
    id: yAxisId,
    position: "left"
  }), _react.default.createElement(_charts.HistogramBarSeries, {
    id: id,
    xScaleType: "time",
    yScaleType: "linear",
    xAccessor: "x",
    yAccessors: yAccessors,
    splitSeriesAccessors: splitSeriesAccessors,
    data: data
  })));
});

exports.SignalsHistogram = SignalsHistogram;
SignalsHistogram.displayName = 'SignalsHistogram';