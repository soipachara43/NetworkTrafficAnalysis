"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.USER = exports.FAILURES = exports.SUCCESSES = exports.LAST_FAILED_TIME = exports.LAST_FAILED_DESTINATION = exports.LAST_FAILED_SOURCE = exports.LAST_SUCCESSFUL_TIME = exports.LAST_SUCCESSFUL_DESTINATION = exports.LAST_SUCCESSFUL_SOURCE = exports.UNIT = exports.AUTHENTICATIONS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AUTHENTICATIONS = _i18n.i18n.translate('xpack.siem.authenticationsTable.authenticationFailures', {
  defaultMessage: 'Authentications'
});

exports.AUTHENTICATIONS = AUTHENTICATIONS;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.authenticationsTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {user} other {users}}"
  });
};

exports.UNIT = UNIT;

var LAST_SUCCESSFUL_SOURCE = _i18n.i18n.translate('xpack.siem.authenticationsTable.lastSuccessfulSource', {
  defaultMessage: 'Last successful source'
});

exports.LAST_SUCCESSFUL_SOURCE = LAST_SUCCESSFUL_SOURCE;

var LAST_SUCCESSFUL_DESTINATION = _i18n.i18n.translate('xpack.siem.authenticationsTable.lastSuccessfulDestination', {
  defaultMessage: 'Last successful destination'
});

exports.LAST_SUCCESSFUL_DESTINATION = LAST_SUCCESSFUL_DESTINATION;

var LAST_SUCCESSFUL_TIME = _i18n.i18n.translate('xpack.siem.authenticationsTable.lastSuccessfulTime', {
  defaultMessage: 'Last success'
});

exports.LAST_SUCCESSFUL_TIME = LAST_SUCCESSFUL_TIME;

var LAST_FAILED_SOURCE = _i18n.i18n.translate('xpack.siem.authenticationsTable.lastFailedSource', {
  defaultMessage: 'Last failed source'
});

exports.LAST_FAILED_SOURCE = LAST_FAILED_SOURCE;

var LAST_FAILED_DESTINATION = _i18n.i18n.translate('xpack.siem.authenticationsTable.lastFailedDestination', {
  defaultMessage: 'Last failed destination'
});

exports.LAST_FAILED_DESTINATION = LAST_FAILED_DESTINATION;

var LAST_FAILED_TIME = _i18n.i18n.translate('xpack.siem.authenticationsTable.lastFailedTime', {
  defaultMessage: 'Last failure'
});

exports.LAST_FAILED_TIME = LAST_FAILED_TIME;

var SUCCESSES = _i18n.i18n.translate('xpack.siem.authenticationsTable.successes', {
  defaultMessage: 'Successes'
});

exports.SUCCESSES = SUCCESSES;

var FAILURES = _i18n.i18n.translate('xpack.siem.authenticationsTable.failures', {
  defaultMessage: 'Failures'
});

exports.FAILURES = FAILURES;

var USER = _i18n.i18n.translate('xpack.siem.authenticationsTable.user', {
  defaultMessage: 'User'
});

exports.USER = USER;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.authenticationsTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.authenticationsTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;