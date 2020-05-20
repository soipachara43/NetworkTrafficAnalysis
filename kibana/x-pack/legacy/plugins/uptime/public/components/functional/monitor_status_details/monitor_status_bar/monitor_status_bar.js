"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorStatusBarComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _monitor_ssl_certificate = require("./monitor_ssl_certificate");

var labels = _interopRequireWildcard(require("./translations"));

var _status_by_location = require("./status_by_location");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitorStatusBarComponent = function MonitorStatusBarComponent(_ref) {
  var _ref2, _monitorStatus$url, _ref3;

  var monitorId = _ref.monitorId,
      monitorStatus = _ref.monitorStatus,
      monitorLocations = _ref.monitorLocations;
  var full = (_ref2 = monitorStatus === null || monitorStatus === void 0 ? void 0 : (_monitorStatus$url = monitorStatus.url) === null || _monitorStatus$url === void 0 ? void 0 : _monitorStatus$url.full) !== null && _ref2 !== void 0 ? _ref2 : '';
  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    gutterSize: "none",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_status_by_location.StatusByLocations, {
    locations: (_ref3 = monitorLocations === null || monitorLocations === void 0 ? void 0 : monitorLocations.locations) !== null && _ref3 !== void 0 ? _ref3 : []
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiLink, {
    "aria-label": labels.monitorUrlLinkAriaLabel,
    href: full,
    target: "_blank"
  }, full))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiTextColor, {
    color: "subdued"
  }, _react.default.createElement("h1", {
    "data-test-subj": "monitor-page-title"
  }, monitorId)))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_monitor_ssl_certificate.MonitorSSLCertificate, {
    tls: monitorStatus === null || monitorStatus === void 0 ? void 0 : monitorStatus.tls
  })));
};

exports.MonitorStatusBarComponent = MonitorStatusBarComponent;