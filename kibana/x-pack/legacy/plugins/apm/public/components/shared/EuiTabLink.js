"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTabLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _variables = require("../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// We need to remove padding and add it to the link,
// to prevent the user from clicking in the tab, but outside of the link
// We also need to override the color here to subdue the color of the link
// when not selected
var Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Wrapper",
  componentId: "sc-1m1b6bd-0"
})(["padding:0;a{display:inline-block;padding:", " ", ";", "}"], (0, _variables.px)(_variables.unit * 0.75), (0, _variables.px)(_variables.unit), function (_ref) {
  var isSelected = _ref.isSelected;
  return !isSelected ? "color: ".concat(_eui_theme_light.default.euiTextColor, " !important;") : '';
});

var EuiTabLink = function EuiTabLink(props) {
  var isSelected = props.isSelected,
      children = props.children;
  var className = (0, _classnames.default)('euiTab', {
    'euiTab-isSelected': isSelected
  });
  return _react.default.createElement(Wrapper, {
    className: className,
    isSelected: isSelected
  }, _react.default.createElement("span", {
    className: 'euiTab__content'
  }, children));
};

exports.EuiTabLink = EuiTabLink;