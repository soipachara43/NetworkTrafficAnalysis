"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilityBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UtilityBar = _react.default.memo(function (_ref) {
  var border = _ref.border,
      children = _ref.children;
  return _react.default.createElement(_styles.Bar, {
    border: border
  }, children);
});

exports.UtilityBar = UtilityBar;
UtilityBar.displayName = 'UtilityBar';