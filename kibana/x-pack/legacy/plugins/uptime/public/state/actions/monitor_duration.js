"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorDurationActionFail = exports.getMonitorDurationActionSuccess = exports.getMonitorDurationAction = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getMonitorDurationAction = (0, _reduxActions.createAction)('GET_MONITOR_DURATION');
exports.getMonitorDurationAction = getMonitorDurationAction;
var getMonitorDurationActionSuccess = (0, _reduxActions.createAction)('GET_MONITOR_DURATION_SUCCESS');
exports.getMonitorDurationActionSuccess = getMonitorDurationActionSuccess;
var getMonitorDurationActionFail = (0, _reduxActions.createAction)('GET_MONITOR_DURATION_FAIL');
exports.getMonitorDurationActionFail = getMonitorDurationActionFail;