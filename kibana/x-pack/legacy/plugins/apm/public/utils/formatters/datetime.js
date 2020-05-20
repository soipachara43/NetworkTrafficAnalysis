"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asAbsoluteDateTime = asAbsoluteDateTime;
exports.asRelativeDateTimeRange = asRelativeDateTimeRange;
exports.getDateDifference = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns the timezone set on momentTime.
 * (UTC+offset) when offset if bigger than 0.
 * (UTC-offset) when offset if lower than 0.
 * @param momentTime Moment
 */
function formatTimezone(momentTime) {
  var DEFAULT_TIMEZONE_FORMAT = 'Z';
  var utcOffsetHours = momentTime.utcOffset() / 60;
  var customTimezoneFormat = utcOffsetHours > 0 ? "+".concat(utcOffsetHours) : utcOffsetHours;
  var utcOffsetFormatted = Number.isInteger(utcOffsetHours) ? customTimezoneFormat : DEFAULT_TIMEZONE_FORMAT;
  return momentTime.format("(UTC".concat(utcOffsetFormatted, ")"));
}

function getTimeFormat(timeUnit) {
  switch (timeUnit) {
    case 'hours':
      return 'HH';

    case 'minutes':
      return 'HH:mm';

    case 'seconds':
      return 'HH:mm:ss';

    case 'milliseconds':
      return 'HH:mm:ss.SSS';

    default:
      return '';
  }
}

function getDateFormat(dateUnit) {
  switch (dateUnit) {
    case 'years':
      return 'YYYY';

    case 'months':
      return 'MMM YYYY';

    case 'days':
      return 'MMM D, YYYY';

    default:
      return '';
  }
}

var getDateDifference = function getDateDifference(start, end, unitOfTime) {
  return end.diff(start, unitOfTime);
};

exports.getDateDifference = getDateDifference;

function getFormatsAccordingToDateDifference(start, end) {
  if (getDateDifference(start, end, 'years') >= 5) {
    return {
      dateFormat: getDateFormat('years')
    };
  }

  if (getDateDifference(start, end, 'months') >= 5) {
    return {
      dateFormat: getDateFormat('months')
    };
  }

  var dateFormatWithDays = getDateFormat('days');

  if (getDateDifference(start, end, 'days') > 1) {
    return {
      dateFormat: dateFormatWithDays
    };
  }

  if (getDateDifference(start, end, 'hours') >= 5) {
    return {
      dateFormat: dateFormatWithDays,
      timeFormat: getTimeFormat('minutes')
    };
  }

  if (getDateDifference(start, end, 'minutes') >= 5) {
    return {
      dateFormat: dateFormatWithDays,
      timeFormat: getTimeFormat('seconds')
    };
  }

  return {
    dateFormat: dateFormatWithDays,
    timeFormat: getTimeFormat('milliseconds')
  };
}

function asAbsoluteDateTime(time) {
  var timeUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'milliseconds';
  var momentTime = (0, _momentTimezone.default)(time);
  var formattedTz = formatTimezone(momentTime);
  return momentTime.format("".concat(getDateFormat('days'), ", ").concat(getTimeFormat(timeUnit), " ").concat(formattedTz));
}
/**
 *
 * Returns the dates formatted according to the difference between the two dates:
 *
 * | Difference     |           Format                               |
 * | -------------- |:----------------------------------------------:|
 * | >= 5 years     | YYYY - YYYY                                    |
 * | >= 5 months    | MMM YYYY - MMM YYYY                            |
 * | > 1 day        | MMM D, YYYY - MMM D, YYYY                      |
 * | >= 5 hours     | MMM D, YYYY, HH:mm - HH:mm (UTC)               |
 * | >= 5 minutes   | MMM D, YYYY, HH:mm:ss - HH:mm:ss (UTC)         |
 * | default        | MMM D, YYYY, HH:mm:ss.SSS - HH:mm:ss.SSS (UTC) |
 *
 * @param start timestamp
 * @param end timestamp
 */


function asRelativeDateTimeRange(start, end) {
  var momentStartTime = (0, _momentTimezone.default)(start);
  var momentEndTime = (0, _momentTimezone.default)(end);

  var _getFormatsAccordingT = getFormatsAccordingToDateDifference(momentStartTime, momentEndTime),
      dateFormat = _getFormatsAccordingT.dateFormat,
      timeFormat = _getFormatsAccordingT.timeFormat;

  if (timeFormat) {
    var _startFormatted = momentStartTime.format("".concat(dateFormat, ", ").concat(timeFormat));

    var _endFormatted = momentEndTime.format(timeFormat);

    var formattedTz = formatTimezone(momentStartTime);
    return "".concat(_startFormatted, " - ").concat(_endFormatted, " ").concat(formattedTz);
  }

  var startFormatted = momentStartTime.format(dateFormat);
  var endFormatted = momentEndTime.format(dateFormat);
  return "".concat(startFormatted, " - ").concat(endFormatted);
}