"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageCustomLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _APMLink = require("../../Links/apm/APMLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ManageCustomLink = function ManageCustomLink(_ref) {
  var onCreateCustomLinkClick = _ref.onCreateCustomLinkClick,
      _ref$showCreateCustom = _ref.showCreateCustomLinkButton,
      showCreateCustomLinkButton = _ref$showCreateCustom === void 0 ? true : _ref$showCreateCustom;
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      justifyContent: 'center'
    }
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: _i18n.i18n.translate('xpack.apm.customLink.buttom.manage', {
      defaultMessage: 'Manage custom links'
    })
  }, _react.default.createElement(_APMLink.APMLink, {
    path: "/settings/customize-ui"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "gear",
    color: "text",
    "aria-label": "Custom links settings page"
  })))), showCreateCustomLinkButton && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircle",
    size: "xs",
    onClick: onCreateCustomLinkClick
  }, _i18n.i18n.translate('xpack.apm.customLink.buttom.create.title', {
    defaultMessage: 'Create'
  }))))));
};

exports.ManageCustomLink = ManageCustomLink;