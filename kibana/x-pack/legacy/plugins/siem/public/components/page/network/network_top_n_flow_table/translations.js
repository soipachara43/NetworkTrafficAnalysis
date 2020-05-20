"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.SOURCE_IPS = exports.DESTINATION_IPS = exports.FLOWS = exports.AUTONOMOUS_SYSTEM = exports.BYTES_OUT = exports.BYTES_IN = exports.DOMAIN = exports.IP_TITLE = exports.DESTINATION_IP = exports.SOURCE_IP = exports.UNIT = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {IP} other {IPs}}"
  });
};

exports.UNIT = UNIT;

var SOURCE_IP = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.sourceIpTitle', {
  defaultMessage: 'Source IPs'
});

exports.SOURCE_IP = SOURCE_IP;

var DESTINATION_IP = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.destinationIpTitle', {
  defaultMessage: 'Destination IPs'
});

exports.DESTINATION_IP = DESTINATION_IP;

var IP_TITLE = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.IpTitle', {
  defaultMessage: 'IP'
});

exports.IP_TITLE = IP_TITLE;

var DOMAIN = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.domainTitle', {
  defaultMessage: 'Domain'
});

exports.DOMAIN = DOMAIN;

var BYTES_IN = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.bytesInTitle', {
  defaultMessage: 'Bytes in'
});

exports.BYTES_IN = BYTES_IN;

var BYTES_OUT = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.bytesOutTitle', {
  defaultMessage: 'Bytes out'
});

exports.BYTES_OUT = BYTES_OUT;

var AUTONOMOUS_SYSTEM = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.column.asTitle', {
  defaultMessage: 'Autonomous system'
});

exports.AUTONOMOUS_SYSTEM = AUTONOMOUS_SYSTEM;

var FLOWS = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.flows', {
  defaultMessage: 'Flows'
});

exports.FLOWS = FLOWS;

var DESTINATION_IPS = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.destinationIps', {
  defaultMessage: 'Destination IPs'
});

exports.DESTINATION_IPS = DESTINATION_IPS;

var SOURCE_IPS = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.sourceIps', {
  defaultMessage: 'Source IPs'
});

exports.SOURCE_IPS = SOURCE_IPS;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.networkTopNFlowTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;