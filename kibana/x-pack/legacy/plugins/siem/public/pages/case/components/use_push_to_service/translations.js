"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINK_CONNECTOR_CONFIGURE = exports.LINK_CLOUD_DEPLOYMENT = exports.PUSH_DISABLE_BY_LICENSE_TITLE = exports.PUSH_DISABLE_BY_KIBANA_CONFIG_TITLE = exports.PUSH_DISABLE_BECAUSE_CASE_CLOSED_TITLE = exports.PUSH_DISABLE_BY_NO_CASE_CONFIG_TITLE = exports.UPDATE_PUSH_SERVICENOW = exports.PUSH_SERVICENOW = exports.ERROR_PUSH_SERVICE_CALLOUT_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ERROR_PUSH_SERVICE_CALLOUT_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.errorsPushServiceCallOutTitle', {
  defaultMessage: 'To send cases to external systems, you need to:'
});

exports.ERROR_PUSH_SERVICE_CALLOUT_TITLE = ERROR_PUSH_SERVICE_CALLOUT_TITLE;

var PUSH_SERVICENOW = _i18n.i18n.translate('xpack.siem.case.caseView.pushAsServicenowIncident', {
  defaultMessage: 'Push as ServiceNow incident'
});

exports.PUSH_SERVICENOW = PUSH_SERVICENOW;

var UPDATE_PUSH_SERVICENOW = _i18n.i18n.translate('xpack.siem.case.caseView.updatePushAsServicenowIncident', {
  defaultMessage: 'Update ServiceNow incident'
});

exports.UPDATE_PUSH_SERVICENOW = UPDATE_PUSH_SERVICENOW;

var PUSH_DISABLE_BY_NO_CASE_CONFIG_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.pushToServiceDisableByNoCaseConfigTitle', {
  defaultMessage: 'Configure external connector'
});

exports.PUSH_DISABLE_BY_NO_CASE_CONFIG_TITLE = PUSH_DISABLE_BY_NO_CASE_CONFIG_TITLE;

var PUSH_DISABLE_BECAUSE_CASE_CLOSED_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.pushToServiceDisableBecauseCaseClosedTitle', {
  defaultMessage: 'Reopen the case'
});

exports.PUSH_DISABLE_BECAUSE_CASE_CLOSED_TITLE = PUSH_DISABLE_BECAUSE_CASE_CLOSED_TITLE;

var PUSH_DISABLE_BY_KIBANA_CONFIG_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.pushToServiceDisableByConfigTitle', {
  defaultMessage: 'Enable ServiceNow in Kibana configuration file'
});

exports.PUSH_DISABLE_BY_KIBANA_CONFIG_TITLE = PUSH_DISABLE_BY_KIBANA_CONFIG_TITLE;

var PUSH_DISABLE_BY_LICENSE_TITLE = _i18n.i18n.translate('xpack.siem.case.caseView.pushToServiceDisableByLicenseTitle', {
  defaultMessage: 'Upgrade to Elastic Platinum'
});

exports.PUSH_DISABLE_BY_LICENSE_TITLE = PUSH_DISABLE_BY_LICENSE_TITLE;

var LINK_CLOUD_DEPLOYMENT = _i18n.i18n.translate('xpack.siem.case.caseView.cloudDeploymentLink', {
  defaultMessage: 'cloud deployment'
});

exports.LINK_CLOUD_DEPLOYMENT = LINK_CLOUD_DEPLOYMENT;

var LINK_CONNECTOR_CONFIGURE = _i18n.i18n.translate('xpack.siem.case.caseView.connectorConfigureLink', {
  defaultMessage: 'connector'
});

exports.LINK_CONNECTOR_CONFIGURE = LINK_CONNECTOR_CONFIGURE;