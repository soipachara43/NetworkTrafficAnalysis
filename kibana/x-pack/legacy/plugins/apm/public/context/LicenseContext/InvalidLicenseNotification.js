"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidLicenseNotification = InvalidLicenseNotification;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _useApmPluginContext2 = require("../../hooks/useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function InvalidLicenseNotification() {
  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  var manageLicenseURL = core.http.basePath.prepend('/app/kibana#/management/elasticsearch/license_management');
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "alert",
    iconColor: "warning",
    title: _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.apm.invalidLicense.title', {
      defaultMessage: 'Invalid License'
    })),
    body: _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.invalidLicense.message', {
      defaultMessage: 'The APM UI is not available because your current license has expired or is no longer valid.'
    })),
    actions: [_react.default.createElement(_eui.EuiButton, {
      href: manageLicenseURL
    }, _i18n.i18n.translate('xpack.apm.invalidLicense.licenseManagementLink', {
      defaultMessage: 'Manage your license'
    }))]
  });
}