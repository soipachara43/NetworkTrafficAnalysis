"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntegrationLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IntegrationLink = function IntegrationLink(_ref) {
  var ariaLabel = _ref.ariaLabel,
      href = _ref.href,
      iconType = _ref.iconType,
      message = _ref.message,
      tooltipContent = _ref.tooltipContent;
  return typeof href === 'undefined' ? _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('xpack.uptime.integrationLink.missingDataMessage', {
      defaultMessage: 'Required data for this integration was not found.'
    })
  }, _react.default.createElement(_eui.EuiIcon, {
    type: iconType
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, message))) : _react.default.createElement(_eui.EuiLink, {
    "aria-label": ariaLabel,
    href: href
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: tooltipContent,
    position: "top"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: iconType
  }))), _react.default.createElement(_eui.EuiFlexItem, null, message)));
};

exports.IntegrationLink = IntegrationLink;