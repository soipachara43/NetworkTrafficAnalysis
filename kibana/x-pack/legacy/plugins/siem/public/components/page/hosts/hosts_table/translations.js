"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.VERSION = exports.OS = exports.FIRST_LAST_SEEN_TOOLTIP = exports.LAST_SEEN = exports.NAME = exports.UNIT = exports.HOSTS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HOSTS = _i18n.i18n.translate('xpack.siem.hostsTable.hostsTitle', {
  defaultMessage: 'All hosts'
});

exports.HOSTS = HOSTS;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.hostsTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {host} other {hosts}}"
  });
};

exports.UNIT = UNIT;

var NAME = _i18n.i18n.translate('xpack.siem.hostsTable.nameTitle', {
  defaultMessage: 'Host name'
});

exports.NAME = NAME;

var LAST_SEEN = _i18n.i18n.translate('xpack.siem.hostsTable.lastSeenTitle', {
  defaultMessage: 'Last seen'
});

exports.LAST_SEEN = LAST_SEEN;

var FIRST_LAST_SEEN_TOOLTIP = _i18n.i18n.translate('xpack.siem.hostsTable.firstLastSeenToolTip', {
  defaultMessage: 'Relative to the selected date range'
});

exports.FIRST_LAST_SEEN_TOOLTIP = FIRST_LAST_SEEN_TOOLTIP;

var OS = _i18n.i18n.translate('xpack.siem.hostsTable.osTitle', {
  defaultMessage: 'Operating system'
});

exports.OS = OS;

var VERSION = _i18n.i18n.translate('xpack.siem.hostsTable.versionTitle', {
  defaultMessage: 'Version'
});

exports.VERSION = VERSION;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.hostsTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.hostsTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;