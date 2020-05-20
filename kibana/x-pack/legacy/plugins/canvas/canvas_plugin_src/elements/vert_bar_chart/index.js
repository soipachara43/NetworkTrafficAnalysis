"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verticalBarChart = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const verticalBarChart = () => ({
  name: 'verticalBarChart',
  displayName: 'Vertical bar chart',
  tags: ['chart'],
  help: 'A customizable vertical bar chart',
  image: _header.default,
  expression: `filters
| demodata
| pointseries x="project" y="size(cost)" color="project"
| plot defaultStyle={seriesStyle bars=0.75} legend=false
| render`
});

exports.verticalBarChart = verticalBarChart;