"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositiveInteger = void 0;

var t = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Types the positive integer are:
 *   - Natural Number (positive integer and not a float),
 *   - zero or greater
 */
const PositiveInteger = new t.Type('PositiveInteger', t.number.is, (input, context) => {
  return typeof input === 'number' && Number.isSafeInteger(input) && input >= 0 ? t.success(input) : t.failure(input, context);
}, t.identity);
exports.PositiveInteger = PositiveInteger;