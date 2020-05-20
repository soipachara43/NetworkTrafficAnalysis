"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarHeader = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SidebarHeader = _react.default.memo(function (_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h2", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, children)), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "s"
  }));
});

exports.SidebarHeader = SidebarHeader;
SidebarHeader.displayName = 'SidebarHeader';