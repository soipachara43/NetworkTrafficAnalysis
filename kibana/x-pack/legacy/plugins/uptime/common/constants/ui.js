"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHORT_TIMESPAN_LOCALE = exports.SHORT_TS_LOCALE = exports.UNNAMED_LOCATION = exports.ML_MODULE_ID = exports.ML_JOB_ID = exports.STATUS = exports.SETTINGS_ROUTE = exports.OVERVIEW_ROUTE = exports.MONITOR_ROUTE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const MONITOR_ROUTE = '/monitor/:monitorId?';
exports.MONITOR_ROUTE = MONITOR_ROUTE;
const OVERVIEW_ROUTE = '/';
exports.OVERVIEW_ROUTE = OVERVIEW_ROUTE;
const SETTINGS_ROUTE = '/settings';
exports.SETTINGS_ROUTE = SETTINGS_ROUTE;
let STATUS;
exports.STATUS = STATUS;

(function (STATUS) {
  STATUS["UP"] = "up";
  STATUS["DOWN"] = "down";
})(STATUS || (exports.STATUS = STATUS = {}));

const ML_JOB_ID = 'high_latency_by_geo';
exports.ML_JOB_ID = ML_JOB_ID;
const ML_MODULE_ID = 'uptime_heartbeat';
exports.ML_MODULE_ID = ML_MODULE_ID;
const UNNAMED_LOCATION = 'Unnamed-location';
exports.UNNAMED_LOCATION = UNNAMED_LOCATION;
const SHORT_TS_LOCALE = 'en-short-locale';
exports.SHORT_TS_LOCALE = SHORT_TS_LOCALE;
const SHORT_TIMESPAN_LOCALE = {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%ds',
    ss: '%ss',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%d Mon',
    MM: '%d Mon',
    y: '%d Yr',
    yy: '%d Yr'
  }
};
exports.SHORT_TIMESPAN_LOCALE = SHORT_TIMESPAN_LOCALE;