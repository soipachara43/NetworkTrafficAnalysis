"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHorizontalSeries = isHorizontalSeries;
exports.isHorizontalChart = isHorizontalChart;
exports.getIconForSeries = getIconForSeries;

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isHorizontalSeries(seriesType) {
  return seriesType === 'bar_horizontal' || seriesType === 'bar_horizontal_stacked';
}

function isHorizontalChart(layers) {
  return layers.every(function (l) {
    return isHorizontalSeries(l.seriesType);
  });
}

function getIconForSeries(type) {
  var definition = _types.visualizationTypes.find(function (t) {
    return t.id === type;
  });

  if (!definition) {
    throw new Error("Unknown series type ".concat(type));
  }

  return definition.icon || 'empty';
}