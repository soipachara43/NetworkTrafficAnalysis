"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoDataLayout = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoDataLayout = (0, _reactRouterDom.withRouter)(function (_ref) {
  var actionSection = _ref.actionSection,
      title = _ref.title,
      children = _ref.children;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "logoBeats",
    title: _react.default.createElement("h2", null, title),
    body: children,
    actions: actionSection
  }))));
});
exports.NoDataLayout = NoDataLayout;