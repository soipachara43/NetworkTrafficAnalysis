"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODULE = exports.CATEGORY = exports.ERROR_FETCHING_ALERTS_DATA = exports.UNIT = exports.SHOWING = exports.ALERTS_STACK_BY_MODULE = exports.ALERTS_GRAPH_TITLE = exports.ALERTS_TABLE_TITLE = exports.TOTAL_COUNT_OF_ALERTS = exports.ALERTS_DOCUMENT_TYPE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ALERTS_DOCUMENT_TYPE = _i18n.i18n.translate('xpack.siem.alertsView.alertsDocumentType', {
  defaultMessage: 'External alerts'
});

exports.ALERTS_DOCUMENT_TYPE = ALERTS_DOCUMENT_TYPE;

var TOTAL_COUNT_OF_ALERTS = _i18n.i18n.translate('xpack.siem.alertsView.totalCountOfAlerts', {
  defaultMessage: 'external alerts match the search criteria'
});

exports.TOTAL_COUNT_OF_ALERTS = TOTAL_COUNT_OF_ALERTS;

var ALERTS_TABLE_TITLE = _i18n.i18n.translate('xpack.siem.alertsView.alertsTableTitle', {
  defaultMessage: 'External alerts'
});

exports.ALERTS_TABLE_TITLE = ALERTS_TABLE_TITLE;

var ALERTS_GRAPH_TITLE = _i18n.i18n.translate('xpack.siem.alertsView.alertsGraphTitle', {
  defaultMessage: 'External alert count'
});

exports.ALERTS_GRAPH_TITLE = ALERTS_GRAPH_TITLE;

var ALERTS_STACK_BY_MODULE = _i18n.i18n.translate('xpack.siem.alertsView.alertsStackByOptions.module', {
  defaultMessage: 'module'
});

exports.ALERTS_STACK_BY_MODULE = ALERTS_STACK_BY_MODULE;

var SHOWING = _i18n.i18n.translate('xpack.siem.alertsView.showing', {
  defaultMessage: 'Showing'
});

exports.SHOWING = SHOWING;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.alertsView.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "external {totalCount, plural, =1 {alert} other {alerts}}"
  });
};

exports.UNIT = UNIT;

var ERROR_FETCHING_ALERTS_DATA = _i18n.i18n.translate('xpack.siem.alertsView.errorFetchingAlertsData', {
  defaultMessage: 'Failed to query alerts data'
});

exports.ERROR_FETCHING_ALERTS_DATA = ERROR_FETCHING_ALERTS_DATA;

var CATEGORY = _i18n.i18n.translate('xpack.siem.alertsView.categoryLabel', {
  defaultMessage: 'category'
});

exports.CATEGORY = CATEGORY;

var MODULE = _i18n.i18n.translate('xpack.siem.alertsView.moduleLabel', {
  defaultMessage: 'module'
});

exports.MODULE = MODULE;