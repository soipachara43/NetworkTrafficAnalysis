"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asDynamicBytes = exports.getFixedByteFormatter = void 0;

var _lodash = require("lodash");

var _formatters = require("./formatters");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function asKilobytes(value) {
  return "".concat((0, _formatters.asDecimal)(value / 1000), " KB");
}

function asMegabytes(value) {
  return "".concat((0, _formatters.asDecimal)(value / 1e6), " MB");
}

function asGigabytes(value) {
  return "".concat((0, _formatters.asDecimal)(value / 1e9), " GB");
}

function asTerabytes(value) {
  return "".concat((0, _formatters.asDecimal)(value / 1e12), " TB");
}

function asBytes(value) {
  return "".concat((0, _formatters.asDecimal)(value), " B");
}

var bailIfNumberInvalid = function bailIfNumberInvalid(cb) {
  return function (val) {
    if (val === null || val === undefined || isNaN(val)) {
      return '';
    }

    return cb(val);
  };
};

var getFixedByteFormatter = (0, _lodash.memoize)(function (max) {
  var formatter = unmemoizedFixedByteFormatter(max);
  return bailIfNumberInvalid(formatter);
});
exports.getFixedByteFormatter = getFixedByteFormatter;
var asDynamicBytes = bailIfNumberInvalid(function (value) {
  return unmemoizedFixedByteFormatter(value)(value);
});
exports.asDynamicBytes = asDynamicBytes;

var unmemoizedFixedByteFormatter = function unmemoizedFixedByteFormatter(max) {
  if (max > 1e12) {
    return asTerabytes;
  }

  if (max > 1e9) {
    return asGigabytes;
  }

  if (max > 1e6) {
    return asMegabytes;
  }

  if (max > 1000) {
    return asKilobytes;
  }

  return asBytes;
};