"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.px = px;
exports.pct = pct;
exports.truncate = truncate;
exports.fontSizes = exports.fontSize = exports.fontFamilyCode = exports.borderRadius = exports.units = exports.unit = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Units
var unit = 16;
exports.unit = unit;
var units = {
  unit: unit,
  eighth: unit / 8,
  quarter: unit / 4,
  half: unit / 2,
  minus: unit * 0.75,
  plus: unit * 1.5,
  double: unit * 2,
  triple: unit * 3,
  quadruple: unit * 4
};
exports.units = units;

function px(value) {
  return "".concat(value, "px");
}

function pct(value) {
  return "".concat(value, "%");
} // Styling


var borderRadius = '4px'; // Fonts

exports.borderRadius = borderRadius;
var fontFamilyCode = '"Roboto Mono", Consolas, Menlo, Courier, monospace'; // Font sizes

exports.fontFamilyCode = fontFamilyCode;
var fontSize = '14px';
exports.fontSize = fontSize;
var fontSizes = {
  tiny: '10px',
  small: '12px',
  large: '16px',
  xlarge: '20px',
  xxlarge: '30px'
};
exports.fontSizes = fontSizes;

function truncate(width) {
  return "\n      max-width: ".concat(width, ";\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    ");
}