"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExplorerLink = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createExplorerLink = function createExplorerLink(score, startDate, endDate) {
  var startDateIso = new Date(startDate).toISOString();
  var endDateIso = new Date(endDate).toISOString();
  var JOB_PREFIX = "ml#/explorer?_g=(ml:(jobIds:!(".concat(score.jobId, "))");
  var REFRESH_INTERVAL = ",refreshInterval:(display:Off,pause:!f,value:0),time:(from:'".concat(startDateIso, "',mode:absolute,to:'").concat(endDateIso, "'))");
  var INTERVAL_SELECTION = "&_a=(mlExplorerFilter:(),mlExplorerSwimlane:(),mlSelectLimit:(display:'10',val:10),mlShowCharts:!t)";
  return "".concat(JOB_PREFIX).concat(REFRESH_INTERVAL).concat(INTERVAL_SELECTION);
};

exports.createExplorerLink = createExplorerLink;