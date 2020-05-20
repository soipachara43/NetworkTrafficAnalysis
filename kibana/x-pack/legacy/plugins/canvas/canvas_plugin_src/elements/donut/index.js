"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donut = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const donut = () => ({
  name: 'donut',
  displayName: 'Donut chart',
  tags: ['chart', 'proportion'],
  help: 'A customizable donut chart',
  image: _header.default,
  expression: `filters
| demodata
| pointseries color="project" size="max(price)"
| pie hole=50 labels=false legend="ne"
| render`
});

exports.donut = donut;