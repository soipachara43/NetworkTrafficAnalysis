"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnomalyRecordsAction = exports.deleteMLJobAction = exports.getMLCapabilitiesAction = exports.createMLJobAction = exports.getExistingMLJobAction = exports.resetMLState = void 0;

var _reduxActions = require("redux-actions");

var _utils = require("./utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var resetMLState = (0, _reduxActions.createAction)('RESET_ML_STATE');
exports.resetMLState = resetMLState;
var getExistingMLJobAction = (0, _utils.createAsyncAction)('GET_EXISTING_ML_JOB');
exports.getExistingMLJobAction = getExistingMLJobAction;
var createMLJobAction = (0, _utils.createAsyncAction)('CREATE_ML_JOB');
exports.createMLJobAction = createMLJobAction;
var getMLCapabilitiesAction = (0, _utils.createAsyncAction)('GET_ML_CAPABILITIES');
exports.getMLCapabilitiesAction = getMLCapabilitiesAction;
var deleteMLJobAction = (0, _utils.createAsyncAction)('DELETE_ML_JOB');
exports.deleteMLJobAction = deleteMLJobAction;
var getAnomalyRecordsAction = (0, _utils.createAsyncAction)('GET_ANOMALY_RECORDS');
exports.getAnomalyRecordsAction = getAnomalyRecordsAction;