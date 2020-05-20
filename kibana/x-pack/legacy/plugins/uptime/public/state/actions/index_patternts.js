"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPatternFail = exports.getIndexPatternSuccess = exports.getIndexPattern = void 0;

var _reduxActions = require("redux-actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getIndexPattern = (0, _reduxActions.createAction)('GET_INDEX_PATTERN');
exports.getIndexPattern = getIndexPattern;
var getIndexPatternSuccess = (0, _reduxActions.createAction)('GET_INDEX_PATTERN_SUCCESS');
exports.getIndexPatternSuccess = getIndexPatternSuccess;
var getIndexPatternFail = (0, _reduxActions.createAction)('GET_INDEX_PATTERN_FAIL');
exports.getIndexPatternFail = getIndexPatternFail;