"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExternalLinkIcon = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LinkIcon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "LinkIcon",
  componentId: "o3wd7q-0"
})(["position:relative;top:-2px;"]);
LinkIcon.displayName = 'LinkIcon';
var LinkIconWithMargin = (0, _styledComponents.default)(LinkIcon).withConfig({
  displayName: "LinkIconWithMargin",
  componentId: "o3wd7q-1"
})(["margin-left:5px;"]);
LinkIconWithMargin.displayName = 'LinkIconWithMargin';
var color = 'subdued';
var iconSize = 's';
var iconType = 'popout';
/**
 * Renders an icon that indicates following the hyperlink will navigate to
 * content external to the app
 */

var ExternalLinkIcon = _react.default.memo(function (_ref) {
  var _ref$leftMargin = _ref.leftMargin,
      leftMargin = _ref$leftMargin === void 0 ? true : _ref$leftMargin;
  return leftMargin ? _react.default.createElement(LinkIconWithMargin, {
    color: color,
    "data-test-subj": "external-link-icon",
    size: iconSize,
    type: iconType
  }) : _react.default.createElement(LinkIcon, {
    color: color,
    "data-test-subj": "external-link-icon",
    size: iconSize,
    type: iconType
  });
});

exports.ExternalLinkIcon = ExternalLinkIcon;
ExternalLinkIcon.displayName = 'ExternalLinkIcon';