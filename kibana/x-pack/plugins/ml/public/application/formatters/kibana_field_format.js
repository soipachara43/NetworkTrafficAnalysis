"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaFieldFormat = kibanaFieldFormat;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Formatter which uses the fieldFormat object of a Kibana index pattern
 * field to format the value of a field.
 */
function kibanaFieldFormat(value, fieldFormat) {
  if (fieldFormat !== undefined && fieldFormat !== null) {
    return fieldFormat.convert(value, 'text');
  } else {
    return value;
  }
}