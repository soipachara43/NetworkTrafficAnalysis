"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "METRIC_TYPE", {
  enumerable: true,
  get: function get() {
    return _analytics.METRIC_TYPE;
  }
});
Object.defineProperty(exports, "telemetryMiddleware", {
  enumerable: true,
  get: function get() {
    return _middleware.telemetryMiddleware;
  }
});
exports.TELEMETRY_EVENT = exports.initTelemetry = exports.track = void 0;

var _analytics = require("@kbn/analytics");

var _middleware = require("./middleware");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var _track;

var track = function track(type, event, count) {
  try {
    _track(type, event, count);
  } catch (error) {// ignore failed tracking call
  }
};

exports.track = track;

var initTelemetry = function initTelemetry(usageCollection, appId) {
  try {
    _track = usageCollection.reportUiStats.bind(null, appId);
  } catch (error) {// ignore failed setup here, as we'll just have an inert tracker
  }
};

exports.initTelemetry = initTelemetry;
var TELEMETRY_EVENT;
exports.TELEMETRY_EVENT = TELEMETRY_EVENT;

(function (TELEMETRY_EVENT) {
  TELEMETRY_EVENT["SIEM_RULE_ENABLED"] = "siem_rule_enabled";
  TELEMETRY_EVENT["SIEM_RULE_DISABLED"] = "siem_rule_disabled";
  TELEMETRY_EVENT["CUSTOM_RULE_ENABLED"] = "custom_rule_enabled";
  TELEMETRY_EVENT["CUSTOM_RULE_DISABLED"] = "custom_rule_disabled";
  TELEMETRY_EVENT["SIEM_JOB_ENABLED"] = "siem_job_enabled";
  TELEMETRY_EVENT["SIEM_JOB_DISABLED"] = "siem_job_disabled";
  TELEMETRY_EVENT["CUSTOM_JOB_ENABLED"] = "custom_job_enabled";
  TELEMETRY_EVENT["CUSTOM_JOB_DISABLED"] = "custom_job_disabled";
  TELEMETRY_EVENT["JOB_ENABLE_FAILURE"] = "job_enable_failure";
  TELEMETRY_EVENT["JOB_DISABLE_FAILURE"] = "job_disable_failure";
  TELEMETRY_EVENT["TIMELINE_OPENED"] = "open_timeline";
  TELEMETRY_EVENT["TIMELINE_SAVED"] = "timeline_saved";
  TELEMETRY_EVENT["TIMELINE_NAMED"] = "timeline_named";
  TELEMETRY_EVENT["TAB_CLICKED"] = "tab_";
})(TELEMETRY_EVENT || (exports.TELEMETRY_EVENT = TELEMETRY_EVENT = {}));