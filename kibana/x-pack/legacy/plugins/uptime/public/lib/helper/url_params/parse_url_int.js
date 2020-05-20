"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUrlInt = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: add a comment explaining the purpose of this function
var parseUrlInt = function parseUrlInt(value, defaultValue) {
  var parsed = parseInt(value || '', 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

exports.parseUrlInt = parseUrlInt;