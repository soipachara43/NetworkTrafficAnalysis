"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tiltedPie = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const tiltedPie = () => ({
  name: 'tiltedPie',
  displayName: 'Tilted pie chart',
  tags: ['chart', 'proportion'],
  width: 500,
  height: 250,
  help: 'A customizable tilted pie chart',
  image: _header.default,
  expression: `filters
| demodata
| pointseries color="project" size="max(price)"
| pie tilt=0.5
| render`
});

exports.tiltedPie = tiltedPie;