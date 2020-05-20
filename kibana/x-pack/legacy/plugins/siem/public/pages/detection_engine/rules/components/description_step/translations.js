"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ML_JOB_STOPPED = exports.ML_JOB_STARTED = exports.QUERY_TYPE_DESCRIPTION = exports.ML_TYPE_DESCRIPTION = exports.SAVED_ID_LABEL = exports.QUERY_LABEL = exports.FILTERS_LABEL = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FILTERS_LABEL = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.filtersLabel', {
  defaultMessage: 'Filters'
});

exports.FILTERS_LABEL = FILTERS_LABEL;

var QUERY_LABEL = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.QueryLabel', {
  defaultMessage: 'Custom query'
});

exports.QUERY_LABEL = QUERY_LABEL;

var SAVED_ID_LABEL = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.savedIdLabel', {
  defaultMessage: 'Saved query name'
});

exports.SAVED_ID_LABEL = SAVED_ID_LABEL;

var ML_TYPE_DESCRIPTION = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.mlRuleTypeDescription', {
  defaultMessage: 'Machine Learning'
});

exports.ML_TYPE_DESCRIPTION = ML_TYPE_DESCRIPTION;

var QUERY_TYPE_DESCRIPTION = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.queryRuleTypeDescription', {
  defaultMessage: 'Query'
});

exports.QUERY_TYPE_DESCRIPTION = QUERY_TYPE_DESCRIPTION;

var ML_JOB_STARTED = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDescription.mlJobStartedDescription', {
  defaultMessage: 'Started'
});

exports.ML_JOB_STARTED = ML_JOB_STARTED;

var ML_JOB_STOPPED = _i18n.i18n.translate('xpack.siem.detectionEngine.ruleDescription.mlJobStoppedDescription', {
  defaultMessage: 'Stopped'
});

exports.ML_JOB_STOPPED = ML_JOB_STOPPED;