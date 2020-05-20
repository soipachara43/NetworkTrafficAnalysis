"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopSeverityJobs = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTopSeverityJobs = function getTopSeverityJobs(anomalies, limit) {
  var reduced = anomalies.reduce(function (accum, item) {
    var jobId = item.jobId;
    var severity = item.severity;

    if (accum[jobId] == null || accum[jobId].severity < severity) {
      accum[jobId] = item;
    }

    return accum;
  }, {});
  var sortedArray = (0, _fp.toArray)(reduced).sort(function (anomalyA, anomalyB) {
    return anomalyB.severity - anomalyA.severity;
  });

  if (limit == null) {
    return sortedArray;
  } else {
    return sortedArray.slice(0, limit);
  }
};

exports.getTopSeverityJobs = getTopSeverityJobs;