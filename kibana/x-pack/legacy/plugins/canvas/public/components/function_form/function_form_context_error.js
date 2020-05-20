"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionFormContextError = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _components = require("../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.FunctionFormContextError;

var FunctionFormContextError = function FunctionFormContextError(_ref) {
  var context = _ref.context;
  return _react.default.createElement("div", {
    className: "canvasFunctionForm canvasFunctionForm--error"
  }, strings.getContextErrorMessage(context.error));
};

exports.FunctionFormContextError = FunctionFormContextError;
FunctionFormContextError.propTypes = {
  context: _propTypes.default.shape({
    error: _propTypes.default.string
  }).isRequired
};