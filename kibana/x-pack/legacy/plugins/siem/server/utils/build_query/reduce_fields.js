"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceFields = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const reduceFields = (fields, fieldMap) => fields.reduce((res, field) => fieldMap[field] != null ? [...res, fieldMap[field]] : res, []);

exports.reduceFields = reduceFields;