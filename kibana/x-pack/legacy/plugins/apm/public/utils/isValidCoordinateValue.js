"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidCoordinateValue = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isValidCoordinateValue = function isValidCoordinateValue(value) {
  return value !== null && value !== undefined;
};

exports.isValidCoordinateValue = isValidCoordinateValue;