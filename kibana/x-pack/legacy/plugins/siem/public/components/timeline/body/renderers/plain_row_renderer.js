"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plainRowRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var plainRowRenderer = {
  isInstance: function isInstance(_) {
    return true;
  },
  renderRow: function renderRow() {
    return _react.default.createElement(_react.default.Fragment, null);
  }
};
exports.plainRowRenderer = plainRowRenderer;