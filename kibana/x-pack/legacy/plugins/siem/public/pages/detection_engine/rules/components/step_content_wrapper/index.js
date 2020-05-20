"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepContentWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StyledDiv = _styledComponents.default.div.withConfig({
  displayName: "StyledDiv",
  componentId: "sc-1d9arnx-0"
})(["padding-left:", ";"], function (_ref) {
  var addPadding = _ref.addPadding;
  return addPadding && '53px';
});

StyledDiv.defaultProps = {
  addPadding: false
};

var StepContentWrapper = _react.default.memo(StyledDiv);

exports.StepContentWrapper = StepContentWrapper;