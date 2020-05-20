"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonutChartLegendRow = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EuiFlexItemReducedMargin = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemReducedMargin",
  componentId: "sc-1epkw8k-0"
})(["&&{margin-left:0px;margin-right:0px;}"]);
var EuiFlexItemAlignRight = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemAlignRight",
  componentId: "sc-1epkw8k-1"
})(["text-align:right;"]);

var DonutChartLegendRow = function DonutChartLegendRow(_ref) {
  var color = _ref.color,
      content = _ref.content,
      message = _ref.message,
      dts = _ref['data-test-subj'];
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    responsive: false
  }, _react.default.createElement(EuiFlexItemReducedMargin, {
    component: "span",
    grow: false
  }, _react.default.createElement(_eui.EuiHealth, {
    color: color
  })), _react.default.createElement(EuiFlexItemReducedMargin, {
    component: "span",
    grow: false
  }, message), _react.default.createElement(EuiFlexItemAlignRight, {
    component: "span",
    "data-test-subj": dts
  }, content));
};

exports.DonutChartLegendRow = DonutChartLegendRow;