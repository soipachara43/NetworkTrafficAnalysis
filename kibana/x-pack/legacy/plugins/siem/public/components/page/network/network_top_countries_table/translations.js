"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROWS_10 = exports.ROWS_5 = exports.SOURCE_IPS = exports.DESTINATION_IPS = exports.SOURCE_COUNTRIES = exports.DESTINATION_COUNTRIES = exports.FLOWS = exports.BYTES_OUT = exports.BYTES_IN = exports.COUNTRY = exports.UNIT = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.heading.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {Country} other {Countries}}"
  });
};

exports.UNIT = UNIT;

var COUNTRY = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.column.countryTitle', {
  defaultMessage: 'Country'
});

exports.COUNTRY = COUNTRY;

var BYTES_IN = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.column.bytesInTitle', {
  defaultMessage: 'Bytes in'
});

exports.BYTES_IN = BYTES_IN;

var BYTES_OUT = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.column.bytesOutTitle', {
  defaultMessage: 'Bytes out'
});

exports.BYTES_OUT = BYTES_OUT;

var FLOWS = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.column.flows', {
  defaultMessage: 'Flows'
});

exports.FLOWS = FLOWS;

var DESTINATION_COUNTRIES = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.heading.destinationCountries', {
  defaultMessage: 'Destination countries'
});

exports.DESTINATION_COUNTRIES = DESTINATION_COUNTRIES;

var SOURCE_COUNTRIES = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.heading.sourceCountries', {
  defaultMessage: 'Source countries'
});

exports.SOURCE_COUNTRIES = SOURCE_COUNTRIES;

var DESTINATION_IPS = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.column.destinationIps', {
  defaultMessage: 'Destination IPs'
});

exports.DESTINATION_IPS = DESTINATION_IPS;

var SOURCE_IPS = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.column.sourceIps', {
  defaultMessage: 'Source IPs'
});

exports.SOURCE_IPS = SOURCE_IPS;

var ROWS_5 = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.rows', {
  values: {
    numRows: 5
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_5 = ROWS_5;

var ROWS_10 = _i18n.i18n.translate('xpack.siem.networkTopCountriesTable.rows', {
  values: {
    numRows: 10
  },
  defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}'
});

exports.ROWS_10 = ROWS_10;