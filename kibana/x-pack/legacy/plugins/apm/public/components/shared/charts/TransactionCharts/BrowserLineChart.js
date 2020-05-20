"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowserLineChart = BrowserLineChart;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _TransactionLineChart = require("./TransactionLineChart");

var _ = require(".");

var _formatters = require("../../../../utils/formatters");

var _useAvgDurationByBrowser = require("../../../../hooks/useAvgDurationByBrowser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function BrowserLineChart() {
  var _useAvgDurationByBrow = (0, _useAvgDurationByBrowser.useAvgDurationByBrowser)(),
      data = _useAvgDurationByBrow.data;

  var maxY = (0, _.getMaxY)(data);
  var formatter = (0, _formatters.getDurationFormatter)(maxY);
  var formatTooltipValue = (0, _.getResponseTimeTooltipFormatter)(formatter);
  var tickFormatY = (0, _.getResponseTimeTickFormatter)(formatter);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.apm.metrics.pageLoadCharts.avgPageLoadByBrowser', {
    defaultMessage: 'Avg. page load duration distribution by browser'
  }))), _react.default.createElement(_TransactionLineChart.TransactionLineChart, {
    formatTooltipValue: formatTooltipValue,
    series: data,
    tickFormatY: tickFormatY
  }));
}