"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorLocationsActionFail = exports.getMonitorLocationsActionSuccess = exports.getMonitorLocationsAction = exports.getMonitorDetailsActionFail = exports.getMonitorDetailsActionSuccess = exports.getMonitorDetailsAction = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getMonitorDetailsAction = (0, _reduxActions.createAction)('GET_MONITOR_DETAILS');
exports.getMonitorDetailsAction = getMonitorDetailsAction;
var getMonitorDetailsActionSuccess = (0, _reduxActions.createAction)('GET_MONITOR_DETAILS_SUCCESS');
exports.getMonitorDetailsActionSuccess = getMonitorDetailsActionSuccess;
var getMonitorDetailsActionFail = (0, _reduxActions.createAction)('GET_MONITOR_DETAILS_FAIL');
exports.getMonitorDetailsActionFail = getMonitorDetailsActionFail;
var getMonitorLocationsAction = (0, _reduxActions.createAction)('GET_MONITOR_LOCATIONS');
exports.getMonitorLocationsAction = getMonitorLocationsAction;
var getMonitorLocationsActionSuccess = (0, _reduxActions.createAction)('GET_MONITOR_LOCATIONS_SUCCESS');
exports.getMonitorLocationsActionSuccess = getMonitorLocationsActionSuccess;
var getMonitorLocationsActionFail = (0, _reduxActions.createAction)('GET_MONITOR_LOCATIONS_FAIL');
exports.getMonitorLocationsActionFail = getMonitorLocationsActionFail;