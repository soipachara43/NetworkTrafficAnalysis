"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_PUSH_TO_SERVICE = exports.SUCCESS_SEND_TO_EXTERNAL_SERVICE = exports.TAG_FETCH_FAILURE = exports.REOPENED_CASES = exports.CLOSED_CASES = exports.DELETED_CASES = exports.UPDATED_CASE = exports.ERROR_DELETING = exports.ERROR_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ERROR_TITLE = _i18n.i18n.translate('xpack.siem.containers.case.errorTitle', {
  defaultMessage: 'Error fetching data'
});

exports.ERROR_TITLE = ERROR_TITLE;

var ERROR_DELETING = _i18n.i18n.translate('xpack.siem.containers.case.errorDeletingTitle', {
  defaultMessage: 'Error deleting data'
});

exports.ERROR_DELETING = ERROR_DELETING;

var UPDATED_CASE = function UPDATED_CASE(caseTitle) {
  return _i18n.i18n.translate('xpack.siem.containers.case.updatedCase', {
    values: {
      caseTitle: caseTitle
    },
    defaultMessage: 'Updated "{caseTitle}"'
  });
};

exports.UPDATED_CASE = UPDATED_CASE;

var DELETED_CASES = function DELETED_CASES(totalCases, caseTitle) {
  return _i18n.i18n.translate('xpack.siem.containers.case.deletedCases', {
    values: {
      caseTitle: caseTitle,
      totalCases: totalCases
    },
    defaultMessage: 'Deleted {totalCases, plural, =1 {"{caseTitle}"} other {{totalCases} cases}}'
  });
};

exports.DELETED_CASES = DELETED_CASES;

var CLOSED_CASES = function CLOSED_CASES(_ref) {
  var totalCases = _ref.totalCases,
      caseTitle = _ref.caseTitle;
  return _i18n.i18n.translate('xpack.siem.containers.case.closedCases', {
    values: {
      caseTitle: caseTitle,
      totalCases: totalCases
    },
    defaultMessage: 'Closed {totalCases, plural, =1 {"{caseTitle}"} other {{totalCases} cases}}'
  });
};

exports.CLOSED_CASES = CLOSED_CASES;

var REOPENED_CASES = function REOPENED_CASES(_ref2) {
  var totalCases = _ref2.totalCases,
      caseTitle = _ref2.caseTitle;
  return _i18n.i18n.translate('xpack.siem.containers.case.reopenedCases', {
    values: {
      caseTitle: caseTitle,
      totalCases: totalCases
    },
    defaultMessage: 'Reopened {totalCases, plural, =1 {"{caseTitle}"} other {{totalCases} cases}}'
  });
};

exports.REOPENED_CASES = REOPENED_CASES;

var TAG_FETCH_FAILURE = _i18n.i18n.translate('xpack.siem.containers.case.tagFetchFailDescription', {
  defaultMessage: 'Failed to fetch Tags'
});

exports.TAG_FETCH_FAILURE = TAG_FETCH_FAILURE;

var SUCCESS_SEND_TO_EXTERNAL_SERVICE = _i18n.i18n.translate('xpack.siem.containers.case.pushToExterService', {
  defaultMessage: 'Successfully sent to ServiceNow'
});

exports.SUCCESS_SEND_TO_EXTERNAL_SERVICE = SUCCESS_SEND_TO_EXTERNAL_SERVICE;

var ERROR_PUSH_TO_SERVICE = _i18n.i18n.translate('xpack.siem.case.configure.errorPushingToService', {
  defaultMessage: 'Error pushing to service'
});

exports.ERROR_PUSH_TO_SERVICE = ERROR_PUSH_TO_SERVICE;