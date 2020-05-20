"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SHOWING_CASES: true,
  ADDED_FIELD: true,
  CHANGED_FIELD: true,
  EDITED_FIELD: true,
  REMOVED_FIELD: true,
  VIEW_INCIDENT: true,
  PUSHED_NEW_INCIDENT: true,
  UPDATE_INCIDENT: true,
  ADDED_DESCRIPTION: true,
  EDIT_DESCRIPTION: true,
  QUOTE: true,
  EDIT_COMMENT: true,
  ON: true,
  ADDED_COMMENT: true,
  STATUS: true,
  CASE: true,
  COMMENT: true,
  CASE_OPENED: true,
  CASE_CLOSED: true,
  CASE_REFRESH: true,
  EMAIL_SUBJECT: true,
  EMAIL_BODY: true
};
exports.EMAIL_BODY = exports.EMAIL_SUBJECT = exports.CASE_REFRESH = exports.CASE_CLOSED = exports.CASE_OPENED = exports.COMMENT = exports.CASE = exports.STATUS = exports.ADDED_COMMENT = exports.ON = exports.EDIT_COMMENT = exports.QUOTE = exports.EDIT_DESCRIPTION = exports.ADDED_DESCRIPTION = exports.UPDATE_INCIDENT = exports.PUSHED_NEW_INCIDENT = exports.VIEW_INCIDENT = exports.REMOVED_FIELD = exports.EDITED_FIELD = exports.CHANGED_FIELD = exports.ADDED_FIELD = exports.SHOWING_CASES = void 0;

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
var SHOWING_CASES = function SHOWING_CASES(actionDate, actionName, userName) {
  return _i18n.i18n.translate('xpack.siem.case.caseView.actionHeadline', {
    values: {
      actionDate: actionDate,
      actionName: actionName,
      userName: userName
    },
    defaultMessage: '{userName} {actionName} on {actionDate}'
  });
};

exports.SHOWING_CASES = SHOWING_CASES;

var ADDED_FIELD = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.addedField', {
  defaultMessage: 'added'
});

exports.ADDED_FIELD = ADDED_FIELD;

var CHANGED_FIELD = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.changededField', {
  defaultMessage: 'changed'
});

exports.CHANGED_FIELD = CHANGED_FIELD;

var EDITED_FIELD = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.editedField', {
  defaultMessage: 'edited'
});

exports.EDITED_FIELD = EDITED_FIELD;

var REMOVED_FIELD = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.removedField', {
  defaultMessage: 'removed'
});

exports.REMOVED_FIELD = REMOVED_FIELD;

var VIEW_INCIDENT = function VIEW_INCIDENT(incidentNumber) {
  return _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.viewIncident', {
    defaultMessage: 'View {incidentNumber}',
    values: {
      incidentNumber: incidentNumber
    }
  });
};

exports.VIEW_INCIDENT = VIEW_INCIDENT;

var PUSHED_NEW_INCIDENT = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.pushedNewIncident', {
  defaultMessage: 'pushed as new incident'
});

exports.PUSHED_NEW_INCIDENT = PUSHED_NEW_INCIDENT;

var UPDATE_INCIDENT = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.updateIncident', {
  defaultMessage: 'updated incident'
});

exports.UPDATE_INCIDENT = UPDATE_INCIDENT;

var ADDED_DESCRIPTION = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.addDescription', {
  defaultMessage: 'added description'
});

exports.ADDED_DESCRIPTION = ADDED_DESCRIPTION;

var EDIT_DESCRIPTION = _i18n.i18n.translate('xpack.siem.case.caseView.edit.description', {
  defaultMessage: 'Edit description'
});

exports.EDIT_DESCRIPTION = EDIT_DESCRIPTION;

var QUOTE = _i18n.i18n.translate('xpack.siem.case.caseView.edit.quote', {
  defaultMessage: 'Quote'
});

exports.QUOTE = QUOTE;

var EDIT_COMMENT = _i18n.i18n.translate('xpack.siem.case.caseView.edit.comment', {
  defaultMessage: 'Edit comment'
});

exports.EDIT_COMMENT = EDIT_COMMENT;

var ON = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.on', {
  defaultMessage: 'on'
});

exports.ON = ON;

var ADDED_COMMENT = _i18n.i18n.translate('xpack.siem.case.caseView.actionLabel.addComment', {
  defaultMessage: 'added comment'
});

exports.ADDED_COMMENT = ADDED_COMMENT;

var STATUS = _i18n.i18n.translate('xpack.siem.case.caseView.statusLabel', {
  defaultMessage: 'Status'
});

exports.STATUS = STATUS;

var CASE = _i18n.i18n.translate('xpack.siem.case.caseView.case', {
  defaultMessage: 'case'
});

exports.CASE = CASE;

var COMMENT = _i18n.i18n.translate('xpack.siem.case.caseView.comment', {
  defaultMessage: 'comment'
});

exports.COMMENT = COMMENT;

var CASE_OPENED = _i18n.i18n.translate('xpack.siem.case.caseView.caseOpened', {
  defaultMessage: 'Case opened'
});

exports.CASE_OPENED = CASE_OPENED;

var CASE_CLOSED = _i18n.i18n.translate('xpack.siem.case.caseView.caseClosed', {
  defaultMessage: 'Case closed'
});

exports.CASE_CLOSED = CASE_CLOSED;

var CASE_REFRESH = _i18n.i18n.translate('xpack.siem.case.caseView.caseRefresh', {
  defaultMessage: 'Refresh case'
});

exports.CASE_REFRESH = CASE_REFRESH;

var EMAIL_SUBJECT = function EMAIL_SUBJECT(caseTitle) {
  return _i18n.i18n.translate('xpack.siem.case.caseView.emailSubject', {
    values: {
      caseTitle: caseTitle
    },
    defaultMessage: 'SIEM Case - {caseTitle}'
  });
};

exports.EMAIL_SUBJECT = EMAIL_SUBJECT;

var EMAIL_BODY = function EMAIL_BODY(caseUrl) {
  return _i18n.i18n.translate('xpack.siem.case.caseView.emailBody', {
    values: {
      caseUrl: caseUrl
    },
    defaultMessage: 'Case reference: {caseUrl}'
  });
};

exports.EMAIL_BODY = EMAIL_BODY;