"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GO_TO_DOCUMENTATION = exports.SAVE = exports.ADD_COMMENT_HELP_TEXT = exports.ADD_COMMENT = exports.CONFIGURE_CASES_BUTTON = exports.CONFIGURE_CASES_PAGE_TITLE = exports.TITLE_REQUIRED = exports.NO_TAGS = exports.TAGS_HELP = exports.COMMENTS = exports.NO_REPORTERS_AVAILABLE = exports.NO_TAGS_AVAILABLE = exports.TAGS = exports.TO = exports.CASE_NAME = exports.REOPENED_CASE = exports.REOPEN_CASE = exports.CLOSE_CASE = exports.CLOSED_CASE = exports.CREATE_CASE = exports.PAGE_TITLE = exports.OPTIONAL = exports.EDIT = exports.REQUIRED_FIELD = exports.COMMENT_REQUIRED = exports.DESCRIPTION_REQUIRED = exports.DESCRIPTION = exports.CREATE_TITLE = exports.CREATE_BC_TITLE = exports.PARTICIPANTS = exports.REPORTER = exports.CLOSED_ON = exports.OPENED_ON = exports.NAME = exports.DELETE_CASES = exports.DELETE_CASE = exports.CANCEL = exports.BACK_TO_ALL = exports.SAVED_OBJECT_NO_PERMISSIONS_MSG = exports.SAVED_OBJECT_NO_PERMISSIONS_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SAVED_OBJECT_NO_PERMISSIONS_TITLE = _i18n.i18n.translate('xpack.siem.case.caseSavedObjectNoPermissionsTitle', {
  defaultMessage: 'Kibana feature privileges required'
});

exports.SAVED_OBJECT_NO_PERMISSIONS_TITLE = SAVED_OBJECT_NO_PERMISSIONS_TITLE;

var SAVED_OBJECT_NO_PERMISSIONS_MSG = _i18n.i18n.translate('xpack.siem.case.caseSavedObjectNoPermissionsMessage', {
  defaultMessage: 'To view cases, you must have privileges for the Saved Object Management feature in the Kibana space. For more information, contact your Kibana administrator.'
});

exports.SAVED_OBJECT_NO_PERMISSIONS_MSG = SAVED_OBJECT_NO_PERMISSIONS_MSG;

var BACK_TO_ALL = _i18n.i18n.translate('xpack.siem.case.caseView.backLabel', {
  defaultMessage: 'Back to cases'
});

exports.BACK_TO_ALL = BACK_TO_ALL;

var CANCEL = _i18n.i18n.translate('xpack.siem.case.caseView.cancel', {
  defaultMessage: 'Cancel'
});

exports.CANCEL = CANCEL;

var DELETE_CASE = _i18n.i18n.translate('xpack.siem.case.confirmDeleteCase.deleteCase', {
  defaultMessage: 'Delete case'
});

exports.DELETE_CASE = DELETE_CASE;

var DELETE_CASES = _i18n.i18n.translate('xpack.siem.case.confirmDeleteCase.deleteCases', {
  defaultMessage: 'Delete cases'
});

exports.DELETE_CASES = DELETE_CASES;

var NAME = _i18n.i18n.translate('xpack.siem.case.caseView.name', {
  defaultMessage: 'Name'
});

exports.NAME = NAME;

var OPENED_ON = _i18n.i18n.translate('xpack.siem.case.caseView.openedOn', {
  defaultMessage: 'Opened on'
});

exports.OPENED_ON = OPENED_ON;

var CLOSED_ON = _i18n.i18n.translate('xpack.siem.case.caseView.closedOn', {
  defaultMessage: 'Closed on'
});

exports.CLOSED_ON = CLOSED_ON;

var REPORTER = _i18n.i18n.translate('xpack.siem.case.caseView.reporterLabel', {
  defaultMessage: 'Reporter'
});

exports.REPORTER = REPORTER;

var PARTICIPANTS = _i18n.i18n.translate('xpack.siem.case.caseView.particpantsLabel', {
  defaultMessage: 'Participants'
});

exports.PARTICIPANTS = PARTICIPANTS;

var CREATE_BC_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.breadcrumb', {
  defaultMessage: 'Create'
});

exports.CREATE_BC_TITLE = CREATE_BC_TITLE;

var CREATE_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.create', {
  defaultMessage: 'Create new case'
});

exports.CREATE_TITLE = CREATE_TITLE;

var DESCRIPTION = _i18n.i18n.translate('xpack.siem.case.caseView.description', {
  defaultMessage: 'Description'
});

exports.DESCRIPTION = DESCRIPTION;

var DESCRIPTION_REQUIRED = _i18n.i18n.translate('xpack.siem.case.createCase.descriptionFieldRequiredError', {
  defaultMessage: 'A description is required.'
});

exports.DESCRIPTION_REQUIRED = DESCRIPTION_REQUIRED;

var COMMENT_REQUIRED = _i18n.i18n.translate('xpack.siem.case.caseView.commentFieldRequiredError', {
  defaultMessage: 'A comment is required.'
});

exports.COMMENT_REQUIRED = COMMENT_REQUIRED;

var REQUIRED_FIELD = _i18n.i18n.translate('xpack.siem.case.caseView.fieldRequiredError', {
  defaultMessage: 'Required field'
});

