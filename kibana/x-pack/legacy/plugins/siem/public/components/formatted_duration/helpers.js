"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHumanizedDuration = exports.getFormattedDurationString = exports.ONE_YEAR = exports.ONE_MONTH = exports.ONE_DAY = exports.ONE_HOUR = exports.ONE_MINUTE = exports.ONE_SECOND = exports.ONE_MILLISECOND_AS_NANOSECONDS = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _empty_value = require("../empty_value");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** one millisecond (as nanoseconds) */
var ONE_MILLISECOND_AS_NANOSECONDS = 1000000;
exports.ONE_MILLISECOND_AS_NANOSECONDS = ONE_MILLISECOND_AS_NANOSECONDS;
var ONE_SECOND = 1000;
exports.ONE_SECOND = ONE_SECOND;
var ONE_MINUTE = 60000;
exports.ONE_MINUTE = ONE_MINUTE;
var ONE_HOUR = 3600000;
exports.ONE_HOUR = ONE_HOUR;
var ONE_DAY = 86400000; // ms

exports.ONE_DAY = ONE_DAY;
var ONE_MONTH = 2592000000; // ms

exports.ONE_MONTH = ONE_MONTH;
var ONE_YEAR = 31536000000; // ms

exports.ONE_YEAR = ONE_YEAR;

var milliseconds = function milliseconds(duration) {
  return Number.isInteger(duration.milliseconds()) ? "".concat(duration.milliseconds(), "ms") : "".concat(duration.milliseconds().toFixed(6), "ms");
}; // nanosecond precision


var seconds = function seconds(duration) {
  return "".concat(duration.seconds().toFixed(), "s").concat(duration.milliseconds() > 0 ? " ".concat(milliseconds(duration)) : '');
};

var minutes = function minutes(duration) {
  return "".concat(duration.minutes(), "m ").concat(seconds(duration));
};

var hours = function hours(duration) {
  return "".concat(duration.hours(), "h ").concat(minutes(duration));
};

var days = function days(duration) {
  return "".concat(duration.days(), "d ").concat(hours(duration));
};

var months = function months(duration) {
  return "".concat(duration.years() > 0 || duration.months() > 0 ? "".concat(duration.months(), "m ") : '').concat(days(duration));
};

var years = function years(duration) {
  return "".concat(duration.years() > 0 ? "".concat(duration.years(), "y ") : '').concat(months(duration));
};

var getFormattedDurationString = function getFormattedDurationString(maybeDurationNanoseconds) {
  var totalNanoseconds = Number(maybeDurationNanoseconds);

  if (maybeDurationNanoseconds == null) {
    return (0, _empty_value.getEmptyValue)();
  }

  if (Number.isNaN(totalNanoseconds) || totalNanoseconds < 0) {
    return "".concat(maybeDurationNanoseconds); // echo back the duration as a string
  }

  if (totalNanoseconds < ONE_MILLISECOND_AS_NANOSECONDS) {
    return "".concat(totalNanoseconds, "ns"); // display the raw nanoseconds
  }

  var duration = _moment.default.duration(totalNanoseconds / ONE_MILLISECOND_AS_NANOSECONDS);

  var totalMs = duration.asMilliseconds();

  if (totalMs < ONE_SECOND) {
    return milliseconds(duration);
  } else if (totalMs < ONE_MINUTE) {
    return seconds(duration);
  } else if (totalMs < ONE_HOUR) {
    return minutes(duration);
  } else if (totalMs < ONE_DAY) {
    return hours(duration);
  } else if (totalMs < ONE_MONTH) {
    return days(duration);
  } else if (totalMs < ONE_YEAR) {
    return months(duration);
  } else {
    return years(duration);
  }
};

exports.getFormattedDurationString = getFormattedDurationString;

var getHumanizedDuration = function getHumanizedDuration(maybeDurationNanoseconds) {
  if (maybeDurationNanoseconds == null) {
    return i18n.NO_DURATION;
  }

  var totalNanoseconds = Number(maybeDurationNanoseconds);

  if (Number.isNaN(totalNanoseconds) || totalNanoseconds < 0) {
    return i18n.INVALID_DURATION;
  }

  if (totalNanoseconds === 0) {
    return i18n.ZERO_NANOSECONDS;
  } else if (totalNanoseconds === 1) {
    return i18n.A_NANOSECOND;
  } else if (totalNanoseconds < ONE_MILLISECOND_AS_NANOSECONDS) {
    return i18n.A_FEW_NANOSECONDS;
  } else if (totalNanoseconds === ONE_MILLISECOND_AS_NANOSECONDS) {
    return i18n.A_MILLISECOND;
  }

  var totalMs = totalNanoseconds / ONE_MILLISECOND_AS_NANOSECONDS;

  if (totalMs < ONE_SECOND) {
    return i18n.A_FEW_MILLISECONDS;
  } else if (totalMs === ONE_SECOND) {
    return i18n.A_SECOND;
  } else {
    return _moment.default.duration(totalMs).humanize();
  }
};

exports.getHumanizedDuration = getHumanizedDuration;