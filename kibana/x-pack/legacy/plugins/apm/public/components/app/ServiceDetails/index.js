"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceDetails = ServiceDetails;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _ApmHeader = require("../../shared/ApmHeader");

var _ServiceDetailTabs = require("./ServiceDetailTabs");

var _ServiceIntegrations = require("./ServiceIntegrations");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _AlertIntegrations = require("./AlertIntegrations");

var _useApmPluginContext = require("../../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ServiceDetails(_ref) {
  var tab = _ref.tab;
  var plugin = (0, _useApmPluginContext.useApmPluginContext)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var serviceName = urlParams.serviceName;
  var canReadAlerts = !!plugin.core.application.capabilities.apm['alerting:show'];
  var canSaveAlerts = !!plugin.core.application.capabilities.apm['alerting:save'];
  var isAlertingPluginEnabled = 'alerting' in plugin.plugins;
  var isAlertingAvailable = isAlertingPluginEnabled && (canReadAlerts || canSaveAlerts);
  return _react.default.createElement("div", null, _react.default.createElement(_ApmHeader.ApmHeader, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, serviceName))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_ServiceIntegrations.ServiceIntegrations, {
    urlParams: urlParams
  })), isAlertingAvailable && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_AlertIntegrations.AlertIntegrations, {
    canReadAlerts: canReadAlerts,
    canSaveAlerts: canSaveAlerts
  })))), _react.default.createElement(_ServiceDetailTabs.ServiceDetailTabs, {
    tab: tab
  }));
}