"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progressWheel = void 0;

var _fonts = require("../../../common/lib/fonts");

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const progressWheel = () => ({
  name: 'progressWheel',
  displayName: 'Progress wheel',
  tags: ['chart', 'proportion'],
  help: 'Displays progress as a portion of a wheel',
  width: 200,
  height: 200,
  image: _header.default,
  expression: `filters
| demodata
| math "mean(percent_uptime)"
| progress shape="wheel" label={formatnumber 0%} font={font size=24 family="${_fonts.openSans.value}" color="#000000" align=center}
| render`
});

exports.progressWheel = progressWheel;