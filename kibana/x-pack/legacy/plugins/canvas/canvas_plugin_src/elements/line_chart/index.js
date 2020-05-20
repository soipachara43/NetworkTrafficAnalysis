"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lineChart = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lineChart = () => ({
  name: 'lineChart',
  displayName: 'Line chart',
  tags: ['chart'],
  help: 'A customizable line chart',
  image: _header.default,
  expression: `filters
| demodata
| pointseries x="time" y="mean(price)"
| plot defaultStyle={seriesStyle lines=3}
| render`
});

exports.lineChart = lineChart;