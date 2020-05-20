"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertMonitorStatus = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _selectors = require("../../../state/selectors");

var _alert_monitor_status = require("../../functional/alerts/alert_monitor_status");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AlertMonitorStatus = function AlertMonitorStatus(_ref) {
  var autocomplete = _ref.autocomplete,
      enabled = _ref.enabled,
      numTimes = _ref.numTimes,
      setAlertParams = _ref.setAlertParams,
      timerange = _ref.timerange;

  var _useSelector = (0, _reactRedux.useSelector)(_selectors.selectMonitorStatusAlert),
      filters = _useSelector.filters,
      locations = _useSelector.locations;

  return _react.default.createElement(_alert_monitor_status.AlertMonitorStatusComponent, {
    autocomplete: autocomplete,
    enabled: enabled,
    filters: filters,
    locations: locations,
    numTimes: numTimes,
    setAlertParams: setAlertParams,
    timerange: timerange
  });
};

exports.AlertMonitorStatus = AlertMonitorStatus;