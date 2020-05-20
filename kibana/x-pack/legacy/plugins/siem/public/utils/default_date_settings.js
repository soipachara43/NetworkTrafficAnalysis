"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateWithDefault = exports.getIntervalSettings = exports.getTimeRangeSettings = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _moment = _interopRequireDefault(require("moment"));

var _fp = require("lodash/fp");

var _constants = require("../../common/constants");

var _kibana = require("../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Defaults for if everything fails including dateMath.parse(DEFAULT_FROM) or dateMath.parse(DEFAULT_TO)
// These should not really be hit unless we are in an extreme buggy state.
var DEFAULT_FROM_MOMENT = (0, _moment.default)().subtract(24, 'hours');
var DEFAULT_TO_MOMENT = (0, _moment.default)();
/**
 * Retrieves timeRange settings to populate filters
 *
 * @param {Boolean} uiSettings Whether to respect the user's UI settings. Defaults to true.
 */

var getTimeRangeSettings = function getTimeRangeSettings() {
  var uiSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var timeRange = uiSettings ? _kibana.KibanaServices.get().uiSettings.get(_constants.DEFAULT_SIEM_TIME_RANGE) : null;

  var fromStr = (0, _fp.isString)(timeRange === null || timeRange === void 0 ? void 0 : timeRange.from) && (timeRange === null || timeRange === void 0 ? void 0 : timeRange.from) || _constants.DEFAULT_FROM;

  var toStr = (0, _fp.isString)(timeRange === null || timeRange === void 0 ? void 0 : timeRange.to) && (timeRange === null || timeRange === void 0 ? void 0 : timeRange.to) || _constants.DEFAULT_TO;

  var from = parseDateWithDefault(fromStr, DEFAULT_FROM_MOMENT).valueOf();
  var to = parseDateWithDefault(toStr, DEFAULT_TO_MOMENT).valueOf();
  return {
    from: from,
    fromStr: fromStr,
    to: to,
    toStr: toStr
  };
};
/**
 * Retrieves refreshInterval settings to populate filters
 *
 * @param {Boolean} uiSettings Whether to respect the user's UI settings. Defaults to true.
 */


exports.getTimeRangeSettings = getTimeRangeSettings;

var getIntervalSettings = function getIntervalSettings() {
  var uiSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var interval = uiSettings ? _kibana.KibanaServices.get().uiSettings.get(_constants.DEFAULT_SIEM_REFRESH_INTERVAL) : null;

  var duration = (0, _fp.isNumber)(interval === null || interval === void 0 ? void 0 : interval.value) && (interval === null || interval === void 0 ? void 0 : interval.value) || _constants.DEFAULT_INTERVAL_VALUE;

  var kind = (0, _fp.isBoolean)(interval === null || interval === void 0 ? void 0 : interval.pause) && !(interval === null || interval === void 0 ? void 0 : interval.pause) ? 'interval' : _constants.DEFAULT_INTERVAL_TYPE;
  return {
    kind: kind,
    duration: duration
  };
};

exports.getIntervalSettings = getIntervalSettings;

var parseDateWithDefault = function parseDateWithDefault(dateString, defaultDate) {
  var date = _datemath.default.parse(dateString);

  if (date != null && date.isValid()) {
    return date;
  } else {
    return defaultDate;
  }
};

exports.parseDateWithDefault = parseDateWithDefault;