"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSeriesLink = void 0;

var _create_entities_from_score = require("../score/create_entities_from_score");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createSeriesLink = function createSeriesLink(score, startDate, endDate) {
  var startDateIso = new Date(startDate).toISOString();
  var endDateIso = new Date(endDate).toISOString();
  var JOB_PREFIX = "ml#/timeseriesexplorer?_g=(ml:(jobIds:!(".concat(score.jobId, "))");
  var REFRESH_INTERVAL = ",refreshInterval:(display:Off,pause:!f,value:0),time:(from:'".concat(startDateIso, "',mode:absolute,to:'").concat(endDateIso, "'))");
  var INTERVAL_SELECTION = "&_a=(mlSelectInterval:(display:Auto,val:auto),mlSelectSeverity:(color:%23d2e9f7,display:warning,val:0),mlTimeSeriesExplorer:(detectorIndex:0,";
  var ENTITIES = "entities:(".concat((0, _create_entities_from_score.createEntitiesFromScore)(score), ")))");
  return "".concat(JOB_PREFIX).concat(REFRESH_INTERVAL).concat(INTERVAL_SELECTION).concat(ENTITIES);
};

exports.createSeriesLink = createSeriesLink;