"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NO_CASES: true,
  NO_CASES_BODY: true,
  ADD_NEW_CASE: true,
  SHOWING_SELECTED_CASES: true,
  SHOWING_CASES: true,
  UNIT: true,
  SEARCH_CASES: true,
  BULK_ACTIONS: true,
  SEARCH_PLACEHOLDER: true,
  OPEN_CASES: true,
  CLOSED_CASES: true,
  CLOSED: true,
  DELETE: true,
  REQUIRES_UPDATE: true,
  UP_TO_DATE: true,
  NOT_PUSHED: true,
  REFRESH: true,
  SERVICENOW_LINK_ARIA: true
};
exports.SERVICENOW_LINK_ARIA = exports.REFRESH = exports.NOT_PUSHED = exports.UP_TO_DATE = exports.REQUIRES_UPDATE = exports.DELETE = exports.CLOSED = exports.CLOSED_CASES = exports.OPEN_CASES = exports.SEARCH_PLACEHOLDER = exports.BULK_ACTIONS = exports.SEARCH_CASES = exports.UNIT = exports.SHOWING_CASES = exports.SHOWING_SELECTED_CASES = exports.ADD_NEW_CASE = exports.NO_CASES_BODY = exports.NO_CASES = void 0;

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
var NO_CASES = _i18n.i18n.translate('xpack.siem.case.caseTable.noCases.title', {
  defaultMessage: 'No Cases'
});

exports.NO_CASES = NO_CASES;

var NO_CASES_BODY = _i18n.i18n.translate('xpack.siem.case.caseTable.noCases.body', {
  defaultMessage: 'There are no cases to display. Please create a new case or change your filter settings above.'
});

exports.NO_CASES_BODY = NO_CASES_BODY;

var ADD_NEW_CASE = _i18n.i18n.translate('xpack.siem.case.caseTable.addNewCase', {
  defaultMessage: 'Add New Case'
});

exports.ADD_NEW_CASE = ADD_NEW_CASE;

var SHOWING_SELECTED_CASES = function SHOWING_SELECTED_CASES(totalRules) {
  return _i18n.i18n.translate('xpack.siem.case.caseTable.selectedCasesTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Selected {totalRules} {totalRules, plural, =1 {case} other {cases}}'
  });
};

exports.SHOWING_SELECTED_CASES = SHOWING_SELECTED_CASES;

var SHOWING_CASES = function SHOWING_CASES(totalRules) {
  return _i18n.i18n.translate('xpack.siem.case.caseTable.showingCasesTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: 'Showing {totalRules} {totalRules, plural, =1 {case} other {cases}}'
  });
};

exports.SHOWING_CASES = SHOWING_CASES;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.case.caseTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {case} other {cases}}"
  });
};

exports.UNIT = UNIT;

var SEARCH_CASES = _i18n.i18n.translate('xpack.siem.case.caseTable.searchAriaLabel', {
  defaultMessage: 'Search cases'
});

exports.SEARCH_CASES = SEARCH_CASES;

var BULK_ACTIONS = _i18n.i18n.translate('xpack.siem.case.caseTable.bulkActions', {
  defaultMessage: 'Bulk actions'
});

exports.BULK_ACTIONS = BULK_ACTIONS;

var SEARCH_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.case.caseTable.searchPlaceholder', {
  defaultMessage: 'e.g. case name'
});

exports.SEARCH_PLACEHOLDER = SEARCH_PLACEHOLDER;

var OPEN_CASES = _i18n.i18n.translate('xpack.siem.case.caseTable.openCases', {
  defaultMessage: 'Open cases'
});

exports.OPEN_CASES = OPEN_CASES;

var CLOSED_CASES = _i18n.i18n.translate('xpack.siem.case.caseTable.closedCases', {
  defaultMessage: 'Closed cases'
});

exports.CLOSED_CASES = CLOSED_CASES;

var CLOSED = _i18n.i18n.translate('xpack.siem.case.caseTable.closed', {
  defaultMessage: 'Closed'
});

exports.CLOSED = CLOSED;

var DELETE = _i18n.i18n.translate('xpack.siem.case.caseTable.delete', {
  defaultMessage: 'Delete'
});

exports.DELETE = DELETE;

var REQUIRES_UPDATE = _i18n.i18n.translate('xpack.siem.case.caseTable.requiresUpdate', {
  defaultMessage: ' requires update'
});

exports.REQUIRES_UPDATE = REQUIRES_UPDATE;

var UP_TO_DATE = _i18n.i18n.translate('xpack.siem.case.caseTable.upToDate', {
  defaultMessage: ' is up to date'
});

exports.UP_TO_DATE = UP_TO_DATE;

var NOT_PUSHED = _i18n.i18n.translate('xpack.siem.case.caseTable.notPushed', {
  defaultMessage: 'Not pushed'
});

exports.NOT_PUSHED = NOT_PUSHED;

var REFRESH = _i18n.i18n.translate('xpack.siem.case.caseTable.refreshTitle', {
  defaultMessage: 'Refresh'
});

exports.REFRESH = REFRESH;

var SERVICENOW_LINK_ARIA = _i18n.i18n.translate('xpack.siem.case.caseTable.serviceNowLinkAria', {
  defaultMessage: 'click to view the incident on servicenow'
});

exports.SERVICENOW_LINK_ARIA = SERVICENOW_LINK_ARIA;