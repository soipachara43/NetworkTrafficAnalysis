"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bubbleChart = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const bubbleChart = () => ({
  name: 'bubbleChart',
  displayName: 'Bubble chart',
  tags: ['chart'],
  help: 'A customizable bubble chart',
  width: 700,
  height: 300,
  image: _header.default,
  expression: `filters
| demodata
| pointseries x="project" y="sum(price)" color="state" size="size(username)"
| plot defaultStyle={seriesStyle points=5 fill=1}
| render`
});

exports.bubbleChart = bubbleChart;