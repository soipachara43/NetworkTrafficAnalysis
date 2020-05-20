"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.NAME = exports.LAST_USER = exports.LAST_COMMAND = exports.NUMBER_OF_INSTANCES = exports.NUMBER_OF_HOSTS = exports.HOSTS = exports.UNIT = exports.UNCOMMON_PROCESSES = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UNCOMMON_PROCESSES = _i18n.i18n.translate('xpack.siem.authenticationsTable.uncommonProcessTable', {
  defaultMessage: 'Uncommon processes'
});

exports.UNCOMMON_PROCESSES = UNCOMMON_PROCESSES;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.uncommonProcessTable.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {process} other {processes}}"
  });
};

exports.UNIT = UNIT;

var HOSTS = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.hostsTitle', {
  defaultMessage: 'Host names'
});

exports.HOSTS = HOSTS;

var NUMBER_OF_HOSTS = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.numberOfHostsTitle', {
  defaultMessage: 'Hosts'
});

exports.NUMBER_OF_HOSTS = NUMBER_OF_HOSTS;

var NUMBER_OF_INSTANCES = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.numberOfInstances', {
  defaultMessage: 'Instances'
});

exports.NUMBER_OF_INSTANCES = NUMBER_OF_INSTANCES;

var LAST_COMMAND = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.lastCommandTitle', {
  defaultMessage: 'Last command'
});

exports.LAST_COMMAND = LAST_COMMAND;

var LAST_USER = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.lastUserTitle', {
  defaultMessage: 'Last user'
});

exports.LAST_USER = LAST_USER;

var NAME = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.nameTitle', {
  defaultMessage: 'Process name'
});

exports.NAME = NAME;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.uncommonProcessTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;