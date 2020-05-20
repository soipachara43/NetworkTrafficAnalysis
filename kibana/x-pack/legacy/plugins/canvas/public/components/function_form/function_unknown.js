"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionUnknown = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = require("../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ComponentStrings.FunctionFormFunctionUnknown;

var FunctionUnknown = function FunctionUnknown(_ref) {
  var argType = _ref.argType;
  return _react.default.createElement("div", {
    className: "canvasFunctionForm canvasFunctionForm--unknown-expression"
  }, strings.getUnknownArgumentTypeErrorMessage(argType));
};

exports.FunctionUnknown = FunctionUnknown;
FunctionUnknown.propTypes = {
  argType: _propTypes.default.string
};