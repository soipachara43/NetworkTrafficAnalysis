"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApmHeader = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _KueryBar = require("../KueryBar");

var _DatePicker = require("../DatePicker");

var _EnvironmentFilter = require("../EnvironmentFilter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ApmHeader = function ApmHeader(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, children), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_DatePicker.DatePicker, null))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexStart",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react.default.createElement(_KueryBar.KueryBar, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_EnvironmentFilter.EnvironmentFilter, null))));
};

exports.ApmHeader = ApmHeader;