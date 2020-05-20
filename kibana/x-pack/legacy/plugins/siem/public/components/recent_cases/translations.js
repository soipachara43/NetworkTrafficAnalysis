"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_ALL_CASES = exports.START_A_NEW_CASE = exports.RECENTLY_CREATED_CASES = exports.NO_CASES = exports.MY_RECENTLY_REPORTED_CASES = exports.COMMENTS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var COMMENTS = _i18n.i18n.translate('xpack.siem.recentCases.commentsTooltip', {
  defaultMessage: 'Comments'
});

exports.COMMENTS = COMMENTS;

var MY_RECENTLY_REPORTED_CASES = _i18n.i18n.translate('xpack.siem.overview.myRecentlyReportedCasesButtonLabel', {
  defaultMessage: 'My recently reported cases'
});

exports.MY_RECENTLY_REPORTED_CASES = MY_RECENTLY_REPORTED_CASES;

var NO_CASES = _i18n.i18n.translate('xpack.siem.recentCases.noCasesMessage', {
  defaultMessage: 'No cases have been created yet. Put your detective hat on and'
});

exports.NO_CASES = NO_CASES;

var RECENTLY_CREATED_CASES = _i18n.i18n.translate('xpack.siem.overview.recentlyCreatedCasesButtonLabel', {
  defaultMessage: 'Recently created cases'
});

exports.RECENTLY_CREATED_CASES = RECENTLY_CREATED_CASES;

var START_A_NEW_CASE = _i18n.i18n.translate('xpack.siem.recentCases.startNewCaseLink', {
  defaultMessage: 'start a new case'
});

exports.START_A_NEW_CASE = START_A_NEW_CASE;

var VIEW_ALL_CASES = _i18n.i18n.translate('xpack.siem.recentCases.viewAllCasesLink', {
  defaultMessage: 'View all cases'
});

exports.VIEW_ALL_CASES = VIEW_ALL_CASES;