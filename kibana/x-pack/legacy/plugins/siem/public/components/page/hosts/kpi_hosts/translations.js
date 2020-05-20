"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DESTINATION_CHART_LABEL = exports.SOURCE_CHART_LABEL = exports.DESTINATION_UNIT_LABEL = exports.SOURCE_UNIT_LABEL = exports.UNIQUE_IPS = exports.FAIL_CHART_LABEL = exports.SUCCESS_CHART_LABEL = exports.FAIL_UNIT_LABEL = exports.SUCCESS_UNIT_LABEL = exports.USER_AUTHENTICATIONS = exports.HOSTS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HOSTS = _i18n.i18n.translate('xpack.siem.kpiHosts.hosts.title', {
  defaultMessage: 'Hosts'
});

exports.HOSTS = HOSTS;

var USER_AUTHENTICATIONS = _i18n.i18n.translate('xpack.siem.kpiHosts.userAuthentications.title', {
  defaultMessage: 'User authentications'
});

exports.USER_AUTHENTICATIONS = USER_AUTHENTICATIONS;

var SUCCESS_UNIT_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.userAuthentications.successUnitLabel', {
  defaultMessage: 'success'
});

exports.SUCCESS_UNIT_LABEL = SUCCESS_UNIT_LABEL;

var FAIL_UNIT_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.userAuthentications.failUnitLabel', {
  defaultMessage: 'fail'
});

exports.FAIL_UNIT_LABEL = FAIL_UNIT_LABEL;

var SUCCESS_CHART_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.userAuthentications.successChartLabel', {
  defaultMessage: 'Succ.'
});

exports.SUCCESS_CHART_LABEL = SUCCESS_CHART_LABEL;

var FAIL_CHART_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.userAuthentications.failChartLabel', {
  defaultMessage: 'Fail'
});

exports.FAIL_CHART_LABEL = FAIL_CHART_LABEL;

var UNIQUE_IPS = _i18n.i18n.translate('xpack.siem.kpiHosts.uniqueIps.title', {
  defaultMessage: 'Unique IPs'
});

exports.UNIQUE_IPS = UNIQUE_IPS;

var SOURCE_UNIT_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.uniqueIps.sourceUnitLabel', {
  defaultMessage: 'source'
});

exports.SOURCE_UNIT_LABEL = SOURCE_UNIT_LABEL;

var DESTINATION_UNIT_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.uniqueIps.destinationUnitLabel', {
  defaultMessage: 'destination'
});

exports.DESTINATION_UNIT_LABEL = DESTINATION_UNIT_LABEL;

var SOURCE_CHART_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.uniqueIps.sourceChartLabel', {
  defaultMessage: 'Src.'
});

exports.SOURCE_CHART_LABEL = SOURCE_CHART_LABEL;

var DESTINATION_CHART_LABEL = _i18n.i18n.translate('xpack.siem.kpiHosts.uniqueIps.destinationChartLabel', {
  defaultMessage: 'Dest.'
});

exports.DESTINATION_CHART_LABEL = DESTINATION_CHART_LABEL;