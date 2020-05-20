"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _ServiceMetricList = require("./ServiceMetricList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
(0, _react.storiesOf)('app/ServiceMap/Popover/ServiceMetricList', module).add('example', function () {
  return _react2.default.createElement(_ServiceMetricList.ServiceMetricList, {
    avgErrorsPerMinute: 15.738888706725826,
    avgTransactionDuration: 61634.38905590272,
    avgRequestsPerMinute: 164.47222031860858,
    avgCpuUsage: 0.32809666568309237,
    avgMemoryUsage: 0.5504868173242986,
    frameworkName: "Spring",
    numInstances: 2,
    isLoading: false
  });
}).add('loading', function () {
  return _react2.default.createElement(_ServiceMetricList.ServiceMetricList, {
    avgErrorsPerMinute: null,
    avgTransactionDuration: null,
    avgRequestsPerMinute: null,
    avgCpuUsage: null,
    avgMemoryUsage: null,
    numInstances: 1,
    isLoading: true
  });
}).add('some null values', function () {
  return _react2.default.createElement(_ServiceMetricList.ServiceMetricList, {
    avgErrorsPerMinute: 7.615972134074397,
    avgTransactionDuration: 238792.54809512055,
    avgRequestsPerMinute: 8.439583235652972,
    avgCpuUsage: null,
    avgMemoryUsage: null,
    numInstances: 1,
    isLoading: false
  });
}).add('all null values', function () {
  return _react2.default.createElement(_ServiceMetricList.ServiceMetricList, {
    avgErrorsPerMinute: null,
    avgTransactionDuration: null,
    avgRequestsPerMinute: null,
    avgCpuUsage: null,
    avgMemoryUsage: null,
    numInstances: 1,
    isLoading: false
  });
});