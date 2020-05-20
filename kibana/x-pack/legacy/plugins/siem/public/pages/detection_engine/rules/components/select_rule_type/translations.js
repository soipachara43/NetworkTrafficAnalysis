"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ML_TYPE_DESCRIPTION = exports.ML_TYPE_TITLE = exports.QUERY_TYPE_DESCRIPTION = exports.QUERY_TYPE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var QUERY_TYPE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.ruleTypeField.queryTypeTitle', {
  defaultMessage: 'Custom query'
});

exports.QUERY_TYPE_TITLE = QUERY_TYPE_TITLE;

var QUERY_TYPE_DESCRIPTION = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.ruleTypeField.queryTypeDescription', {
  defaultMessage: 'Use KQL or Lucene to detect issues across indices.'
});

exports.QUERY_TYPE_DESCRIPTION = QUERY_TYPE_DESCRIPTION;

var ML_TYPE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.ruleTypeField.mlTypeTitle', {
  defaultMessage: 'Machine Learning'
});

exports.ML_TYPE_TITLE = ML_TYPE_TITLE;

var ML_TYPE_DESCRIPTION = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.ruleTypeField.mlTypeDescription', {
  defaultMessage: 'Select ML job to detect anomalous activity.'
});

exports.ML_TYPE_DESCRIPTION = ML_TYPE_DESCRIPTION;