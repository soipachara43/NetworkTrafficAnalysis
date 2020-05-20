"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOneValue = exports.getPercent = exports.getArrowHeightFromPercent = exports.MAX_ARROW_HEIGHT = exports.DEFAULT_ARROW_HEIGHT = void 0;

var _d3Scale = require("d3-scale");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_ARROW_HEIGHT = 1;
exports.DEFAULT_ARROW_HEIGHT = DEFAULT_ARROW_HEIGHT;
var MAX_ARROW_HEIGHT = 4;
/** Returns the height of an arrow in pixels based on the specified percent (0-100) */

exports.MAX_ARROW_HEIGHT = MAX_ARROW_HEIGHT;
var getArrowHeightFromPercent = (0, _d3Scale.scaleLinear)().domain([0, 100]).range([DEFAULT_ARROW_HEIGHT, MAX_ARROW_HEIGHT]).clamp(true);
/** Returns a percent, or undefined if the percent cannot be calculated */

exports.getArrowHeightFromPercent = getArrowHeightFromPercent;

var getPercent = function getPercent(_ref) {
  var numerator = _ref.numerator,
      denominator = _ref.denominator;

  if (Math.abs(denominator) < Number.EPSILON || !Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return undefined;
  }

  return numerator / denominator * 100;
};
/** Returns true if the input is an array that holds one value */


exports.getPercent = getPercent;

var hasOneValue = function hasOneValue(array) {
  return Array.isArray(array) && array.length === 1;
};

exports.hasOneValue = hasOneValue;