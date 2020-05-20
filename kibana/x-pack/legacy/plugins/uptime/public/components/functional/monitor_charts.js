"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorCharts = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _connected = require("../connected");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitorCharts = function MonitorCharts(_ref) {
  var monitorId = _ref.monitorId;
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_connected.DurationChart, {
    monitorId: monitorId
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_connected.PingHistogram, {
    height: "400px",
    isResponsive: false,
    monitorId: monitorId
  })));
};

exports.MonitorCharts = MonitorCharts;