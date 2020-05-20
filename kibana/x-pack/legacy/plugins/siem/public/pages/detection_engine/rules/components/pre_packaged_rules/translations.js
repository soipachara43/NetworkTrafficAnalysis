"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RELEASE_NOTES_HELP = exports.UPDATE_PREPACKAGED_RULES = exports.UPDATE_PREPACKAGED_RULES_MSG = exports.UPDATE_PREPACKAGED_RULES_TITLE = exports.CREATE_RULE_ACTION = exports.PRE_BUILT_ACTION = exports.PRE_BUILT_MSG = exports.PRE_BUILT_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PRE_BUILT_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.prePackagedRules.emptyPromptTitle', {
  defaultMessage: 'Load Elastic prebuilt detection rules'
});

exports.PRE_BUILT_TITLE = PRE_BUILT_TITLE;

var PRE_BUILT_MSG = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.prePackagedRules.emptyPromptMessage', {
  defaultMessage: 'Elastic SIEM comes with prebuilt detection rules that run in the background and create signals when their conditions are met. By default, all prebuilt rules are disabled and you select which rules you want to activate.'
});

exports.PRE_BUILT_MSG = PRE_BUILT_MSG;

var PRE_BUILT_ACTION = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.prePackagedRules.loadPreBuiltButton', {
  defaultMessage: 'Load prebuilt detection rules'
});

exports.PRE_BUILT_ACTION = PRE_BUILT_ACTION;

var CREATE_RULE_ACTION = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.prePackagedRules.createOwnRuletButton', {
  defaultMessage: 'Create your own rules'
});

exports.CREATE_RULE_ACTION = CREATE_RULE_ACTION;

var UPDATE_PREPACKAGED_RULES_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.updatePrePackagedRulesTitle', {
  defaultMessage: 'Update available for Elastic prebuilt rules'
});

exports.UPDATE_PREPACKAGED_RULES_TITLE = UPDATE_PREPACKAGED_RULES_TITLE;

var UPDATE_PREPACKAGED_RULES_MSG = function UPDATE_PREPACKAGED_RULES_MSG(updateRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.updatePrePackagedRulesMsg', {
    values: {
      updateRules: updateRules
    },
    defaultMessage: 'You can update {updateRules} Elastic prebuilt {updateRules, plural, =1 {rule} other {rules}}. Note that this will reload deleted Elastic prebuilt rules.'
  });
};

exports.UPDATE_PREPACKAGED_RULES_MSG = UPDATE_PREPACKAGED_RULES_MSG;

var UPDATE_PREPACKAGED_RULES = function UPDATE_PREPACKAGED_RULES(updateRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.updatePrePackagedRulesButton', {
    values: {
      updateRules: updateRules
    },
    defaultMessage: 'Update {updateRules} Elastic prebuilt {updateRules, plural, =1 {rule} other {rules}} '
  });
};

exports.UPDATE_PREPACKAGED_RULES = UPDATE_PREPACKAGED_RULES;

var RELEASE_NOTES_HELP = _i18n.i18n.translate('xpack.siem.detectionEngine.rules.releaseNotesHelp', {
  defaultMessage: 'Release notes'
});

exports.RELEASE_NOTES_HELP = RELEASE_NOTES_HELP;