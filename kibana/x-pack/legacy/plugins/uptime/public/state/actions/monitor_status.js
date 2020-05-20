"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorStatusActionFail = exports.getMonitorStatusActionSuccess = exports.getMonitorStatusAction = exports.getSelectedMonitorActionFail = exports.getSelectedMonitorActionSuccess = exports.getSelectedMonitorAction = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getSelectedMonitorAction = (0, _reduxActions.createAction)('GET_SELECTED_MONITOR');
exports.getSelectedMonitorAction = getSelectedMonitorAction;
var getSelectedMonitorActionSuccess = (0, _reduxActions.createAction)('GET_SELECTED_MONITOR_SUCCESS');
exports.getSelectedMonitorActionSuccess = getSelectedMonitorActionSuccess;
var getSelectedMonitorActionFail = (0, _reduxActions.createAction)('GET_SELECTED_MONITOR_FAIL');
exports.getSelectedMonitorActionFail = getSelectedMonitorActionFail;
var getMonitorStatusAction = (0, _reduxActions.createAction)('GET_MONITOR_STATUS');
exports.getMonitorStatusAction = getMonitorStatusAction;
var getMonitorStatusActionSuccess = (0, _reduxActions.createAction)('GET_MONITOR_STATUS_SUCCESS');
exports.getMonitorStatusActionSuccess = getMonitorStatusActionSuccess;
var getMonitorStatusActionFail = (0, _reduxActions.createAction)('GET_MONITOR_STATUS_FAIL');
exports.getMonitorStatusActionFail = getMonitorStatusActionFail;