"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMlAdminPermissions = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var hasMlAdminPermissions = function hasMlAdminPermissions(capabilities) {
  return getDataFeedPermissions(capabilities) && getJobPermissions(capabilities) && getFilterPermissions(capabilities) && getCalendarPermissions(capabilities);
};

exports.hasMlAdminPermissions = hasMlAdminPermissions;

var getDataFeedPermissions = function getDataFeedPermissions(_ref) {
  var capabilities = _ref.capabilities;
  return capabilities.canGetDatafeeds && capabilities.canStartStopDatafeed && capabilities.canUpdateDatafeed && capabilities.canPreviewDatafeed;
};

var getJobPermissions = function getJobPermissions(_ref2) {
  var capabilities = _ref2.capabilities;
  return capabilities.canCreateJob && capabilities.canGetJobs && capabilities.canUpdateJob && capabilities.canDeleteJob && capabilities.canOpenJob && capabilities.canCloseJob && capabilities.canForecastJob;
};

var getFilterPermissions = function getFilterPermissions(_ref3) {
  var capabilities = _ref3.capabilities;
  return capabilities.canGetFilters && capabilities.canCreateFilter && capabilities.canDeleteFilter;
};

var getCalendarPermissions = function getCalendarPermissions(_ref4) {
  var capabilities = _ref4.capabilities;
  return capabilities.canCreateCalendar && capabilities.canGetCalendars && capabilities.canDeleteCalendar;
};