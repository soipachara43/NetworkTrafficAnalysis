"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADD_RULE_NOTE_HELP_TEXT = exports.URL_FORMAT_INVALID = exports.CUSTOM_MITRE_ATTACK_TECHNIQUES_REQUIRED = exports.CRITICAL = exports.HIGH = exports.MEDIUM = exports.LOW = exports.ADD_FALSE_POSITIVE = exports.ADD_REFERENCE = exports.ADVANCED_SETTINGS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ADVANCED_SETTINGS = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.advancedSettingsButton', {
  defaultMessage: 'Advanced settings'
});

exports.ADVANCED_SETTINGS = ADVANCED_SETTINGS;

var ADD_REFERENCE = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.addReferenceDescription', {
  defaultMessage: 'Add reference URL'
});

exports.ADD_REFERENCE = ADD_REFERENCE;

var ADD_FALSE_POSITIVE = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.addFalsePositiveDescription', {
  defaultMessage: 'Add false positive example'
});

exports.ADD_FALSE_POSITIVE = ADD_FALSE_POSITIVE;

var LOW = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.severityOptionLowDescription', {
  defaultMessage: 'Low'
});

exports.LOW = LOW;

var MEDIUM = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.severityOptionMediumDescription', {
  defaultMessage: 'Medium'
});

exports.MEDIUM = MEDIUM;

var HIGH = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.severityOptionHighDescription', {
  defaultMessage: 'High'
});

exports.HIGH = HIGH;

var CRITICAL = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutRuleForm.severityOptionCriticalDescription', {
  defaultMessage: 'Critical'
});

exports.CRITICAL = CRITICAL;

var CUSTOM_MITRE_ATTACK_TECHNIQUES_REQUIRED = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.customMitreAttackTechniquesFieldRequiredError', {
  defaultMessage: 'At least one Technique is required with a Tactic.'
});

exports.CUSTOM_MITRE_ATTACK_TECHNIQUES_REQUIRED = CUSTOM_MITRE_ATTACK_TECHNIQUES_REQUIRED;

var URL_FORMAT_INVALID = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepDefineRule.referencesUrlInvalidError', {
  defaultMessage: 'Url is invalid format'
});

exports.URL_FORMAT_INVALID = URL_FORMAT_INVALID;

var ADD_RULE_NOTE_HELP_TEXT = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.stepAboutrule.noteHelpText', {
  defaultMessage: 'Add rule investigation guide...'
});

exports.ADD_RULE_NOTE_HELP_TEXT = ADD_RULE_NOTE_HELP_TEXT;