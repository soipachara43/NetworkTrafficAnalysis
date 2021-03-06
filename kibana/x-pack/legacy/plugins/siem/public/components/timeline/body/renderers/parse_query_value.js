"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryValue = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var parseQueryValue = function parseQueryValue(value) {
  if (value == null) {
    return '';
  } else if ((0, _fp.isObject)(value)) {
    return JSON.stringify(value);
  } else if ((0, _fp.isNumber)(value)) {
    return value;
  }

  return value.toString();
};

exports.parseQueryValue = parseQueryValue;