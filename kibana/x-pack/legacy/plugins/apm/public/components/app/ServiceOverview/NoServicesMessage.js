"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoServicesMessage = NoServicesMessage;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _KibanaLink = require("../../shared/Links/KibanaLink");

var _SetupInstructionsLink = require("../../shared/Links/SetupInstructionsLink");

var _LoadingStatePrompt = require("../../shared/LoadingStatePrompt");

var _ErrorStatePrompt = require("../../shared/ErrorStatePrompt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function NoServicesMessage(_ref) {
  var historicalDataFound = _ref.historicalDataFound,
      status = _ref.status;

  if (status === 'loading') {
    return _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null);
  }

  if (status === 'failure') {
    return _react.default.createElement(_ErrorStatePrompt.ErrorStatePrompt, null);
  }

  if (historicalDataFound) {
    return _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement("div", null, _i18n.i18n.translate('xpack.apm.servicesTable.notFoundLabel', {
        defaultMessage: 'No services found'
      })),
      titleSize: "s"
    });
  }

  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement("div", null, _i18n.i18n.translate('xpack.apm.servicesTable.noServicesLabel', {
      defaultMessage: "Looks like you don't have any APM services installed. Let's add some!"
    })),
    titleSize: "s",
    body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.servicesTable.7xUpgradeServerMessage', {
      defaultMessage: "Upgrading from a pre-7.x version? Make sure you've also upgraded\n              your APM Server instance(s) to at least 7.0."
    })), _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.servicesTable.7xOldDataMessage', {
      defaultMessage: 'You may also have old data that needs to be migrated.'
    }), ' ', _react.default.createElement(_KibanaLink.KibanaLink, {
      path: "/management/elasticsearch/upgrade_assistant"
    }, _i18n.i18n.translate('xpack.apm.servicesTable.UpgradeAssistantLink', {
      defaultMessage: 'Learn more by visiting the Kibana Upgrade Assistant'
    })), ".")),
    actions: _react.default.createElement(_SetupInstructionsLink.SetupInstructionsLink, {
      buttonFill: true
    })
  });
}