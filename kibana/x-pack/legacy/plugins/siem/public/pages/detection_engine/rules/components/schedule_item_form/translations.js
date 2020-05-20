"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INVALID_TIME = exports.HOURS = exports.MINUTES = exports.SECONDS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SECONDS = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRuleForm.secondsOptionDescription', {
  defaultMessage: 'Seconds'
});

exports.SECONDS = SECONDS;

var MINUTES = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRuleForm.minutesOptionDescription', {
  defaultMessage: 'Minutes'
});

exports.MINUTES = MINUTES;

var HOURS = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRuleForm.hoursOptionDescription', {
  defaultMessage: 'Hours'
});

exports.HOURS = HOURS;

var INVALID_TIME = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepScheduleRuleForm.invalidTimeMessageDescription', {
  defaultMessage: 'A time is required.'
});

exports.INVALID_TIME = INVALID_TIME;