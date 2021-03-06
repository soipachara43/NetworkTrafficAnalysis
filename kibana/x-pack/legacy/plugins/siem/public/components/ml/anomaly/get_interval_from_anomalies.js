"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntervalFromAnomalies = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getIntervalFromAnomalies = function getIntervalFromAnomalies(anomalies) {
  if (anomalies == null) {
    return 'day';
  } else {
    return anomalies.interval;
  }
};

exports.getIntervalFromAnomalies = getIntervalFromAnomalies;