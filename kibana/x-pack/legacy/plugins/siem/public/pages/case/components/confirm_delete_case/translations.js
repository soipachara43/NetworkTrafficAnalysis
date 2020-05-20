"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  DELETE_TITLE: true,
  CONFIRM_QUESTION: true,
  DELETE_SELECTED_CASES: true,
  CONFIRM_QUESTION_PLURAL: true
};
exports.CONFIRM_QUESTION_PLURAL = exports.DELETE_SELECTED_CASES = exports.CONFIRM_QUESTION = exports.DELETE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

var _translations = require("../../translations");

Object.keys(_translations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _translations[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DELETE_TITLE = function DELETE_TITLE(caseTitle) {
  return _i18n.i18n.translate('xpack.siem.case.confirmDeleteCase.deleteTitle', {
    values: {
      caseTitle: caseTitle
    },
    defaultMessage: 'Delete "{caseTitle}"'
  });
};

exports.DELETE_TITLE = DELETE_TITLE;

var CONFIRM_QUESTION = _i18n.i18n.translate('xpack.siem.case.confirmDeleteCase.confirmQuestion', {
  defaultMessage: 'By deleting this case, all related case data will be permanently removed and you will no longer be able to push data to a third-party case management system. Are you sure you wish to proceed?'
});

exports.CONFIRM_QUESTION = CONFIRM_QUESTION;

var DELETE_SELECTED_CASES = _i18n.i18n.translate('xpack.siem.case.confirmDeleteCase.selectedCases', {
  defaultMessage: 'Delete selected cases'
});

exports.DELETE_SELECTED_CASES = DELETE_SELECTED_CASES;

var CONFIRM_QUESTION_PLURAL = _i18n.i18n.translate('xpack.siem.case.confirmDeleteCase.confirmQuestionPlural', {
  defaultMessage: 'By deleting these cases, all related case data will be permanently removed and you will no longer be able to push data to a third-party case management system. Are you sure you wish to proceed?'
});

exports.CONFIRM_QUESTION_PLURAL = CONFIRM_QUESTION_PLURAL;