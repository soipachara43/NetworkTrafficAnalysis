"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartEmptyState = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ChartEmptyState = function ChartEmptyState(_ref) {
  var title = _ref.title,
      body = _ref.body;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h5", null, title)),
    body: _react.default.createElement("p", null, body)
  });
};

exports.ChartEmptyState = ChartEmptyState;