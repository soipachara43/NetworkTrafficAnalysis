"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTo = convertTo;
exports.asDuration = asDuration;
exports.getDurationFormatter = exports.toMicroseconds = void 0;

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

var _i18n2 = require("../../../../../../plugins/apm/common/i18n");

var _formatters = require("./formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var durationUnit = {
  hours: {
    label: _i18n.i18n.translate('xpack.apm.formatters.hoursTimeUnitLabel', {
      defaultMessage: 'h'
    }),
    convert: function convert(value) {
      return (0, _formatters.asDecimal)(_moment.default.duration(value / 1000).asHours());
    }
  },
  minutes: {
    label: _i18n.i18n.translate('xpack.apm.formatters.minutesTimeUnitLabel', {
      defaultMessage: 'min'
    }),
    convert: function convert(value) {
      return (0, _formatters.asDecimal)(_moment.default.duration(value / 1000).asMinutes());
    }
  },
  seconds: {
    label: _i18n.i18n.translate('xpack.apm.formatters.secondsTimeUnitLabel', {
      defaultMessage: 's'
    }),
    convert: function convert(value) {
      return (0, _formatters.asDecimal)(_moment.default.duration(value / 1000).asSeconds());
    }
  },
  milliseconds: {
    label: _i18n.i18n.translate('xpack.apm.formatters.millisTimeUnitLabel', {
      defaultMessage: 'ms'
    }),
    convert: function convert(value) {
      return (0, _formatters.asInteger)(_moment.default.duration(value / 1000).asMilliseconds());
    }
  },
  microseconds: {
    label: _i18n.i18n.translate('xpack.apm.formatters.microsTimeUnitLabel', {
      defaultMessage: 'μs'
    }),
    convert: function convert(value) {
      return (0, _formatters.asInteger)(value);
    }
  }
};
/**
 * Converts a microseconds value into the unit defined.
 *
 * @param param0
 * { unit: "milliseconds" | "hours" | "minutes" | "seconds" | "microseconds", microseconds, defaultValue }
 *
 * @returns object { value, unit, formatted }
 */

function convertTo(_ref) {
  var unit = _ref.unit,
      microseconds = _ref.microseconds,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? _i18n2.NOT_AVAILABLE_LABEL : _ref$defaultValue;
  var duration = durationUnit[unit];

  if (!duration || microseconds == null) {
    return {
      value: defaultValue,
      formatted: defaultValue
    };
  }

  var convertedValue = duration.convert(microseconds);
  return {
    value: convertedValue,
    unit: duration.label,
    formatted: "".concat(convertedValue, " ").concat(duration.label)
  };
}

var toMicroseconds = function toMicroseconds(value, timeUnit) {
  return _moment.default.duration(value, timeUnit).asMilliseconds() * 1000;
};

exports.toMicroseconds = toMicroseconds;

function getDurationUnitKey(max) {
  if (max > toMicroseconds(1, 'hours')) {
    return 'hours';
  }

  if (max > toMicroseconds(1, 'minutes')) {
    return 'minutes';
  }

  if (max > toMicroseconds(10, 'seconds')) {
    return 'seconds';
  }

  if (max > toMicroseconds(10, 'milliseconds')) {
    return 'milliseconds';
  }

  return 'microseconds';
}

var getDurationFormatter = (0, _lodash.memoize)(function (max) {
  var unit = getDurationUnitKey(max);
  return function (value) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        defaultValue = _ref2.defaultValue;

    return convertTo({
      unit: unit,
      microseconds: value,
      defaultValue: defaultValue
    });
  };
});
/**
 * Converts value and returns it formatted - 00 unit
 *
 * @param value
 * @param param1 { defaultValue }
 * @returns formated value - 00 unit
 */

exports.getDurationFormatter = getDurationFormatter;

function asDuration(value) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref3$defaultValue = _ref3.defaultValue,
      defaultValue = _ref3$defaultValue === void 0 ? _i18n2.NOT_AVAILABLE_LABEL : _ref3$defaultValue;

  if (value == null) {
    return defaultValue;
  }

  var formatter = getDurationFormatter(value);
  return formatter(value, {
    defaultValue: defaultValue
  }).formatted;
}