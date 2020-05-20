"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL_STATE_KEYS = exports.ALL_URL_STATE_KEYS = void 0;

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ALL_URL_STATE_KEYS = [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline];
exports.ALL_URL_STATE_KEYS = ALL_URL_STATE_KEYS;
var URL_STATE_KEYS = {
  detections: [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline],
  host: [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline],
  network: [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline],
  overview: [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline],
  timeline: [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline],
  case: [_constants.CONSTANTS.appQuery, _constants.CONSTANTS.filters, _constants.CONSTANTS.savedQuery, _constants.CONSTANTS.timerange, _constants.CONSTANTS.timeline]
};
exports.URL_STATE_KEYS = URL_STATE_KEYS;