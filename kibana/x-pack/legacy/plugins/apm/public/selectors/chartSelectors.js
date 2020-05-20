"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionCharts = getTransactionCharts;
exports.getResponseTimeSeries = getResponseTimeSeries;
exports.getAnomalyScoreSeries = getAnomalyScoreSeries;
exports.getTpmSeries = getTpmSeries;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(require("lodash.mean"));

var _polished = require("polished");

var _formatters = require("../utils/formatters");

var _getEmptySeries = require("../components/shared/charts/CustomPlot/getEmptySeries");

var _httpStatusCodeToColor = require("../utils/httpStatusCodeToColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INITIAL_DATA = {
  apmTimeseries: {
    responseTimes: {
      avg: [],
      p95: [],
      p99: []
    },
    tpmBuckets: [],
    overallAvgDuration: null
  },
  anomalyTimeseries: undefined
};

function getTransactionCharts(_ref) {
  var transactionType = _ref.transactionType;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INITIAL_DATA,
      apmTimeseries = _ref2.apmTimeseries,
      anomalyTimeseries = _ref2.anomalyTimeseries;

  var tpmSeries = getTpmSeries(apmTimeseries, transactionType);
  var responseTimeSeries = getResponseTimeSeries({
    apmTimeseries: apmTimeseries,
    anomalyTimeseries: anomalyTimeseries
  });
  return {
    tpmSeries: tpmSeries,
    responseTimeSeries: responseTimeSeries
  };
}

function getResponseTimeSeries(_ref3) {
  var apmTimeseries = _ref3.apmTimeseries,
      anomalyTimeseries = _ref3.anomalyTimeseries;
  var overallAvgDuration = apmTimeseries.overallAvgDuration;
  var _apmTimeseries$respon = apmTimeseries.responseTimes,
      avg = _apmTimeseries$respon.avg,
      p95 = _apmTimeseries$respon.p95,
      p99 = _apmTimeseries$respon.p99;
  var formattedDuration = (0, _formatters.convertTo)({
    unit: 'milliseconds',
    microseconds: overallAvgDuration
  }).formatted;
  var series = [{
    title: _i18n.i18n.translate('xpack.apm.transactions.chart.averageLabel', {
      defaultMessage: 'Avg.'
    }),
    data: avg,
    legendValue: formattedDuration,
    type: 'linemark',
    color: _eui_theme_light.default.euiColorVis1
  }, {
    title: _i18n.i18n.translate('xpack.apm.transactions.chart.95thPercentileLabel', {
      defaultMessage: '95th percentile'
    }),
    titleShort: '95th',
    data: p95,
    type: 'linemark',
    color: _eui_theme_light.default.euiColorVis5
  }, {
    title: _i18n.i18n.translate('xpack.apm.transactions.chart.99thPercentileLabel', {
      defaultMessage: '99th percentile'
    }),
    titleShort: '99th',
    data: p99,
    type: 'linemark',
    color: _eui_theme_light.default.euiColorVis7
  }];

  if (anomalyTimeseries) {
    // insert after Avg. series
    series.splice(1, 0, getAnomalyBoundariesSeries(anomalyTimeseries.anomalyBoundaries), getAnomalyScoreSeries(anomalyTimeseries.anomalyScore));
  }

  return series;
}

function getAnomalyScoreSeries(data) {
  return {
    title: _i18n.i18n.translate('xpack.apm.transactions.chart.anomalyScoreLabel', {
      defaultMessage: 'Anomaly score'
    }),
    hideLegend: true,
    hideTooltipValue: true,
    data: data,
    type: 'areaMaxHeight',
    color: 'none',
    areaColor: (0, _polished.rgba)(_eui_theme_light.default.euiColorVis9, 0.1)
  };
}

function getAnomalyBoundariesSeries(data) {
  return {
    title: _i18n.i18n.translate('xpack.apm.transactions.chart.anomalyBoundariesLabel', {
      defaultMessage: 'Anomaly Boundaries'
    }),
    hideLegend: true,
    hideTooltipValue: true,
    data: data,
    type: 'area',
    color: 'none',
    areaColor: (0, _polished.rgba)(_eui_theme_light.default.euiColorVis1, 0.1)
  };
}

function getTpmSeries(apmTimeseries, transactionType) {
  var tpmBuckets = apmTimeseries.tpmBuckets;
  var bucketKeys = tpmBuckets.map(function (_ref4) {
    var key = _ref4.key;
    return key;
  });
  var getColor = getColorByKey(bucketKeys);
  var avg = apmTimeseries.responseTimes.avg;

  if (!tpmBuckets.length && avg.length) {
    var start = avg[0].x;
    var end = avg[avg.length - 1].x;
    return (0, _getEmptySeries.getEmptySeries)(start, end);
  }

  return tpmBuckets.map(function (bucket) {
    var average = (0, _lodash2.default)(bucket.dataPoints.map(function (p) {
      return p.y;
    }));
    return {
      title: bucket.key,
      data: bucket.dataPoints,
      legendValue: "".concat((0, _formatters.asDecimal)(average), " ").concat((0, _formatters.tpmUnit)(transactionType || '')),
      type: 'linemark',
      color: getColor(bucket.key)
    };
  });
}

function colorMatch(key) {
  if (/ok|success/i.test(key)) {
    return _eui_theme_light.default.euiColorSecondary;
  } else if (/error|fail/i.test(key)) {
    return _eui_theme_light.default.euiColorDanger;
  }
}

function getColorByKey(keys) {
  var assignedColors = ['HTTP 2xx', 'HTTP 3xx', 'HTTP 4xx', 'HTTP 5xx'];
  var unknownKeys = (0, _lodash.difference)(keys, assignedColors);
  var unassignedColors = (0, _lodash.zipObject)(unknownKeys, [_eui_theme_light.default.euiColorVis1, _eui_theme_light.default.euiColorVis3, _eui_theme_light.default.euiColorVis4, _eui_theme_light.default.euiColorVis6, _eui_theme_light.default.euiColorVis2, _eui_theme_light.default.euiColorVis8]);
  return function (key) {
    return colorMatch(key) || (0, _httpStatusCodeToColor.httpStatusCodeToColor)(key) || unassignedColors[key];
  };
}