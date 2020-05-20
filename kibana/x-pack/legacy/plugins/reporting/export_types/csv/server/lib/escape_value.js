"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEscapeValue = createEscapeValue;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const nonAlphaNumRE = /[^a-zA-Z0-9]/;
const allDoubleQuoteRE = /"/g;

function createEscapeValue(quoteValues) {
  return function escapeValue(val) {
    if (val && typeof val === 'string') {
      if (quoteValues && nonAlphaNumRE.test(val)) {
        return `"${val.replace(allDoubleQuoteRE, '""')}"`;
      }
    }

    return val == null ? '' : val.toString();
  };
}