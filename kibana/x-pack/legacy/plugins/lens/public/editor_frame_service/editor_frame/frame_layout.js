"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameLayout = FrameLayout;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function FrameLayout(props) {
  return _react.default.createElement(_eui.EuiPage, {
    className: "lnsFrameLayout"
  }, _react.default.createElement("div", {
    className: "lnsFrameLayout__pageContent"
  }, _react.default.createElement(_eui.EuiPageSideBar, {
    className: "lnsFrameLayout__sidebar"
  }, props.dataPanel), _react.default.createElement(_eui.EuiPageBody, {
    className: "lnsFrameLayout__pageBody",
    restrictWidth: false
  }, props.workspacePanel, props.suggestionsPanel), _react.default.createElement(_eui.EuiPageSideBar, {
    className: "lnsFrameLayout__sidebar lnsFrameLayout__sidebar--right"
  }, props.configPanel)));
}