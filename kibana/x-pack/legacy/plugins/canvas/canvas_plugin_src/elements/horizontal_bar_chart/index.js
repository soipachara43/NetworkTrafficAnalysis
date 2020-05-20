"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.horizontalBarChart = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const horizontalBarChart = () => ({
  name: 'horizontalBarChart',
  displayName: 'Horizontal bar chart',
  tags: ['chart'],
  help: 'A customizable horizontal bar chart',
  image: _header.default,
  expression: `filters
| demodata
| pointseries x="size(cost)" y="project" color="project"
| plot defaultStyle={seriesStyle bars=0.75 horizontalBars=true} legend=false
| render`
});

exports.horizontalBarChart = horizontalBarChart;