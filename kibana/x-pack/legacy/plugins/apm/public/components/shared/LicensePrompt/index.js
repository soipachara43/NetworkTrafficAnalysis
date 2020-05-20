"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicensePrompt = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _useKibanaUrl = require("../../../hooks/useKibanaUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LicensePrompt = function LicensePrompt(_ref) {
  var text = _ref.text,
      _ref$showBetaBadge = _ref.showBetaBadge,
      showBetaBadge = _ref$showBetaBadge === void 0 ? false : _ref$showBetaBadge;
  var licensePageUrl = (0, _useKibanaUrl.useKibanaUrl)('/app/kibana', '/management/elasticsearch/license_management/home');

  var renderLicenseBody = _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "iInCircle",
    iconColor: "subdued",
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.license.title', {
      defaultMessage: 'Start free 30-day trial'
    })),
    body: _react.default.createElement("p", null, text),
    actions: _react.default.createElement(_eui.EuiButton, {
      fill: true,
      href: licensePageUrl
    }, _i18n.i18n.translate('xpack.apm.license.button', {
      defaultMessage: 'Start trial'
    }))
  });

  var renderWithBetaBadge = _react.default.createElement(_eui.EuiPanel, {
    betaBadgeLabel: _i18n.i18n.translate('xpack.apm.license.betaBadge', {
      defaultMessage: 'Beta'
    }),
    betaBadgeTooltipContent: _i18n.i18n.translate('xpack.apm.license.betaTooltipMessage', {
      defaultMessage: 'This feature is currently in beta. If you encounter any bugs or have feedback, please open an issue or visit our discussion forum.'
    })
  }, renderLicenseBody);

  return _react.default.createElement(_react.default.Fragment, null, showBetaBadge ? renderWithBetaBadge : renderLicenseBody);
};

exports.LicensePrompt = LicensePrompt;