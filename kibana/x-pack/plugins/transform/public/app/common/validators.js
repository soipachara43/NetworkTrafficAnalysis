"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayValidator = delayValidator;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Validates time delay input.
 * Doesn't allow floating intervals.
 * @param value User input value.
 */
function delayValidator(value) {
  return value.match(/^(0|\d*(nanos|micros|ms|s|m|h|d))$/) !== null;
}