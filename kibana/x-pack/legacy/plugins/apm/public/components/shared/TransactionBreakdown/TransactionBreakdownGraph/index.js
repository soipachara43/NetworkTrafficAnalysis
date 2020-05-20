"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionBreakdownGraph = void 0;

var _react = _interopRequireWildcard(require("react"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _lodash = require("lodash");

var _i18n = require("../../../../../../../../plugins/apm/common/i18n");

var _TransactionLineChart = require("../../charts/TransactionCharts/TransactionLineChart");

var _formatters = require("../../../../utils/formatters");

var _variables = require("../../../../style/variables");

var _isValidCoordinateValue = require("../../../../utils/isValidCoordinateValue");

var _public = require("../../../../../../../../plugins/observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var tickFormatY = function tickFormatY(y) {
  return (0, _numeral.default)(y || 0).format('0 %');
};

var formatTooltipValue = function formatTooltipValue(coordinate) {
  return (0, _isValidCoordinateValue.isValidCoordinateValue)(coordinate.y) ? (0, _formatters.asPercent)(coordinate.y, 1) : _i18n.NOT_AVAILABLE_LABEL;
};

var TransactionBreakdownGraph = function TransactionBreakdownGraph(props) {
  var timeseries = props.timeseries;
  var trackApmEvent = (0, _public.useUiTracker)({
    app: 'apm'
  });
  var handleHover = (0, _react.useMemo)(function () {
    return (0, _lodash.throttle)(function () {
      return trackApmEvent({
        metric: 'hover_breakdown_chart'
      });
    }, 60000);
  }, [trackApmEvent]);
  return _react.default.createElement(_TransactionLineChart.TransactionLineChart, {
    series: timeseries,
    tickFormatY: tickFormatY,
    formatTooltipValue: formatTooltipValue,
    yMax: 1,
    height: _variables.unit * 12,
    stacked: true,
    onHover: handleHover
  });
};

exports.TransactionBreakdownGraph = TransactionBreakdownGraph;