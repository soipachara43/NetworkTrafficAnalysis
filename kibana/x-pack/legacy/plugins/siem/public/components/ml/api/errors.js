"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMlStartJobError = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// use the "in operator" and regular type guards to do a narrow once this issue is fixed below:
// https://github.com/microsoft/TypeScript/issues/21732
// Otherwise for now, has will work ok even though it casts 'unknown' to 'any'
var isMlStartJobError = function isMlStartJobError(value) {
  return (0, _fp.has)('error.msg', value) && (0, _fp.has)('error.response', value) && (0, _fp.has)('error.statusCode', value);
};

exports.isMlStartJobError = isMlStartJobError;