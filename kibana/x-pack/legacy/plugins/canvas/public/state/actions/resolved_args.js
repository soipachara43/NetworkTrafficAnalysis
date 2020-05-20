"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inFlightComplete = exports.inFlightActive = exports.clearValues = exports.clearValue = exports.setValues = exports.setValue = exports.setLoading = exports.inFlightCompleteActionType = exports.inFlightActiveActionType = exports.setValueActionType = exports.setLoadingActionType = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var setLoadingActionType = 'setResolvedLoading';
exports.setLoadingActionType = setLoadingActionType;
var setValueActionType = 'setResolvedValue';
exports.setValueActionType = setValueActionType;
var inFlightActiveActionType = 'inFlightActive';
exports.inFlightActiveActionType = inFlightActiveActionType;
var inFlightCompleteActionType = 'inFlightComplete';
exports.inFlightCompleteActionType = inFlightCompleteActionType;
var setLoading = (0, _reduxActions.createAction)(setLoadingActionType);
exports.setLoading = setLoading;
var setValue = (0, _reduxActions.createAction)(setValueActionType);
exports.setValue = setValue;
var setValues = (0, _reduxActions.createAction)('setResolvedValues');
exports.setValues = setValues;
var clearValue = (0, _reduxActions.createAction)('clearResolvedValue');
exports.clearValue = clearValue;
var clearValues = (0, _reduxActions.createAction)('clearResolvedValues');
exports.clearValues = clearValues;
var inFlightActive = (0, _reduxActions.createAction)(inFlightActiveActionType, function () {
  return undefined;
});
exports.inFlightActive = inFlightActive;
var inFlightComplete = (0, _reduxActions.createAction)(inFlightCompleteActionType, function () {
  return undefined;
});
exports.inFlightComplete = inFlightComplete;