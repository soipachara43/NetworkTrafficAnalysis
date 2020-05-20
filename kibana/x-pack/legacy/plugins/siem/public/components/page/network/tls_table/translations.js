"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.VALID_UNTIL = exports.JA3_FINGERPRINT = exports.SHA1_FINGERPRINT = exports.SUBJECT = exports.ISSUER = exports.UNIT = exports.TRANSPORT_LAYER_SECURITY = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TRANSPORT_LAYER_SECURITY = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.transportLayerSecurityTitle', {
  defaultMessage: 'Transport Layer Security'
});

exports.TRANSPORT_LAYER_SECURITY = TRANSPORT_LAYER_SECURITY;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {server certificate} other {server certificates}}"
  });
}; // Columns


exports.UNIT = UNIT;

var ISSUER = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.issuerTitle', {
  defaultMessage: 'Issuer'
});

exports.ISSUER = ISSUER;

var SUBJECT = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.subjectTitle', {
  defaultMessage: 'Subject'
});

exports.SUBJECT = SUBJECT;

var SHA1_FINGERPRINT = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.sha1FingerPrintTitle', {
  defaultMessage: 'SHA1 fingerprint'
});

exports.SHA1_FINGERPRINT = SHA1_FINGERPRINT;

var JA3_FINGERPRINT = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.ja3FingerPrintTitle', {
  defaultMessage: 'JA3 fingerprint'
});

exports.JA3_FINGERPRINT = JA3_FINGERPRINT;

var VALID_UNTIL = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.validUntilTitle', {
  defaultMessage: 'Valid until'
}); // Row Select


exports.VALID_UNTIL = VALID_UNTIL;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.network.ipDetails.tlsTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;