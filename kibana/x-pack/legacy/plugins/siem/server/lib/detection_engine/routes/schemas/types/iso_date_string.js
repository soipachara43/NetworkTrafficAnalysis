"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsoDateString = void 0;

var t = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Types the IsoDateString as:
 *   - A string that is an ISOString
 */
const IsoDateString = new t.Type('IsoDateString', t.string.is, (input, context) => {
  if (typeof input === 'string') {
    try {
      const parsed = new Date(input);

      if (parsed.toISOString() === input) {
        return t.success(input);
      } else {
        return t.failure(input, context);
      }
    } catch (err) {
      return t.failure(input, context);
    }
  } else {
    return t.failure(input, context);
  }
}, t.identity);
exports.IsoDateString = IsoDateString;