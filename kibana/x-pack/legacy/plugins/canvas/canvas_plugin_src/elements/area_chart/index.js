"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areaChart = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const areaChart = () => ({
  name: 'areaChart',
  displayName: 'Area chart',
  help: 'A line chart with a filled body',
  tags: ['chart'],
  image: _header.default,
  expression: `filters
  | demodata
  | pointseries x="time" y="mean(price)"
  | plot defaultStyle={seriesStyle lines=1 fill=1}
  | render`
});

exports.areaChart = areaChart;