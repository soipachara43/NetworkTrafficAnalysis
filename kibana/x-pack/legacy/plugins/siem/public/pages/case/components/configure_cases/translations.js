"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSAVED_CHANGES = exports.UPDATE_CONNECTOR = exports.FIELD_MAPPING_FIELD_COMMENTS = exports.FIELD_MAPPING_FIELD_DESC = exports.FIELD_MAPPING_FIELD_SHORT_DESC = exports.FIELD_MAPPING_FIELD_NOT_MAPPED = exports.WARNING_NO_CONNECTOR_MESSAGE = exports.WARNING_NO_CONNECTOR_TITLE = exports.SAVE_CHANGES = exports.CANCEL = exports.FIELD_MAPPING_EDIT_APPEND = exports.FIELD_MAPPING_EDIT_OVERWRITE = exports.FIELD_MAPPING_EDIT_NOTHING = exports.FIELD_MAPPING_THIRD_COL = exports.FIELD_MAPPING_SECOND_COL = exports.FIELD_MAPPING_FIRST_COL = exports.FIELD_MAPPING_DESC = exports.FIELD_MAPPING_TITLE = exports.CASE_CLOSURE_OPTIONS_CLOSED_INCIDENT = exports.CASE_CLOSURE_OPTIONS_NEW_INCIDENT = exports.CASE_CLOSURE_OPTIONS_MANUAL = exports.CASE_CLOSURE_OPTIONS_LABEL = exports.CASE_CLOSURE_OPTIONS_DESC = exports.CASE_CLOSURE_OPTIONS_TITLE = exports.ADD_NEW_CONNECTOR = exports.NO_CONNECTOR = exports.INCIDENT_MANAGEMENT_SYSTEM_LABEL = exports.INCIDENT_MANAGEMENT_SYSTEM_DESC = exports.INCIDENT_MANAGEMENT_SYSTEM_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INCIDENT_MANAGEMENT_SYSTEM_TITLE = _i18n.i18n.translate('xpack.siem.case.configureCases.incidentManagementSystemTitle', {
  defaultMessage: 'Connect to third-party incident management system'
});

exports.INCIDENT_MANAGEMENT_SYSTEM_TITLE = INCIDENT_MANAGEMENT_SYSTEM_TITLE;

var INCIDENT_MANAGEMENT_SYSTEM_DESC = _i18n.i18n.translate('xpack.siem.case.configureCases.incidentManagementSystemDesc', {
  defaultMessage: 'You may optionally connect SIEM cases to a third-party incident management system of your choosing. This will allow you to push case data as an incident in your chosen third-party system.'
});

exports.INCIDENT_MANAGEMENT_SYSTEM_DESC = INCIDENT_MANAGEMENT_SYSTEM_DESC;

var INCIDENT_MANAGEMENT_SYSTEM_LABEL = _i18n.i18n.translate('xpack.siem.case.configureCases.incidentManagementSystemLabel', {
  defaultMessage: 'Incident management system'
});

exports.INCIDENT_MANAGEMENT_SYSTEM_LABEL = INCIDENT_MANAGEMENT_SYSTEM_LABEL;

var NO_CONNECTOR = _i18n.i18n.translate('xpack.siem.case.configureCases.noConnector', {
  defaultMessage: 'No connector selected'
});

exports.NO_CONNECTOR = NO_CONNECTOR;

var ADD_NEW_CONNECTOR = _i18n.i18n.translate('xpack.siem.case.configureCases.addNewConnector', {
  defaultMessage: 'Add new connector option'
});

exports.ADD_NEW_CONNECTOR = ADD_NEW_CONNECTOR;

var CASE_CLOSURE_OPTIONS_TITLE = _i18n.i18n.translate('xpack.siem.case.configureCases.caseClosureOptionsTitle', {
  defaultMessage: 'Cases Closures'
});

exports.CASE_CLOSURE_OPTIONS_TITLE = CASE_CLOSURE_OPTIONS_TITLE;

var CASE_CLOSURE_OPTIONS_DESC = _i18n.i18n.translate('xpack.siem.case.configureCases.caseClosureOptionsDesc', {
  defaultMessage: 'Define how you wish SIEM cases to be closed. Automated case closures require an established connection to a third-party incident management system.'
});

exports.CASE_CLOSURE_OPTIONS_DESC = CASE_CLOSURE_OPTIONS_DESC;

var CASE_CLOSURE_OPTIONS_LABEL = _i18n.i18n.translate('xpack.siem.case.configureCases.caseClosureOptionsLabel', {
  defaultMessage: 'Case closure options'
});

exports.CASE_CLOSURE_OPTIONS_LABEL = CASE_CLOSURE_OPTIONS_LABEL;

var CASE_CLOSURE_OPTIONS_MANUAL = _i18n.i18n.translate('xpack.siem.case.configureCases.caseClosureOptionsManual', {
  defaultMessage: 'Manually close SIEM cases'
});

exports.CASE_CLOSURE_OPTIONS_MANUAL = CASE_CLOSURE_OPTIONS_MANUAL;

var CASE_CLOSURE_OPTIONS_NEW_INCIDENT = _i18n.i18n.translate('xpack.siem.case.configureCases.caseClosureOptionsNewIncident', {
  defaultMessage: 'Automatically close SIEM cases when pushing new incident to third-party'
});

