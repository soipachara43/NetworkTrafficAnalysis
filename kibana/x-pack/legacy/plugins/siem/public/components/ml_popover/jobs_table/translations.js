"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_CUSTOM_JOB = exports.NO_ITEMS_TEXT = exports.COLUMN_RUN_JOB = exports.COLUMN_GROUPS = exports.COLUMN_JOB_NAME = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var COLUMN_JOB_NAME = _i18n.i18n.translate('xpack.siem.components.mlPopup.jobsTable.jobNameColumn', {
  defaultMessage: 'Job name'
});

exports.COLUMN_JOB_NAME = COLUMN_JOB_NAME;

var COLUMN_GROUPS = _i18n.i18n.translate('xpack.siem.components.mlPopup.jobsTable.tagsColumn', {
  defaultMessage: 'Groups'
});

exports.COLUMN_GROUPS = COLUMN_GROUPS;

var COLUMN_RUN_JOB = _i18n.i18n.translate('xpack.siem.components.mlPopup.jobsTable.runJobColumn', {
  defaultMessage: 'Run job'
});

exports.COLUMN_RUN_JOB = COLUMN_RUN_JOB;

var NO_ITEMS_TEXT = _i18n.i18n.translate('xpack.siem.components.mlPopup.jobsTable.noItemsDescription', {
  defaultMessage: 'No SIEM Machine Learning jobs found'
});

exports.NO_ITEMS_TEXT = NO_ITEMS_TEXT;

var CREATE_CUSTOM_JOB = _i18n.i18n.translate('xpack.siem.components.mlPopup.jobsTable.createCustomJobButtonLabel', {
  defaultMessage: 'Create custom job'
});

exports.CREATE_CUSTOM_JOB = CREATE_CUSTOM_JOB;