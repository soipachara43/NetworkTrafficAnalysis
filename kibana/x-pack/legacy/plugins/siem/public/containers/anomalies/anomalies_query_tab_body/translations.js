"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_FETCHING_ANOMALIES_DATA = exports.ANOMALIES_TITLE = exports.ANOMALIES_STACK_BY_JOB_ID = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ANOMALIES_STACK_BY_JOB_ID = _i18n.i18n.translate('xpack.siem.containers.anomalies.stackByJobId', {
  defaultMessage: 'job'
});

exports.ANOMALIES_STACK_BY_JOB_ID = ANOMALIES_STACK_BY_JOB_ID;

var ANOMALIES_TITLE = _i18n.i18n.translate('xpack.siem.containers.anomalies.title', {
  defaultMessage: 'Anomalies'
});

exports.ANOMALIES_TITLE = ANOMALIES_TITLE;

var ERROR_FETCHING_ANOMALIES_DATA = _i18n.i18n.translate('xpack.siem.containers.anomalies.errorFetchingAnomaliesData', {
  defaultMessage: 'Failed to query anomalies data'
});

exports.ERROR_FETCHING_ANOMALIES_DATA = ERROR_FETCHING_ANOMALIES_DATA;