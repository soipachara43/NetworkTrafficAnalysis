"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCompoundNetworkKey = exports.createCompoundHostKey = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createCompoundHostKey = function createCompoundHostKey(anomaliesByHost) {
  return "".concat(anomaliesByHost.hostName, "-").concat(anomaliesByHost.anomaly.entityName, "-").concat(anomaliesByHost.anomaly.entityValue, "-").concat(anomaliesByHost.anomaly.severity, "-").concat(anomaliesByHost.anomaly.jobId);
};

exports.createCompoundHostKey = createCompoundHostKey;

var createCompoundNetworkKey = function createCompoundNetworkKey(anomaliesByNetwork) {
  return "".concat(anomaliesByNetwork.ip, "-").concat(anomaliesByNetwork.anomaly.entityName, "-").concat(anomaliesByNetwork.anomaly.entityValue, "-").concat(anomaliesByNetwork.anomaly.severity, "-").concat(anomaliesByNetwork.anomaly.jobId);
};

exports.createCompoundNetworkKey = createCompoundNetworkKey;