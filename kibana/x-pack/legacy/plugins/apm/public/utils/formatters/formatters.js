"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asDecimal = asDecimal;
exports.asInteger = asInteger;
exports.tpmUnit = tpmUnit;
exports.asPercent = asPercent;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function asDecimal(value) {
  return (0, _numeral.default)(value).format('0,0.0');
}

function asInteger(value) {
  return (0, _numeral.default)(value).format('0,0');
}

function tpmUnit(type) {
  return type === 'request' ? _i18n.i18n.translate('xpack.apm.formatters.requestsPerMinLabel', {
    defaultMessage: 'rpm'
  }) : _i18n.i18n.translate('xpack.apm.formatters.transactionsPerMinLabel', {
    defaultMessage: 'tpm'
  });
}

function asPercent(numerator, denominator) {
  var fallbackResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (!denominator || isNaN(numerator)) {
    return fallbackResult;
  }

  var decimal = numerator / denominator;
  return (0, _numeral.default)(decimal).format('0.0%');
}