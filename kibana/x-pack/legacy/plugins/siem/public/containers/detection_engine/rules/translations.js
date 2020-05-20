"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TAG_FETCH_FAILURE = exports.RULE_PREPACKAGED_SUCCESS = exports.RULE_PREPACKAGED_FAILURE = exports.RULE_ADD_FAILURE = exports.RULE_FETCH_FAILURE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RULE_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.rules', {
  defaultMessage: 'Failed to fetch Rules'
});

exports.RULE_FETCH_FAILURE = RULE_FETCH_FAILURE;

var RULE_ADD_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.addRuleFailDescription', {
  defaultMessage: 'Failed to add Rule'
});

exports.RULE_ADD_FAILURE = RULE_ADD_FAILURE;

var RULE_PREPACKAGED_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.createPrePackagedRuleFailDescription', {
  defaultMessage: 'Failed to installed pre-packaged rules from elastic'
});

exports.RULE_PREPACKAGED_FAILURE = RULE_PREPACKAGED_FAILURE;

var RULE_PREPACKAGED_SUCCESS = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.createPrePackagedRuleSuccesDescription', {
  defaultMessage: 'Installed pre-packaged rules from elastic'
});

exports.RULE_PREPACKAGED_SUCCESS = RULE_PREPACKAGED_SUCCESS;

var TAG_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.containers.detectionEngine.tagFetchFailDescription', {
  defaultMessage: 'Failed to fetch Tags'
});

exports.TAG_FETCH_FAILURE = TAG_FETCH_FAILURE;