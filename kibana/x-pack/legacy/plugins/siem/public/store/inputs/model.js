"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAbsoluteTimeRange = exports.isRelativeTimeRange = void 0;

var _constants = require("../../components/url_state/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isRelativeTimeRange = function isRelativeTimeRange(timeRange) {
  return timeRange.kind === 'relative';
};

exports.isRelativeTimeRange = isRelativeTimeRange;

var isAbsoluteTimeRange = function isAbsoluteTimeRange(timeRange) {
  return timeRange.kind === 'absolute';
};

exports.isAbsoluteTimeRange = isAbsoluteTimeRange;