"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_FAILED = exports.COLUMN_FAILED_MSG = exports.COLUMN_FAILED_AT = exports.COLUMN_STATUS_TYPE = exports.LAST_FIVE_ERRORS = exports.FAILURE_HISTORY_TAB = exports.ERROR_CALLOUT_TITLE = exports.UNKNOWN = exports.ACTIVATE_RULE = exports.EXPERIMENTAL = exports.BACK_TO_RULES = exports.PAGE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.pageTitle', {
  defaultMessage: 'Rule details'
});

exports.PAGE_TITLE = PAGE_TITLE;

var BACK_TO_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.backToRulesDescription', {
  defaultMessage: 'Back to signal detection rules'
});

exports.BACK_TO_RULES = BACK_TO_RULES;

var EXPERIMENTAL = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.experimentalDescription', {
  defaultMessage: 'Experimental'
});

exports.EXPERIMENTAL = EXPERIMENTAL;

var ACTIVATE_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.activateRuleLabel', {
  defaultMessage: 'Activate'
});

exports.ACTIVATE_RULE = ACTIVATE_RULE;

var UNKNOWN = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.unknownDescription', {
  defaultMessage: 'Unknown'
});

exports.UNKNOWN = UNKNOWN;

var ERROR_CALLOUT_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.errorCalloutTitle', {
  defaultMessage: 'Rule failure at'
});

exports.ERROR_CALLOUT_TITLE = ERROR_CALLOUT_TITLE;

var FAILURE_HISTORY_TAB = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.failureHistoryTab', {
  defaultMessage: 'Failure History'
});

exports.FAILURE_HISTORY_TAB = FAILURE_HISTORY_TAB;

var LAST_FIVE_ERRORS = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.lastFiveErrorsTitle', {
  defaultMessage: 'Last five errors'
});

exports.LAST_FIVE_ERRORS = LAST_FIVE_ERRORS;

var COLUMN_STATUS_TYPE = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.statusTypeColumn', {
  defaultMessage: 'Type'
});

exports.COLUMN_STATUS_TYPE = COLUMN_STATUS_TYPE;

var COLUMN_FAILED_AT = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.statusFailedAtColumn', {
  defaultMessage: 'Failed at'
});

exports.COLUMN_FAILED_AT = COLUMN_FAILED_AT;

var COLUMN_FAILED_MSG = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.statusFailedMsgColumn', {
  defaultMessage: 'Failed message'
});

exports.COLUMN_FAILED_MSG = COLUMN_FAILED_MSG;

var TYPE_FAILED = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDetails.statusFailedDescription', {
  defaultMessage: 'Failed'
});

exports.TYPE_FAILED = TYPE_FAILED;