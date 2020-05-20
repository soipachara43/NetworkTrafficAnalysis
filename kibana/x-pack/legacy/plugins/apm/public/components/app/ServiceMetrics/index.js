"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceMetrics = ServiceMetrics;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _useServiceMetricCharts = require("../../../hooks/useServiceMetricCharts");

var _MetricsChart = require("../../shared/charts/MetricsChart");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _ChartsSyncContext = require("../../../context/ChartsSyncContext");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ServiceMetrics(_ref) {
  var agentName = _ref.agentName;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var serviceName = urlParams.serviceName,
      serviceNodeName = urlParams.serviceNodeName;

  var _useServiceMetricChar = (0, _useServiceMetricCharts.useServiceMetricCharts)(urlParams, agentName),
      data = _useServiceMetricChar.data;

  var start = urlParams.start,
      end = urlParams.end;
  var localFiltersConfig = (0, _react.useMemo)(function () {
    return {
      filterNames: ['host', 'containerId', 'podName', 'serviceVersion'],
      params: {
        serviceName: serviceName,
        serviceNodeName: serviceNodeName
      },
      projection: _typings.PROJECTION.METRICS,
      showCount: false
    };
  }, [serviceName, serviceNodeName]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, localFiltersConfig)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_ChartsSyncContext.ChartsSyncContextProvider, null, _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 2,
    gutterSize: "s"
  }, data.charts.map(function (chart) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: chart.key
    }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_MetricsChart.MetricsChart, {
      start: start,
      end: end,
      chart: chart
    })));
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  })))));
}