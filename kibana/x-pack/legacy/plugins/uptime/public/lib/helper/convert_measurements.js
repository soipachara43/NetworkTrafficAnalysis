"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertMicrosecondsToMilliseconds = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NUM_MICROSECONDS_IN_MILLISECOND = 1000;
/**
 * This simply converts microseconds to milliseconds. People tend to prefer ms to us
 * when visualizaing request duration times.
 */

var convertMicrosecondsToMilliseconds = function convertMicrosecondsToMilliseconds(microseconds) {
  if (!microseconds && microseconds !== 0) return null;
  return Math.floor(microseconds / NUM_MICROSECONDS_IN_MILLISECOND);
};

exports.convertMicrosecondsToMilliseconds = convertMicrosecondsToMilliseconds;