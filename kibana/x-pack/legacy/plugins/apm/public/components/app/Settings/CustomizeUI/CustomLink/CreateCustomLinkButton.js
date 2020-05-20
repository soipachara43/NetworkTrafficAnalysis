"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomLinkButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateCustomLinkButton = function CreateCustomLinkButton(_ref) {
  var onClick = _ref.onClick;
  return _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    fill: true,
    onClick: onClick
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.createCustomLink', {
    defaultMessage: 'Create custom link'
  }));
};

exports.CreateCustomLinkButton = CreateCustomLinkButton;