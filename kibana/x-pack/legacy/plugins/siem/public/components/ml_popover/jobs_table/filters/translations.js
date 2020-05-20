"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHOW_CUSTOM_JOBS = exports.SHOW_ELASTIC_JOBS = exports.NO_GROUPS_AVAILABLE = exports.GROUPS = exports.FILTER_PLACEHOLDER = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FILTER_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.components.mlPopover.jobsTable.filters.searchFilterPlaceholder', {
  defaultMessage: 'e.g. rare_process_linux'
});

exports.FILTER_PLACEHOLDER = FILTER_PLACEHOLDER;

var GROUPS = _i18n.i18n.translate('xpack.siem.components.mlPopover.jobsTable.filters.groupsLabel', {
  defaultMessage: 'Groups'
});

exports.GROUPS = GROUPS;

var NO_GROUPS_AVAILABLE = _i18n.i18n.translate('xpack.siem.components.mlPopover.jobsTable.filters.noGroupsAvailableDescription', {
  defaultMessage: 'No Groups available'
});

exports.NO_GROUPS_AVAILABLE = NO_GROUPS_AVAILABLE;

var SHOW_ELASTIC_JOBS = _i18n.i18n.translate('xpack.siem.components.mlPopover.jobsTable.filters.showAllJobsLabel', {
  defaultMessage: 'Elastic jobs'
});

exports.SHOW_ELASTIC_JOBS = SHOW_ELASTIC_JOBS;

var SHOW_CUSTOM_JOBS = _i18n.i18n.translate('xpack.siem.components.mlPopover.jobsTable.filters.showSiemJobsLabel', {
  defaultMessage: 'Custom jobs'
});

exports.SHOW_CUSTOM_JOBS = SHOW_CUSTOM_JOBS;