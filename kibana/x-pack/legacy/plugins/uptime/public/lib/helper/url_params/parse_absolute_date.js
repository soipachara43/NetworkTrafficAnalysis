"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseAbsoluteDate = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var parseAbsoluteDate = function parseAbsoluteDate(date, defaultValue) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var momentWrapper = _datemath.default.parse(date, options);

  if (momentWrapper) {
    return momentWrapper.valueOf();
  }

  return defaultValue;
};

exports.parseAbsoluteDate = parseAbsoluteDate;