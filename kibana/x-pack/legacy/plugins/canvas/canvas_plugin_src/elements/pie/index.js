"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pie = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const pie = () => ({
  name: 'pie',
  displayName: 'Pie chart',
  tags: ['chart', 'proportion'],
  width: 300,
  height: 300,
  help: 'A simple pie chart',
  image: _header.default,
  expression: `filters
| demodata
| pointseries color="state" size="max(price)"
| pie
| render`
});

exports.pie = pie;