"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAgentSummaryItem = UserAgentSummaryItem;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Version = (0, _styledComponents.default)('span').withConfig({
  displayName: "Version",
  componentId: "sc-1umx1ms-0"
})(["font-size:", ";"], _eui_theme_light.default.euiFontSizeS);

function UserAgentSummaryItem(_ref) {
  var name = _ref.name,
      version = _ref.version;
  return _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('xpack.apm.transactionDetails.userAgentAndVersionLabel', {
      defaultMessage: 'User agent & version'
    })
  }, _react.default.createElement(_react.default.Fragment, null, name, "\xA0", version && _react.default.createElement(Version, null, "(", version, ")")));
}