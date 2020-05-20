"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorListDrawerComponent = MonitorListDrawerComponent;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _most_recent_error = require("./most_recent_error");

var _monitor_status_list = require("./monitor_status_list");

var _connected = require("../../../connected");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ContainerDiv = _styledComponents.default.div.withConfig({
  displayName: "ContainerDiv",
  componentId: "xuzay2-0"
})(["padding:10px;width:100%;"]);

/**
 * The elements shown when the user expands the monitor list rows.
 */
function MonitorListDrawerComponent(_ref) {
  var _summary$state, _summary$state$url;

  var summary = _ref.summary,
      monitorDetails = _ref.monitorDetails;
  var monitorUrl = (summary === null || summary === void 0 ? void 0 : (_summary$state = summary.state) === null || _summary$state === void 0 ? void 0 : (_summary$state$url = _summary$state.url) === null || _summary$state$url === void 0 ? void 0 : _summary$state$url.full) || '';
  return summary && summary.state.checks ? _react.default.createElement(ContainerDiv, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiLink, {
    href: monitorUrl,
    target: "_blank"
  }, monitorUrl, _react.default.createElement(_eui.EuiIcon, {
    size: "s",
    type: "popout",
    color: "subbdued"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_connected.MonitorListActionsPopover, {
    summary: summary
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_monitor_status_list.MonitorStatusList, {
    checks: summary.state.checks
  }), monitorDetails && monitorDetails.error && _react.default.createElement(_most_recent_error.MostRecentError, {
    error: monitorDetails.error,
    monitorId: summary.monitor_id,
    timestamp: monitorDetails.timestamp
  })) : null;
}