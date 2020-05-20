"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTipShortcut = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ToolTipShortcut = function ToolTipShortcut(_ref) {
  var shortcut = _ref.shortcut;
  return _react.default.createElement(_eui.EuiText, {
    size: "xs",
    textAlign: "center",
    color: "ghost"
  }, shortcut.replace(/\+/g, ' + '));
};

exports.ToolTipShortcut = ToolTipShortcut;
ToolTipShortcut.propTypes = {
  shortcut: _propTypes.default.string.isRequired
};