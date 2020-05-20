"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plot = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plot = () => ({
  name: 'plot',
  displayName: 'Coordinate plot',
  tags: ['chart'],
  help: 'Mixed line, bar or dot charts',
  image: _header.default,
  expression: `filters
| demodata
| pointseries x="time" y="sum(price)" color="state"
| plot defaultStyle={seriesStyle points=5}
| render`
});

exports.plot = plot;