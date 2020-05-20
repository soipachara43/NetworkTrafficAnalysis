"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_JOB_FAILURE = exports.STOP_JOB_FAILURE = exports.START_JOB_FAILURE = exports.MODULE_NOT_COMPATIBLE_TITLE = exports.LICENSE_BUTTON = exports.UPGRADE_BUTTON = exports.UPGRADE_TITLE = exports.ML_JOB_SETTINGS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ML_JOB_SETTINGS = _i18n.i18n.translate('xpack.siem.components.mlPopup.mlJobSettingsButtonLabel', {
  defaultMessage: 'ML job settings'
});

exports.ML_JOB_SETTINGS = ML_JOB_SETTINGS;

var UPGRADE_TITLE = _i18n.i18n.translate('xpack.siem.components.mlPopup.upgradeTitle', {
  defaultMessage: 'Upgrade to Elastic Platinum'
});

exports.UPGRADE_TITLE = UPGRADE_TITLE;

var UPGRADE_BUTTON = _i18n.i18n.translate('xpack.siem.components.mlPopup.upgradeButtonLabel', {
  defaultMessage: 'Subscription plans'
});

exports.UPGRADE_BUTTON = UPGRADE_BUTTON;

var LICENSE_BUTTON = _i18n.i18n.translate('xpack.siem.components.mlPopup.licenseButtonLabel', {
  defaultMessage: 'Manage license'
});

exports.LICENSE_BUTTON = LICENSE_BUTTON;

var MODULE_NOT_COMPATIBLE_TITLE = function MODULE_NOT_COMPATIBLE_TITLE(incompatibleJobCount) {
  return _i18n.i18n.translate('xpack.siem.components.mlPopup.moduleNotCompatibleTitle', {
    values: {
      incompatibleJobCount: incompatibleJobCount
    },
    defaultMessage: '{incompatibleJobCount} {incompatibleJobCount, plural, =1 {job} other {jobs}} are currently unavailable'
  });
};

exports.MODULE_NOT_COMPATIBLE_TITLE = MODULE_NOT_COMPATIBLE_TITLE;

var START_JOB_FAILURE = _i18n.i18n.translate('xpack.siem.components.mlPopup.errors.startJobFailureTitle', {
  defaultMessage: 'Start job failure'
});

exports.START_JOB_FAILURE = START_JOB_FAILURE;

var STOP_JOB_FAILURE = _i18n.i18n.translate('xpack.siem.containers.errors.stopJobFailureTitle', {
  defaultMessage: 'Stop job failure'
});

exports.STOP_JOB_FAILURE = STOP_JOB_FAILURE;

var CREATE_JOB_FAILURE = _i18n.i18n.translate('xpack.siem.components.mlPopup.errors.createJobFailureTitle', {
  defaultMessage: 'Create job failure'
});

exports.CREATE_JOB_FAILURE = CREATE_JOB_FAILURE;