"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LastTickValue = LastTickValue;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function LastTickValue(_ref) {
  var x = _ref.x,
      marginTop = _ref.marginTop,
      value = _ref.value;
  return _react.default.createElement("g", {
    transform: "translate(".concat(x, ", ").concat(marginTop, ")")
  }, _react.default.createElement("text", {
    textAnchor: "middle",
    dy: "0",
    transform: "translate(0, -8)"
  }, value));
}

LastTickValue.requiresSVG = true;