"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlotValues = getPlotValues;

var _d3Scale = require("d3-scale");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getPlotValues(_ref) {
  var width = _ref.width,
      _ref$xMin = _ref.xMin,
      xMin = _ref$xMin === void 0 ? 0 : _ref$xMin,
      xMax = _ref.xMax,
      height = _ref.height,
      margins = _ref.margins;
  var xScale = (0, _d3Scale.scaleLinear)().domain([xMin, xMax]).range([margins.left, width - margins.right]);
  return {
    height: height,
    margins: margins,
    tickValues: xScale.ticks(7),
    width: width,
    xDomain: xScale.domain(),
    xMax: xMax,
    xScale: xScale
  };
}