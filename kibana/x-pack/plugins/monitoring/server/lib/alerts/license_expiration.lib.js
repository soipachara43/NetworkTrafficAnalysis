"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeActions = executeActions;
exports.getUiMessage = getUiMessage;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const RESOLVED_SUBJECT = _i18n.i18n.translate('xpack.monitoring.alerts.licenseExpiration.resolvedSubject', {
  defaultMessage: 'RESOLVED X-Pack Monitoring: License Expiration'
});

const NEW_SUBJECT = _i18n.i18n.translate('xpack.monitoring.alerts.licenseExpiration.newSubject', {
  defaultMessage: 'NEW X-Pack Monitoring: License Expiration'
});

function executeActions(instance, license, $expiry, dateFormat, emailAddress, resolved = false) {
  if (resolved) {
    instance.scheduleActions('default', {
      subject: RESOLVED_SUBJECT,
      message: `This cluster alert has been resolved: Cluster '${license.clusterName}' license was going to expire on ${$expiry.format(dateFormat)}.`,
      to: emailAddress
    });
  } else {
    instance.scheduleActions('default', {
      subject: NEW_SUBJECT,
      message: `Cluster '${license.clusterName}' license is going to expire on ${$expiry.format(dateFormat)}. Please update your license.`,
      to: emailAddress
    });
  }
}

function getUiMessage(license, timezone, resolved = false) {
  if (resolved) {
    return _i18n.i18n.translate('xpack.monitoring.alerts.licenseExpiration.ui.resolvedMessage', {
      defaultMessage: `This cluster's license is active.`
    });
  }

  return _i18n.i18n.translate('xpack.monitoring.alerts.licenseExpiration.ui.firingMessage', {
    defaultMessage: `This cluster's license is going to expire in #relative at #absolute.`
  });
}