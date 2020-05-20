"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acknowledgeSetDynamicSettings = exports.setDynamicSettingsFail = exports.setDynamicSettingsSuccess = exports.setDynamicSettings = exports.getDynamicSettingsFail = exports.getDynamicSettingsSuccess = exports.getDynamicSettings = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDynamicSettings = (0, _reduxActions.createAction)('GET_DYNAMIC_SETTINGS');
exports.getDynamicSettings = getDynamicSettings;
var getDynamicSettingsSuccess = (0, _reduxActions.createAction)('GET_DYNAMIC_SETTINGS_SUCCESS');
exports.getDynamicSettingsSuccess = getDynamicSettingsSuccess;
var getDynamicSettingsFail = (0, _reduxActions.createAction)('GET_DYNAMIC_SETTINGS_FAIL');
exports.getDynamicSettingsFail = getDynamicSettingsFail;
var setDynamicSettings = (0, _reduxActions.createAction)('SET_DYNAMIC_SETTINGS');
exports.setDynamicSettings = setDynamicSettings;
var setDynamicSettingsSuccess = (0, _reduxActions.createAction)('SET_DYNAMIC_SETTINGS_SUCCESS');
exports.setDynamicSettingsSuccess = setDynamicSettingsSuccess;
var setDynamicSettingsFail = (0, _reduxActions.createAction)('SET_DYNAMIC_SETTINGS_FAIL');
exports.setDynamicSettingsFail = setDynamicSettingsFail;
var acknowledgeSetDynamicSettings = (0, _reduxActions.createAction)('ACKNOWLEDGE_SET_DYNAMIC_SETTINGS');
exports.acknowledgeSetDynamicSettings = acknowledgeSetDynamicSettings;