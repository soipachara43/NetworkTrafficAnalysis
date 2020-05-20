"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyMlCapabilities = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyMlCapabilities = {
  capabilities: {
    canGetJobs: false,
    canCreateJob: false,
    canDeleteJob: false,
    canOpenJob: false,
    canCloseJob: false,
    canForecastJob: false,
    canGetDatafeeds: false,
    canStartStopDatafeed: false,
    canUpdateJob: false,
    canUpdateDatafeed: false,
    canPreviewDatafeed: false,
    canGetCalendars: false,
    canCreateCalendar: false,
    canDeleteCalendar: false,
    canGetFilters: false,
    canCreateFilter: false,
    canDeleteFilter: false,
    canFindFileStructure: false,
    canGetDataFrame: false,
    canDeleteDataFrame: false,
    canPreviewDataFrame: false,
    canCreateDataFrame: false,
    canStartStopDataFrame: false,
    canGetDataFrameAnalytics: false,
    canDeleteDataFrameAnalytics: false,
    canCreateDataFrameAnalytics: false,
    canStartStopDataFrameAnalytics: false
  },
  isPlatinumOrTrialLicense: false,
  mlFeatureEnabledInSpace: false,
  upgradeInProgress: false
};
exports.emptyMlCapabilities = emptyMlCapabilities;