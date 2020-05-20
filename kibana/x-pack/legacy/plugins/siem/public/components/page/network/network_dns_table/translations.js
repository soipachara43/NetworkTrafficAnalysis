"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.INCLUDE_PTR_RECORDS = exports.DNS_BYTES_OUT = exports.DNS_BYTES_IN = exports.UNIQUE_DOMAINS = exports.TOTAL_QUERIES = exports.REGISTERED_DOMAIN = exports.TOOLTIP = exports.UNIT = exports.TOP_DNS_DOMAINS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TOP_DNS_DOMAINS = _i18n.i18n.translate('xpack.siem.networkDnsTable.title', {
  defaultMessage: 'Top DNS domains'
});

exports.TOP_DNS_DOMAINS = TOP_DNS_DOMAINS;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.networkDnsTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {domain} other {domains}}"
  });
};

exports.UNIT = UNIT;

var TOOLTIP = _i18n.i18n.translate('xpack.siem.networkDnsTable.helperTooltip', {
  defaultMessage: 'This shows DNS protocol traffic only and can be useful for hunting domains used in DNS data exfiltration.'
});

exports.TOOLTIP = TOOLTIP;

var REGISTERED_DOMAIN = _i18n.i18n.translate('xpack.siem.networkDnsTable.column.registeredDomain', {
  defaultMessage: 'Registered domain'
});

exports.REGISTERED_DOMAIN = REGISTERED_DOMAIN;

var TOTAL_QUERIES = _i18n.i18n.translate('xpack.siem.networkDnsTable.column.TotalQueriesTitle', {
  defaultMessage: 'Total queries'
});

exports.TOTAL_QUERIES = TOTAL_QUERIES;

var UNIQUE_DOMAINS = _i18n.i18n.translate('xpack.siem.networkDnsTable.column.uniqueDomainsTitle', {
  defaultMessage: 'Unique domains'
});

exports.UNIQUE_DOMAINS = UNIQUE_DOMAINS;

var DNS_BYTES_IN = _i18n.i18n.translate('xpack.siem.networkDnsTable.column.bytesInTitle', {
  defaultMessage: 'DNS bytes in'
});

exports.DNS_BYTES_IN = DNS_BYTES_IN;

var DNS_BYTES_OUT = _i18n.i18n.translate('xpack.siem.networkDnsTable.column.bytesOutTitle', {
  defaultMessage: 'DNS bytes out'
});

exports.DNS_BYTES_OUT = DNS_BYTES_OUT;

var INCLUDE_PTR_RECORDS = _i18n.i18n.translate('xpack.siem.networkDnsTable.select.includePtrRecords', {
  defaultMessage: 'Include PTR records'
});

exports.INCLUDE_PTR_RECORDS = INCLUDE_PTR_RECORDS;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.networkDnsTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.networkDnsTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;