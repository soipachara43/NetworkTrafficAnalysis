"use strict";

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _metric = require("../metric");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const labelFontSpec = {
  fontFamily: "Baskerville, Georgia, Garamond, 'Times New Roman', Times, serif",
  fontWeight: 'normal',
  fontStyle: 'italic',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '1',
  color: '#000000'
};
const metricFontSpec = {
  fontFamily: "Optima, 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Helvetica, Arial, sans-serif",
  fontWeight: 'bold',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'center',
  fontSize: '48px',
  lineHeight: '1',
  color: '#b83c6f'
};
(0, _react.storiesOf)('renderers/Metric', module).addDecorator(story => _react2.default.createElement("div", {
  style: {
    width: '200px'
  }
}, story())).add('with null metric', () => _react2.default.createElement(_metric.Metric, {
  metric: null,
  metricFont: {},
  labelFont: {}
})).add('with number metric', () => _react2.default.createElement(_metric.Metric, {
  metric: "12345.6789",
  labelFont: {},
  metricFont: metricFontSpec
})).add('with string metric', () => _react2.default.createElement(_metric.Metric, {
  metric: "$12.34",
  labelFont: labelFontSpec,
  metricFont: metricFontSpec
})).add('with label', () => _react2.default.createElement(_metric.Metric, {
  label: "Average price",
  metric: "$12.34",
  labelFont: labelFontSpec,
  metricFont: metricFontSpec
})).add('with number metric and a specified format', () => _react2.default.createElement(_metric.Metric, {
  metric: "-0.0024",
  labelFont: labelFontSpec,
  metricFont: metricFontSpec,
  metricFormat: "0.00%"
})).add('with formatted string metric and a specified format', () => _react2.default.createElement(_metric.Metric, {
  label: "Total Revenue",
  metric: "$10000000.00",
  labelFont: labelFontSpec,
  metricFont: metricFontSpec,
  metricFormat: "$0a"
})).add('with invalid metricFont', () => _react2.default.createElement(_metric.Metric, {
  label: "Total Revenue",
  metric: "$10000000.00",
  labelFont: labelFontSpec,
  metricFont: metricFontSpec,
  metricFormat: "$0a"
}));