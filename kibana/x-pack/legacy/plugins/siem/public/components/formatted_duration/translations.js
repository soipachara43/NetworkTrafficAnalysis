"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZERO_NANOSECONDS = exports.A_SECOND = exports.A_FEW_MILLISECONDS = exports.A_MILLISECOND = exports.A_FEW_NANOSECONDS = exports.A_NANOSECOND = exports.INVALID_DURATION = exports.NO_DURATION = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NO_DURATION = _i18n.i18n.translate('xpack.siem.formatted.duration.noDurationTooltip', {
  defaultMessage: 'no duration'
});

exports.NO_DURATION = NO_DURATION;

var INVALID_DURATION = _i18n.i18n.translate('xpack.siem.formatted.duration.invalidDurationTooltip', {
  defaultMessage: 'invalid duration'
});

exports.INVALID_DURATION = INVALID_DURATION;

var A_NANOSECOND = _i18n.i18n.translate('xpack.siem.formatted.duration.aNanosecondTooltip', {
  defaultMessage: 'a nanosecond'
});

exports.A_NANOSECOND = A_NANOSECOND;

var A_FEW_NANOSECONDS = _i18n.i18n.translate('xpack.siem.formatted.duration.aFewNanosecondsTooltip', {
  defaultMessage: 'a few nanoseconds'
});

exports.A_FEW_NANOSECONDS = A_FEW_NANOSECONDS;

var A_MILLISECOND = _i18n.i18n.translate('xpack.siem.formatted.duration.aMillisecondTooltip', {
  defaultMessage: 'a millisecond'
});

exports.A_MILLISECOND = A_MILLISECOND;

var A_FEW_MILLISECONDS = _i18n.i18n.translate('xpack.siem.formatted.duration.aFewMillisecondsTooltip', {
  defaultMessage: 'a few milliseconds'
});

exports.A_FEW_MILLISECONDS = A_FEW_MILLISECONDS;

var A_SECOND = _i18n.i18n.translate('xpack.siem.formatted.duration.aSecondTooltip', {
  defaultMessage: 'a second'
});

exports.A_SECOND = A_SECOND;

var ZERO_NANOSECONDS = _i18n.i18n.translate('xpack.siem.formatted.duration.zeroNanosecondsTooltip', {
  defaultMessage: 'zero nanoseconds'
});

exports.ZERO_NANOSECONDS = ZERO_NANOSECONDS;