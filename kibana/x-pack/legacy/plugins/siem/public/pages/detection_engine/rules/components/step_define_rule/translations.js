"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENABLE_ML_JOB_WARNING = exports.ML_JOB_SELECT_PLACEHOLDER_TEXT = exports.IMPORT_TIMELINE_QUERY = exports.RESET_DEFAULT_INDEX = exports.INDEX_HELPER_TEXT = exports.CUSTOM_INDICES = exports.CONFIG_INDICES = exports.INVALID_CUSTOM_QUERY = exports.CUSTOM_QUERY_REQUIRED = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CUSTOM_QUERY_REQUIRED = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.customQueryFieldRequiredError', {
  defaultMessage: 'A custom query is required.'
});

exports.CUSTOM_QUERY_REQUIRED = CUSTOM_QUERY_REQUIRED;

var INVALID_CUSTOM_QUERY = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.customQueryFieldInvalidError', {
  defaultMessage: 'The KQL is invalid'
});

exports.INVALID_CUSTOM_QUERY = INVALID_CUSTOM_QUERY;

var CONFIG_INDICES = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.indicesFromConfigDescription', {
  defaultMessage: 'Use Elasticsearch indices from SIEM advanced settings'
});

exports.CONFIG_INDICES = CONFIG_INDICES;

var CUSTOM_INDICES = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.indicesCustomDescription', {
  defaultMessage: 'Provide custom list of indices'
});

exports.CUSTOM_INDICES = CUSTOM_INDICES;

var INDEX_HELPER_TEXT = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.indicesHelperDescription', {
  defaultMessage: 'Enter the pattern of Elasticsearch indices where you would like this rule to run. By default, these will include index patterns defined in SIEM advanced settings.'
});

exports.INDEX_HELPER_TEXT = INDEX_HELPER_TEXT;

var RESET_DEFAULT_INDEX = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.resetDefaultIndicesButton', {
  defaultMessage: 'Reset to default index patterns'
});

exports.RESET_DEFAULT_INDEX = RESET_DEFAULT_INDEX;

var IMPORT_TIMELINE_QUERY = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.importTimelineQueryButton', {
  defaultMessage: 'Import query from saved timeline'
});

exports.IMPORT_TIMELINE_QUERY = IMPORT_TIMELINE_QUERY;

var ML_JOB_SELECT_PLACEHOLDER_TEXT = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.mlJobSelectPlaceholderText', {
  defaultMessage: 'Select a job'
});

exports.ML_JOB_SELECT_PLACEHOLDER_TEXT = ML_JOB_SELECT_PLACEHOLDER_TEXT;

var ENABLE_ML_JOB_WARNING = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.mlEnableJobWarningTitle', {
  defaultMessage: 'This ML job is not currently running. Please set this job to run via "ML job settings" before activating this rule.'
});

exports.ENABLE_ML_JOB_WARNING = ENABLE_ML_JOB_WARNING;