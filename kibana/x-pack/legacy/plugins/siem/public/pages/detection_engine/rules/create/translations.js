"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUCCESSFULLY_CREATED_RULES = exports.EDIT_RULE = exports.BACK_TO_RULES = exports.PAGE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.pageTitle', {
  defaultMessage: 'Create new rule'
});

exports.PAGE_TITLE = PAGE_TITLE;

var BACK_TO_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.backToRulesDescription', {
  defaultMessage: 'Back to signal detection rules'
});

exports.BACK_TO_RULES = BACK_TO_RULES;

var EDIT_RULE = _i18n.i18n.translate('xpack.siem.detectionEngine.createRule.editRuleButton', {
  defaultMessage: 'Edit'
});

exports.EDIT_RULE = EDIT_RULE;

var SUCCESSFULLY_CREATED_RULES = function SUCCESSFULLY_CREATED_RULES(ruleName) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.create.successfullyCreatedRuleTitle', {
    values: {
      ruleName: ruleName
    },
    defaultMessage: '{ruleName} was created'
  });
};

exports.SUCCESSFULLY_CREATED_RULES = SUCCESSFULLY_CREATED_RULES;