"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTickFormat = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTickFormat = function getTickFormat(value) {
  var parsedNumber = Number(value);

  if (isNaN(parsedNumber) || value === null) {
    return 'N/A';
  }

  return parsedNumber.toFixed();
};

exports.getTickFormat = getTickFormat;