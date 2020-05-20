"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_FETCHING_EVENTS_DATA = exports.ERROR_FETCHING_AUTHENTICATIONS_DATA = exports.NAVIGATION_ALERTS_TITLE = exports.NAVIGATION_EVENTS_TITLE = exports.NAVIGATION_ANOMALIES_TITLE = exports.NAVIGATION_UNCOMMON_PROCESSES_TITLE = exports.NAVIGATION_AUTHENTICATIONS_TITLE = exports.NAVIGATION_ALL_HOSTS_TITLE = exports.PAGE_TITLE = exports.KQL_PLACEHOLDER = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var KQL_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.hosts.kqlPlaceholder', {
  defaultMessage: 'e.g. host.name: "foo"'
});

exports.KQL_PLACEHOLDER = KQL_PLACEHOLDER;

var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.hosts.pageTitle', {
  defaultMessage: 'Hosts'
});

exports.PAGE_TITLE = PAGE_TITLE;

var NAVIGATION_ALL_HOSTS_TITLE = _i18n.i18n.translate('xpack.siem.hosts.navigation.allHostsTitle', {
  defaultMessage: 'All hosts'
});

exports.NAVIGATION_ALL_HOSTS_TITLE = NAVIGATION_ALL_HOSTS_TITLE;

var NAVIGATION_AUTHENTICATIONS_TITLE = _i18n.i18n.translate('xpack.siem.hosts.navigation.authenticationsTitle', {
  defaultMessage: 'Authentications'
});

exports.NAVIGATION_AUTHENTICATIONS_TITLE = NAVIGATION_AUTHENTICATIONS_TITLE;

var NAVIGATION_UNCOMMON_PROCESSES_TITLE = _i18n.i18n.translate('xpack.siem.hosts.navigation.uncommonProcessesTitle', {
  defaultMessage: 'Uncommon processes'
});

exports.NAVIGATION_UNCOMMON_PROCESSES_TITLE = NAVIGATION_UNCOMMON_PROCESSES_TITLE;

var NAVIGATION_ANOMALIES_TITLE = _i18n.i18n.translate('xpack.siem.hosts.navigation.anomaliesTitle', {
  defaultMessage: 'Anomalies'
});

exports.NAVIGATION_ANOMALIES_TITLE = NAVIGATION_ANOMALIES_TITLE;

var NAVIGATION_EVENTS_TITLE = _i18n.i18n.translate('xpack.siem.hosts.navigation.eventsTitle', {
  defaultMessage: 'Events'
});

exports.NAVIGATION_EVENTS_TITLE = NAVIGATION_EVENTS_TITLE;

var NAVIGATION_ALERTS_TITLE = _i18n.i18n.translate('xpack.siem.hosts.navigation.alertsTitle', {
  defaultMessage: 'External alerts'
});

exports.NAVIGATION_ALERTS_TITLE = NAVIGATION_ALERTS_TITLE;

var ERROR_FETCHING_AUTHENTICATIONS_DATA = _i18n.i18n.translate('xpack.siem.hosts.navigaton.matrixHistogram.errorFetchingAuthenticationsData', {
  defaultMessage: 'Failed to query authentications data'
});

exports.ERROR_FETCHING_AUTHENTICATIONS_DATA = ERROR_FETCHING_AUTHENTICATIONS_DATA;

var ERROR_FETCHING_EVENTS_DATA = _i18n.i18n.translate('xpack.siem.hosts.navigaton.matrixHistogram.errorFetchingEventsData', {
  defaultMessage: 'Failed to query events data'
});

exports.ERROR_FETCHING_EVENTS_DATA = ERROR_FETCHING_EVENTS_DATA;