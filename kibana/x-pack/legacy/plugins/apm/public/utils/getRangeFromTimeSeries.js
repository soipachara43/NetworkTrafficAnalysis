"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRangeFromTimeSeries = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getRangeFromTimeSeries = function getRangeFromTimeSeries(timeseries) {
  var dataPoints = (0, _lodash.flatten)(timeseries.map(function (series) {
    return series.data;
  }));

  if (dataPoints.length) {
    return {
      start: dataPoints[0].x,
      end: dataPoints[dataPoints.length - 1].x
    };
  }

  return null;
};

exports.getRangeFromTimeSeries = getRangeFromTimeSeries;