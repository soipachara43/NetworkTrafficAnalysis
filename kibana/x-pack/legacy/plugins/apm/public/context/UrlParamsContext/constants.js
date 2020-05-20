"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMEPICKER_DEFAULTS = exports.LOCATION_UPDATE = exports.TIME_RANGE_REFRESH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TIME_RANGE_REFRESH = 'TIME_RANGE_REFRESH';
exports.TIME_RANGE_REFRESH = TIME_RANGE_REFRESH;
var LOCATION_UPDATE = 'LOCATION_UPDATE';
exports.LOCATION_UPDATE = LOCATION_UPDATE;
var TIMEPICKER_DEFAULTS = {
  rangeFrom: 'now-24h',
  rangeTo: 'now',
  refreshPaused: 'true',
  refreshInterval: '0'
};
exports.TIMEPICKER_DEFAULTS = TIMEPICKER_DEFAULTS;