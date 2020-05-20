"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Metric = void 0;

var _react = _interopRequireDefault(require("react"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const Metric = ({
  label,
  metric,
  labelFont,
  metricFont,
  metricFormat
}) => _react.default.createElement("div", {
  className: "canvasMetric"
}, _react.default.createElement("div", {
  className: "canvasMetric__metric",
  style: metricFont
}, metricFormat ? (0, _numeral.default)(metric).format(metricFormat) : metric), label && _react.default.createElement("div", {
  className: "canvasMetric__label",
  style: labelFont
}, label));

exports.Metric = Metric;