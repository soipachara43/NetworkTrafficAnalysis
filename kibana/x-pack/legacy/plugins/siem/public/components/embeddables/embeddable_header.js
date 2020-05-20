"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbeddableHeader = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Header = _styledComponents.default.header.attrs(function (_ref) {
  var className = _ref.className;
  return {
    className: "siemEmbeddable__header ".concat(className)
  };
}).withConfig({
  displayName: "Header",
  componentId: "sc-1uzy0x1-0"
})(["border-bottom:", ";padding:", ";"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiBorderThin;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.paddingSizes.m;
});

Header.displayName = 'Header';

var EmbeddableHeader = _react.default.memo(function (_ref4) {
  var children = _ref4.children,
      title = _ref4.title;
  return _react.default.createElement(Header, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs"
  }, _react.default.createElement("h6", {
    "data-test-subj": "header-embeddable-title"
  }, title))), children && _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "header-embeddable-supplements",
    grow: false
  }, children)));
});

exports.EmbeddableHeader = EmbeddableHeader;
EmbeddableHeader.displayName = 'EmbeddableHeader';