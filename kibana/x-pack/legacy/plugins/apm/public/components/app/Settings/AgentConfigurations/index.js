"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentConfigurations = AgentConfigurations;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _useFetcher2 = require("../../../../hooks/useFetcher");

var _List = require("./List");

var _public = require("../../../../../../../../plugins/observability/public");

var _agentConfigurationLinks = require("../../../shared/Links/apm/agentConfigurationLinks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function AgentConfigurations() {
  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    return callApmApi({
      pathname: '/api/apm/settings/agent-configuration'
    });
  }, [], {
    preservePreviousData: false
  }),
      refetch = _useFetcher.refetch,
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? [] : _useFetcher$data,
      status = _useFetcher.status;

  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'agent_configuration'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'agent_configuration',
    delay: 15000
  });
  var hasConfigurations = !(0, _lodash.isEmpty)(data);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.agentConfig.configurationsPanelTitle', {
    defaultMessage: 'Agent remote configuration'
  })))), hasConfigurations ? _react.default.createElement(CreateConfigurationButton, null) : null), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_List.AgentConfigurationList, {
    status: status,
    data: data,
    refetch: refetch
  })));
}

function CreateConfigurationButton() {
  var href = (0, _agentConfigurationLinks.createAgentConfigurationHref)();
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    fill: true,
    iconType: "plusInCircle",
    href: href
  }, _i18n.i18n.translate('xpack.apm.agentConfig.createConfigButtonLabel', {
    defaultMessage: 'Create configuration'
  })))));
}