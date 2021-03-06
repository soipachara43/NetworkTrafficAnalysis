"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isColumnReference = isColumnReference;

var _tinymath = require("tinymath");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped Library
function isColumnReference(mathExpression) {
  if (mathExpression == null) {
    mathExpression = 'null';
  }

  const parsedMath = (0, _tinymath.parse)(mathExpression);
  return typeof parsedMath === 'string';
}