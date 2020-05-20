"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUCCESSFULLY_SAVED_RULE = exports.BACK_TO = exports.SORRY_ERRORS = exports.SAVE_CHANGES = exports.CANCEL = exports.PAGE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.editRule.pageTitle', {
  defaultMessage: 'Edit rule settings'
});

exports.PAGE_TITLE = PAGE_TITLE;

var CANCEL = _i18n.i18n.translate('xpack.siem.detectionEngine.editRule.cancelTitle', {
  defaultMessage: 'Cancel'
});

exports.CANCEL = CANCEL;

var SAVE_CHANGES = _i18n.i18n.translate('xpack.siem.detectionEngine.editRule.saveChangeTitle', {
  defaultMessage: 'Save changes'
});

exports.SAVE_CHANGES = SAVE_CHANGES;

var SORRY_ERRORS = _i18n.i18n.translate('xpack.siem.detectionEngine.editRule.errorMsgDescription', {
  defaultMessage: 'Sorry'
});

exports.SORRY_ERRORS = SORRY_ERRORS;

var BACK_TO = _i18n.i18n.translate('xpack.siem.detectionEngine.editRule.backToDescription', {
  defaultMessage: 'Back to'
});

exports.BACK_TO = BACK_TO;

var SUCCESSFULLY_SAVED_RULE = function SUCCESSFULLY_SAVED_RULE(ruleName) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.rules.update.successfullySavedRuleTitle', {
    values: {
      ruleName: ruleName
    },
    defaultMessage: '{ruleName} was saved'
  });
};

exports.SUCCESSFULLY_SAVED_RULE = SUCCESSFULLY_SAVED_RULE;