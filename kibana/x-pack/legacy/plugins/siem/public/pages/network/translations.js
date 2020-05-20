"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMAINS_COUNT_BY = exports.NAVIGATION_ALERTS_TITLE = exports.NAVIGATION_ANOMALIES_TITLE = exports.NAVIGATION_HTTP_TITLE = exports.NAVIGATION_TLS_TITLE = exports.ERROR_FETCHING_DNS_DATA = exports.NAVIGATION_DNS_TITLE = exports.NAVIGATION_FLOWS_TITLE = exports.PAGE_TITLE = exports.KQL_PLACEHOLDER = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var KQL_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.network.kqlPlaceholder', {
  defaultMessage: 'e.g. source.ip: "foo"'
});

exports.KQL_PLACEHOLDER = KQL_PLACEHOLDER;

var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.network.pageTitle', {
  defaultMessage: 'Network'
});

exports.PAGE_TITLE = PAGE_TITLE;

var NAVIGATION_FLOWS_TITLE = _i18n.i18n.translate('xpack.siem.network.navigation.flowsTitle', {
  defaultMessage: 'Flows'
});

exports.NAVIGATION_FLOWS_TITLE = NAVIGATION_FLOWS_TITLE;

var NAVIGATION_DNS_TITLE = _i18n.i18n.translate('xpack.siem.network.navigation.dnsTitle', {
  defaultMessage: 'DNS'
});

exports.NAVIGATION_DNS_TITLE = NAVIGATION_DNS_TITLE;

var ERROR_FETCHING_DNS_DATA = _i18n.i18n.translate('xpack.siem.hosts.navigation.dns.histogram.errorFetchingDnsData', {
  defaultMessage: 'Failed to query DNS data'
});

exports.ERROR_FETCHING_DNS_DATA = ERROR_FETCHING_DNS_DATA;

var NAVIGATION_TLS_TITLE = _i18n.i18n.translate('xpack.siem.network.navigation.tlsTitle', {
  defaultMessage: 'TLS'
});

exports.NAVIGATION_TLS_TITLE = NAVIGATION_TLS_TITLE;

var NAVIGATION_HTTP_TITLE = _i18n.i18n.translate('xpack.siem.network.navigation.httpTitle', {
  defaultMessage: 'HTTP'
});

exports.NAVIGATION_HTTP_TITLE = NAVIGATION_HTTP_TITLE;

var NAVIGATION_ANOMALIES_TITLE = _i18n.i18n.translate('xpack.siem.network.navigation.anomaliesTitle', {
  defaultMessage: 'Anomalies'
});

exports.NAVIGATION_ANOMALIES_TITLE = NAVIGATION_ANOMALIES_TITLE;

var NAVIGATION_ALERTS_TITLE = _i18n.i18n.translate('xpack.siem.network.navigation.alertsTitle', {
  defaultMessage: 'External alerts'
});

exports.NAVIGATION_ALERTS_TITLE = NAVIGATION_ALERTS_TITLE;

var DOMAINS_COUNT_BY = function DOMAINS_COUNT_BY(groupByField) {
  return _i18n.i18n.translate('xpack.siem.network.dns.stackByUniqueSubdomain', {
    values: {
      groupByField: groupByField
    },
    defaultMessage: 'Top domains by {groupByField}'
  });
};

exports.DOMAINS_COUNT_BY = DOMAINS_COUNT_BY;