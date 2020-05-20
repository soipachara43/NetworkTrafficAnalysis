"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPingHistogramFail = exports.getPingHistogramSuccess = exports.getPingHistogram = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getPingHistogram = (0, _reduxActions.createAction)('GET_PING_HISTOGRAM');
exports.getPingHistogram = getPingHistogram;
var getPingHistogramSuccess = (0, _reduxActions.createAction)('GET_PING_HISTOGRAM_SUCCESS');
exports.getPingHistogramSuccess = getPingHistogramSuccess;
var getPingHistogramFail = (0, _reduxActions.createAction)('GET_PING_HISTOGRAM_FAIL');
exports.getPingHistogramFail = getPingHistogramFail;