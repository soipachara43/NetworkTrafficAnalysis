"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartDateLabel = void 0;

var _is_within_current_date = require("./is_within_current_date");

var _get_label_format = require("./get_label_format");

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Generates an appropriate date formatting string intended for the y-axis
 * label of timeseries charts. The function will return day/month values for shorter
 * timespans that cross the local date threshold, otherwise it estimates an appropriate
 * label for several different stops.
 * @param dateRangeStart the beginning of the date range
 * @param dateRangeEnd the end of the date range
 * @example a short range without crossing the date threshold
 * // Thu, 19 Jul 2001 17:50:00 GMT -> Thu, 19 Jul 2001 17:52:59 GMT
 * getChartDateLabel(995565000000, 995565179000); // returns 'mm'
 * @example a medium range that exceeds four days
 * // Sun, 15 Jul 2001 12:27:59 GMT -> Thu, 19 Jul 2001 17:52:59 GMT
 * getChartDateLabel(995200079000, 995565179000); // returns 'MM-dd'
 */
var getChartDateLabel = function getChartDateLabel(dateRangeStart, dateRangeEnd) {
  if (dateRangeStart > dateRangeEnd) {
    throw Error("Invalid date range. Received start value of ".concat(dateRangeStart, " and end value of ").concat(dateRangeEnd, "."));
  }

  var delta = dateRangeEnd - dateRangeStart;
  var formatString = '';

  if (delta < _constants.CHART_FORMAT_LIMITS.THIRTY_SIX_HOURS && !(0, _is_within_current_date.isWithinCurrentDate)(dateRangeStart, dateRangeEnd)) {
    formatString = 'MM-DD ';
  }

  return formatString + (0, _get_label_format.getLabelFormat)(delta);
};

exports.getChartDateLabel = getChartDateLabel;