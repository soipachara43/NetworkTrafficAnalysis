"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVICENOW_PASSWORD_REQUIRED = exports.SERVICENOW_PASSWORD_LABEL = exports.SERVICENOW_USERNAME_REQUIRED = exports.SERVICENOW_USERNAME_LABEL = exports.SERVICENOW_API_URL_INVALID = exports.SERVICENOW_API_URL_REQUIRED = exports.SERVICENOW_API_URL_LABEL = exports.SERVICENOW_TITLE = exports.SERVICENOW_DESC = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SERVICENOW_DESC = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.selectMessageText', {
  defaultMessage: 'Push or update SIEM case data to a new incident in ServiceNow'
});

exports.SERVICENOW_DESC = SERVICENOW_DESC;

var SERVICENOW_TITLE = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.actionTypeTitle', {
  defaultMessage: 'ServiceNow'
});

exports.SERVICENOW_TITLE = SERVICENOW_TITLE;

var SERVICENOW_API_URL_LABEL = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.apiUrlTextFieldLabel', {
  defaultMessage: 'URL'
});

exports.SERVICENOW_API_URL_LABEL = SERVICENOW_API_URL_LABEL;

var SERVICENOW_API_URL_REQUIRED = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.requiredApiUrlTextField', {
  defaultMessage: 'URL is required'
});

exports.SERVICENOW_API_URL_REQUIRED = SERVICENOW_API_URL_REQUIRED;

var SERVICENOW_API_URL_INVALID = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.invalidApiUrlTextField', {
  defaultMessage: 'URL is invalid'
});

exports.SERVICENOW_API_URL_INVALID = SERVICENOW_API_URL_INVALID;

var SERVICENOW_USERNAME_LABEL = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.usernameTextFieldLabel', {
  defaultMessage: 'Username'
});

exports.SERVICENOW_USERNAME_LABEL = SERVICENOW_USERNAME_LABEL;

var SERVICENOW_USERNAME_REQUIRED = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.requiredUsernameTextField', {
  defaultMessage: 'Username is required'
});

exports.SERVICENOW_USERNAME_REQUIRED = SERVICENOW_USERNAME_REQUIRED;

var SERVICENOW_PASSWORD_LABEL = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.passwordTextFieldLabel', {
  defaultMessage: 'Password'
});

exports.SERVICENOW_PASSWORD_LABEL = SERVICENOW_PASSWORD_LABEL;

var SERVICENOW_PASSWORD_REQUIRED = _i18n.i18n.translate('xpack.siem.case.connectors.servicenow.requiredPasswordTextField', {
  defaultMessage: 'Password is required'
});

exports.SERVICENOW_PASSWORD_REQUIRED = SERVICENOW_PASSWORD_REQUIRED;