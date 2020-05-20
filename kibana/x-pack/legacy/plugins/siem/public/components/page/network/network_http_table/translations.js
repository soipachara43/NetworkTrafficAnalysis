"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.REQUESTS = exports.LAST_SOURCE_IP = exports.LAST_HOST = exports.STATUS = exports.PATH = exports.DOMAIN = exports.METHOD = exports.UNIT = exports.HTTP_REQUESTS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HTTP_REQUESTS = _i18n.i18n.translate('xpack.siem.networkHttpTable.title', {
  defaultMessage: 'HTTP Requests'
});

exports.HTTP_REQUESTS = HTTP_REQUESTS;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.networkHttpTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {request} other {requests}}"
  });
};

exports.UNIT = UNIT;

var METHOD = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.methodTitle', {
  defaultMessage: 'Method'
});

exports.METHOD = METHOD;

var DOMAIN = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.domainTitle', {
  defaultMessage: 'Domain'
});

exports.DOMAIN = DOMAIN;

var PATH = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.pathTitle', {
  defaultMessage: 'Path'
});

exports.PATH = PATH;

var STATUS = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.statusTitle', {
  defaultMessage: 'Status'
});

exports.STATUS = STATUS;

var LAST_HOST = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.lastHostTitle', {
  defaultMessage: 'Last host'
});

exports.LAST_HOST = LAST_HOST;

var LAST_SOURCE_IP = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.lastSourceIpTitle', {
  defaultMessage: 'Last source Ip'
});

exports.LAST_SOURCE_IP = LAST_SOURCE_IP;

var REQUESTS = _i18n.i18n.translate('xpack.siem.networkHttpTable.column.requestsTitle', {
  defaultMessage: 'Requests'
});

exports.REQUESTS = REQUESTS;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.networkHttpTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.networkHttpTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;