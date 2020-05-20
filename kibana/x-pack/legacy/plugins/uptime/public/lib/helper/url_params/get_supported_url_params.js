"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupportedUrlParams = void 0;

var _parse_is_paused = require("./parse_is_paused");

var _parse_url_int = require("./parse_url_int");

var _constants = require("../../../../common/constants");

var _parse_absolute_date = require("./parse_absolute_date");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ABSOLUTE_DATE_RANGE_START = _constants.CLIENT_DEFAULTS.ABSOLUTE_DATE_RANGE_START,
    ABSOLUTE_DATE_RANGE_END = _constants.CLIENT_DEFAULTS.ABSOLUTE_DATE_RANGE_END,
    AUTOREFRESH_INTERVAL = _constants.CLIENT_DEFAULTS.AUTOREFRESH_INTERVAL,
    AUTOREFRESH_IS_PAUSED = _constants.CLIENT_DEFAULTS.AUTOREFRESH_IS_PAUSED,
    DATE_RANGE_START = _constants.CLIENT_DEFAULTS.DATE_RANGE_START,
    DATE_RANGE_END = _constants.CLIENT_DEFAULTS.DATE_RANGE_END,
    SEARCH = _constants.CLIENT_DEFAULTS.SEARCH,
    SELECTED_PING_LIST_STATUS = _constants.CLIENT_DEFAULTS.SELECTED_PING_LIST_STATUS,
    FILTERS = _constants.CLIENT_DEFAULTS.FILTERS,
    STATUS_FILTER = _constants.CLIENT_DEFAULTS.STATUS_FILTER;
/**
 * Gets the current URL values for the application. If no item is present
 * for the URL, a default value is supplied.
 *
 * @param params A set of key-value pairs where the value is either
 * undefined or a string/string array. If a string array is passed,
 * only the first item is chosen. Support for lists in the URL will
 * require further development.
 */

var getSupportedUrlParams = function getSupportedUrlParams(params) {
  var filteredParams = {};
  Object.keys(params).forEach(function (key) {
    var value;

    if (params[key] === undefined) {
      value = undefined;
    } else if (Array.isArray(params[key])) {
      // @ts-ignore this must be an array, and it's ok if the
      // 0th element is undefined
      value = params[key][0];
    } else {
      // @ts-ignore this will not be an array because the preceding
      // block tests for that
      value = params[key];
    }

    filteredParams[key] = value;
  });
  var autorefreshInterval = filteredParams.autorefreshInterval,
      autorefreshIsPaused = filteredParams.autorefreshIsPaused,
      dateRangeStart = filteredParams.dateRangeStart,
      dateRangeEnd = filteredParams.dateRangeEnd,
      filters = filteredParams.filters,
      search = filteredParams.search,
      selectedPingStatus = filteredParams.selectedPingStatus,
      statusFilter = filteredParams.statusFilter,
      pagination = filteredParams.pagination;
  return {
    absoluteDateRangeStart: (0, _parse_absolute_date.parseAbsoluteDate)(dateRangeStart || DATE_RANGE_START, ABSOLUTE_DATE_RANGE_START),
    absoluteDateRangeEnd: (0, _parse_absolute_date.parseAbsoluteDate)(dateRangeEnd || DATE_RANGE_END, ABSOLUTE_DATE_RANGE_END, {
      roundUp: true
    }),
    autorefreshInterval: (0, _parse_url_int.parseUrlInt)(autorefreshInterval, AUTOREFRESH_INTERVAL),
    autorefreshIsPaused: (0, _parse_is_paused.parseIsPaused)(autorefreshIsPaused, AUTOREFRESH_IS_PAUSED),
    dateRangeStart: dateRangeStart || DATE_RANGE_START,
    dateRangeEnd: dateRangeEnd || DATE_RANGE_END,
    filters: filters || FILTERS,
    search: search || SEARCH,
    selectedPingStatus: selectedPingStatus === undefined ? SELECTED_PING_LIST_STATUS : selectedPingStatus,
    statusFilter: statusFilter || STATUS_FILTER,
    pagination: pagination
  };
};

exports.getSupportedUrlParams = getSupportedUrlParams;