exports.CASE_CLOSURE_OPTIONS_NEW_INCIDENT = CASE_CLOSURE_OPTIONS_NEW_INCIDENT;

var CASE_CLOSURE_OPTIONS_CLOSED_INCIDENT = _i18n.i18n.translate('xpack.siem.case.configureCases.caseClosureOptionsClosedIncident', {
  defaultMessage: 'Automatically close SIEM cases when incident is closed in third-party'
});

exports.CASE_CLOSURE_OPTIONS_CLOSED_INCIDENT = CASE_CLOSURE_OPTIONS_CLOSED_INCIDENT;

var FIELD_MAPPING_TITLE = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingTitle', {
  defaultMessage: 'Field mappings'
});

exports.FIELD_MAPPING_TITLE = FIELD_MAPPING_TITLE;

var FIELD_MAPPING_DESC = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingDesc', {
  defaultMessage: 'Map SIEM case fields when pushing data to a third-party. Field mappings require an established connection to a third-party incident management system.'
});

exports.FIELD_MAPPING_DESC = FIELD_MAPPING_DESC;

var FIELD_MAPPING_FIRST_COL = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingFirstCol', {
  defaultMessage: 'SIEM case field'
});

exports.FIELD_MAPPING_FIRST_COL = FIELD_MAPPING_FIRST_COL;

var FIELD_MAPPING_SECOND_COL = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingSecondCol', {
  defaultMessage: 'External incident field'
});

exports.FIELD_MAPPING_SECOND_COL = FIELD_MAPPING_SECOND_COL;

var FIELD_MAPPING_THIRD_COL = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingThirdCol', {
  defaultMessage: 'On edit and update'
});

exports.FIELD_MAPPING_THIRD_COL = FIELD_MAPPING_THIRD_COL;

var FIELD_MAPPING_EDIT_NOTHING = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingEditNothing', {
  defaultMessage: 'Nothing'
});

exports.FIELD_MAPPING_EDIT_NOTHING = FIELD_MAPPING_EDIT_NOTHING;

var FIELD_MAPPING_EDIT_OVERWRITE = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingEditOverwrite', {
  defaultMessage: 'Overwrite'
});

exports.FIELD_MAPPING_EDIT_OVERWRITE = FIELD_MAPPING_EDIT_OVERWRITE;

var FIELD_MAPPING_EDIT_APPEND = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingEditAppend', {
  defaultMessage: 'Append'
});

exports.FIELD_MAPPING_EDIT_APPEND = FIELD_MAPPING_EDIT_APPEND;

var CANCEL = _i18n.i18n.translate('xpack.siem.case.configureCases.cancelButton', {
  defaultMessage: 'Cancel'
});

exports.CANCEL = CANCEL;

var SAVE_CHANGES = _i18n.i18n.translate('xpack.siem.case.configureCases.saveChangesButton', {
  defaultMessage: 'Save Changes'
});

exports.SAVE_CHANGES = SAVE_CHANGES;

var WARNING_NO_CONNECTOR_TITLE = _i18n.i18n.translate('xpack.siem.case.configureCases.warningTitle', {
  defaultMessage: 'Warning'
});

exports.WARNING_NO_CONNECTOR_TITLE = WARNING_NO_CONNECTOR_TITLE;

var WARNING_NO_CONNECTOR_MESSAGE = _i18n.i18n.translate('xpack.siem.case.configureCases.warningMessage', {
  defaultMessage: 'The selected connector has been deleted. Either select a different connector or create a new one.'
});

exports.WARNING_NO_CONNECTOR_MESSAGE = WARNING_NO_CONNECTOR_MESSAGE;

var FIELD_MAPPING_FIELD_NOT_MAPPED = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingFieldNotMapped', {
  defaultMessage: 'Not mapped'
});

exports.FIELD_MAPPING_FIELD_NOT_MAPPED = FIELD_MAPPING_FIELD_NOT_MAPPED;

var FIELD_MAPPING_FIELD_SHORT_DESC = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingFieldShortDescription', {
  defaultMessage: 'Short Description'
});

exports.FIELD_MAPPING_FIELD_SHORT_DESC = FIELD_MAPPING_FIELD_SHORT_DESC;

var FIELD_MAPPING_FIELD_DESC = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingFieldDescription', {
  defaultMessage: 'Description'
});

exports.FIELD_MAPPING_FIELD_DESC = FIELD_MAPPING_FIELD_DESC;

var FIELD_MAPPING_FIELD_COMMENTS = _i18n.i18n.translate('xpack.siem.case.configureCases.fieldMappingFieldComments', {
  defaultMessage: 'Comments'
});

exports.FIELD_MAPPING_FIELD_COMMENTS = FIELD_MAPPING_FIELD_COMMENTS;

var UPDATE_CONNECTOR = _i18n.i18n.translate('xpack.siem.case.configureCases.updateConnector', {
  defaultMessage: 'Update connector'
});

exports.UPDATE_CONNECTOR = UPDATE_CONNECTOR;

var UNSAVED_CHANGES = function UNSAVED_CHANGES(unsavedChanges) {
  return _i18n.i18n.translate('xpack.siem.case.configureCases.unsavedChanges', {
    values: {
      unsavedChanges: unsavedChanges
    },
    defaultMessage: '{unsavedChanges} unsaved changes'
  });
};

exports.UNSAVED_CHANGES = UNSAVED_CHANGES;