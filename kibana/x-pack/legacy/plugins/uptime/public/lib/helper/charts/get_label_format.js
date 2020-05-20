"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLabelFormat = void 0;

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EIGHT_MINUTES = _constants.CHART_FORMAT_LIMITS.EIGHT_MINUTES,
    FOUR_YEARS = _constants.CHART_FORMAT_LIMITS.FOUR_YEARS,
    THIRTY_SIX_HOURS = _constants.CHART_FORMAT_LIMITS.THIRTY_SIX_HOURS,
    THREE_WEEKS = _constants.CHART_FORMAT_LIMITS.THREE_WEEKS,
    SIX_MONTHS = _constants.CHART_FORMAT_LIMITS.SIX_MONTHS,
    NINE_DAYS = _constants.CHART_FORMAT_LIMITS.NINE_DAYS;
/**
 * Any date range that falls between these stops will have the value applied as its label.
 * The goal is to provide a helpful label for chunks of time, i.e. if a timespan covers only 12 hours but those
 * hours are intersected by a date change, we should show the month/day along with the time. The thinking here
 * is that if there are a minimum of four or more of most units, it is safe to decrease the label's resolution.
 */

var dateStops = [{
  key: EIGHT_MINUTES,
  value: 'HH:mm:ss'
}, {
  key: THIRTY_SIX_HOURS,
  value: 'HH:mm'
}, {
  key: NINE_DAYS,
  value: 'MM-DD HH:mm'
}, {
  key: THREE_WEEKS,
  value: 'MM-DD'
}, {
  key: SIX_MONTHS,
  value: 'YYYY-MM-DD'
}, {
  key: FOUR_YEARS,
  value: 'YYYY-MM'
}];
/**
 * Returns an appropriate label format bbased on pre-defined intervals.
 * @param delta The length of the timespan in milliseconds
 */

var getLabelFormat = function getLabelFormat(delta) {
  for (var index = 0; index < dateStops.length; index += 1) {
    var _dateStops$index = dateStops[index],
        key = _dateStops$index.key,
        value = _dateStops$index.value;

    if (delta < key) {
      return value;
    }
  }

  return 'yyyy';
};

exports.getLabelFormat = getLabelFormat;