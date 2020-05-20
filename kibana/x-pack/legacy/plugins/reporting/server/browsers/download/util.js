"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.asyncMap = asyncMap;
exports.readableEnd = readableEnd;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Log a message if the DEBUG environment variable is set
 */
function log(...args) {
  if (process.env.DEBUG) {
    // allow console log since this is off by default and only for debugging
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}
/**
 * Iterate an array asynchronously and in parallel
 */


function asyncMap(array, asyncFn) {
  return Promise.all(array.map(asyncFn));
}
/**
 * Wait for a readable stream to end
 */


function readableEnd(stream) {
  return new Promise((resolve, reject) => {
    stream.on('error', reject).on('end', resolve);
  });
}