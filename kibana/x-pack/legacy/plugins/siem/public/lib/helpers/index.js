"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gutterTimeline = exports.assertUnreachable = exports.wait = exports.asArrayIfExists = exports.decodeIpv6 = exports.encodeIpv6 = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var encodeIpv6 = function encodeIpv6(ip) {
  return ip.replace(/:/g, '-');
};

exports.encodeIpv6 = encodeIpv6;

var decodeIpv6 = function decodeIpv6(ip) {
  return ip.replace(/-/g, ':');
};

exports.decodeIpv6 = decodeIpv6;

/**
 * Wraps `value` in an array if `value` is not already an array, and returns
 * `undefined` if `value` is `undefined`
 */
var asArrayIfExists = function asArrayIfExists(value) {
  return !(0, _fp.isUndefined)(value) ? (0, _fp.castArray)(value) : undefined;
};

exports.asArrayIfExists = asArrayIfExists;

var wait = function wait() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    return setTimeout(resolve, delay);
  });
};
/**
 * Creates a Union Type for all the values of an object
 */


exports.wait = wait;

/**
 * Unreachable Assertion helper for scenarios like exhaustive switches
 *
 * @param x Unreachable field
 * @param message Message of error thrown
 */
var assertUnreachable = function assertUnreachable(x) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Unknown Field in switch statement';
  throw new Error("".concat(message, ": ").concat(x));
};
/**
 * Global variables
 */


exports.assertUnreachable = assertUnreachable;
var gutterTimeline = '70px'; // Michael: Temporary until timeline is moved.

exports.gutterTimeline = gutterTimeline;