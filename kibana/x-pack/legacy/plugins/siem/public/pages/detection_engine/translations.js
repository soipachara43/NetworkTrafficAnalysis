"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ML_RULES_UNAVAILABLE = exports.ML_RULES_DISABLED_MESSAGE = exports.USER_UNAUTHENTICATED_MSG_BODY = exports.USER_UNAUTHENTICATED_TITLE = exports.GO_TO_DOCUMENTATION = exports.NO_INDEX_MSG_BODY = exports.NO_INDEX_TITLE = exports.EMPTY_ACTION_SECONDARY = exports.EMPTY_ACTION_PRIMARY = exports.EMPTY_TITLE = exports.PANEL_SUBTITLE_SHOWING = exports.BUTTON_MANAGE_RULES = exports.ALERT = exports.SIGNAL = exports.TOTAL_SIGNAL = exports.LAST_SIGNAL = exports.PAGE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.detectionsPageTitle', {
  defaultMessage: 'Detections'
});

exports.PAGE_TITLE = PAGE_TITLE;

var LAST_SIGNAL = _i18n.i18n.translate('xpack.siem.detectionEngine.lastSignalTitle', {
  defaultMessage: 'Last signal'
});

exports.LAST_SIGNAL = LAST_SIGNAL;

var TOTAL_SIGNAL = _i18n.i18n.translate('xpack.siem.detectionEngine.totalSignalTitle', {
  defaultMessage: 'Total'
});

exports.TOTAL_SIGNAL = TOTAL_SIGNAL;

var SIGNAL = _i18n.i18n.translate('xpack.siem.detectionEngine.signalTitle', {
  defaultMessage: 'Detected signals'
});

exports.SIGNAL = SIGNAL;

var ALERT = _i18n.i18n.translate('xpack.siem.detectionEngine.alertTitle', {
  defaultMessage: 'External alerts'
});

exports.ALERT = ALERT;

var BUTTON_MANAGE_RULES = _i18n.i18n.translate('xpack.siem.detectionEngine.buttonManageRules', {
  defaultMessage: 'Manage signal detection rules'
});

exports.BUTTON_MANAGE_RULES = BUTTON_MANAGE_RULES;

var PANEL_SUBTITLE_SHOWING = _i18n.i18n.translate('xpack.siem.detectionEngine.panelSubtitleShowing', {
  defaultMessage: 'Showing'
});

exports.PANEL_SUBTITLE_SHOWING = PANEL_SUBTITLE_SHOWING;

var EMPTY_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.emptyTitle', {
  defaultMessage: 'It looks like you don’t have any indices relevant to the detection engine in the SIEM application'
});

exports.EMPTY_TITLE = EMPTY_TITLE;

var EMPTY_ACTION_PRIMARY = _i18n.i18n.translate('xpack.siem.detectionEngine.emptyActionPrimary', {
  defaultMessage: 'View setup instructions'
});

exports.EMPTY_ACTION_PRIMARY = EMPTY_ACTION_PRIMARY;

var EMPTY_ACTION_SECONDARY = _i18n.i18n.translate('xpack.siem.detectionEngine.emptyActionSecondary', {
  defaultMessage: 'Go to documentation'
});

exports.EMPTY_ACTION_SECONDARY = EMPTY_ACTION_SECONDARY;

var NO_INDEX_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.noIndexTitle', {
  defaultMessage: 'Let’s set up your detection engine'
});

exports.NO_INDEX_TITLE = NO_INDEX_TITLE;

var NO_INDEX_MSG_BODY = _i18n.i18n.translate('xpack.siem.detectionEngine.noIndexMsgBody', {
  defaultMessage: 'To use the detection engine, a user with the required cluster and index privileges must first access this page. For more help, contact your administrator.'
});

exports.NO_INDEX_MSG_BODY = NO_INDEX_MSG_BODY;

var GO_TO_DOCUMENTATION = _i18n.i18n.translate('xpack.siem.detectionEngine.goToDocumentationButton', {
  defaultMessage: 'View documentation'
});

exports.GO_TO_DOCUMENTATION = GO_TO_DOCUMENTATION;

var USER_UNAUTHENTICATED_TITLE = _i18n.i18n.translate('xpack.siem.detectionEngine.userUnauthenticatedTitle', {
  defaultMessage: 'Detection engine permissions required'
});

exports.USER_UNAUTHENTICATED_TITLE = USER_UNAUTHENTICATED_TITLE;

var USER_UNAUTHENTICATED_MSG_BODY = _i18n.i18n.translate('xpack.siem.detectionEngine.userUnauthenticatedMsgBody', {
  defaultMessage: 'You do not have the required permissions for viewing the detection engine. For more help, contact your administrator.'
});

exports.USER_UNAUTHENTICATED_MSG_BODY = USER_UNAUTHENTICATED_MSG_BODY;

var ML_RULES_DISABLED_MESSAGE = _i18n.i18n.translate('xpack.siem.detectionEngine.mlRulesDisabledMessageTitle', {
  defaultMessage: 'ML rules require Platinum License and ML Admin Permissions'
});

exports.ML_RULES_DISABLED_MESSAGE = ML_RULES_DISABLED_MESSAGE;

var ML_RULES_UNAVAILABLE = function ML_RULES_UNAVAILABLE(totalRules) {
  return _i18n.i18n.translate('xpack.siem.detectionEngine.mlUnavailableTitle', {
    values: {
      totalRules: totalRules
    },
    defaultMessage: '{totalRules} {totalRules, plural, =1 {rule requires} other {rules require}} Machine Learning to enable.'
  });
};

exports.ML_RULES_UNAVAILABLE = ML_RULES_UNAVAILABLE;