exports.REQUIRED_FIELD = REQUIRED_FIELD;

var EDIT = _i18n.i18n.translate('xpack.siem.case.caseView.edit', {
  defaultMessage: 'Edit'
});

exports.EDIT = EDIT;

var OPTIONAL = _i18n.i18n.translate('xpack.siem.case.caseView.optional', {
  defaultMessage: 'Optional'
});

exports.OPTIONAL = OPTIONAL;

var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.case.pageTitle', {
  defaultMessage: 'Cases'
});

exports.PAGE_TITLE = PAGE_TITLE;

var CREATE_CASE = _i18n.i18n.translate('xpack.siem.case.caseView.createCase', {
  defaultMessage: 'Create case'
});

exports.CREATE_CASE = CREATE_CASE;

var CLOSED_CASE = _i18n.i18n.translate('xpack.siem.case.caseView.closedCase', {
  defaultMessage: 'Closed case'
});

exports.CLOSED_CASE = CLOSED_CASE;

var CLOSE_CASE = _i18n.i18n.translate('xpack.siem.case.caseView.closeCase', {
  defaultMessage: 'Close case'
});

exports.CLOSE_CASE = CLOSE_CASE;

var REOPEN_CASE = _i18n.i18n.translate('xpack.siem.case.caseView.reopenCase', {
  defaultMessage: 'Reopen case'
});

exports.REOPEN_CASE = REOPEN_CASE;

var REOPENED_CASE = _i18n.i18n.translate('xpack.siem.case.caseView.reopenedCase', {
  defaultMessage: 'Reopened case'
});

exports.REOPENED_CASE = REOPENED_CASE;

var CASE_NAME = _i18n.i18n.translate('xpack.siem.case.caseView.caseName', {
  defaultMessage: 'Case name'
});

exports.CASE_NAME = CASE_NAME;

var TO = _i18n.i18n.translate('xpack.siem.case.caseView.to', {
  defaultMessage: 'to'
});

exports.TO = TO;

var TAGS = _i18n.i18n.translate('xpack.siem.case.caseView.tags', {
  defaultMessage: 'Tags'
});

exports.TAGS = TAGS;

var NO_TAGS_AVAILABLE = _i18n.i18n.translate('xpack.siem.case.allCases.noTagsAvailable', {
  defaultMessage: 'No tags available'
});

exports.NO_TAGS_AVAILABLE = NO_TAGS_AVAILABLE;

var NO_REPORTERS_AVAILABLE = _i18n.i18n.translate('xpack.siem.case.caseView.noReportersAvailable', {
  defaultMessage: 'No reporters available.'
});

exports.NO_REPORTERS_AVAILABLE = NO_REPORTERS_AVAILABLE;

var COMMENTS = _i18n.i18n.translate('xpack.siem.case.allCases.comments', {
  defaultMessage: 'Comments'
});

exports.COMMENTS = COMMENTS;

var TAGS_HELP = _i18n.i18n.translate('xpack.siem.case.createCase.fieldTagsHelpText', {
  defaultMessage: 'Type one or more custom identifying tags for this case. Press enter after each tag to begin a new one.'
});

exports.TAGS_HELP = TAGS_HELP;

var NO_TAGS = _i18n.i18n.translate('xpack.siem.case.caseView.noTags', {
  defaultMessage: 'No tags are currently assigned to this case.'
});

exports.NO_TAGS = NO_TAGS;

var TITLE_REQUIRED = _i18n.i18n.translate('xpack.siem.case.createCase.titleFieldRequiredError', {
  defaultMessage: 'A title is required.'
});

exports.TITLE_REQUIRED = TITLE_REQUIRED;

var CONFIGURE_CASES_PAGE_TITLE = _i18n.i18n.translate('xpack.siem.case.configureCases.headerTitle', {
  defaultMessage: 'Configure cases'
});

exports.CONFIGURE_CASES_PAGE_TITLE = CONFIGURE_CASES_PAGE_TITLE;

var CONFIGURE_CASES_BUTTON = _i18n.i18n.translate('xpack.siem.case.configureCasesButton', {
  defaultMessage: 'Edit external connection'
});

exports.CONFIGURE_CASES_BUTTON = CONFIGURE_CASES_BUTTON;

var ADD_COMMENT = _i18n.i18n.translate('xpack.siem.case.caseView.comment.addComment', {
  defaultMessage: 'Add comment'
});

exports.ADD_COMMENT = ADD_COMMENT;

var ADD_COMMENT_HELP_TEXT = _i18n.i18n.translate('xpack.siem.case.caseView.comment.addCommentHelpText', {
  defaultMessage: 'Add a new comment...'
});

exports.ADD_COMMENT_HELP_TEXT = ADD_COMMENT_HELP_TEXT;

var SAVE = _i18n.i18n.translate('xpack.siem.case.caseView.description.save', {
  defaultMessage: 'Save'
});

exports.SAVE = SAVE;

var GO_TO_DOCUMENTATION = _i18n.i18n.translate('xpack.siem.case.caseView.goToDocumentationButton', {
  defaultMessage: 'View documentation'
});

exports.GO_TO_DOCUMENTATION = GO_TO_DOCUMENTATION;