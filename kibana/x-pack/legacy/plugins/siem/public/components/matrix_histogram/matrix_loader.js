"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatrixLoader = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StyledEuiFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "StyledEuiFlexGroup",
  componentId: "sc-1t12igt-0"
})(["flex 1;"]);

var MatrixLoaderComponent = function MatrixLoaderComponent() {
  return _react.default.createElement(StyledEuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  })));
};

var MatrixLoader = _react.default.memo(MatrixLoaderComponent);

exports.MatrixLoader = MatrixLoader;