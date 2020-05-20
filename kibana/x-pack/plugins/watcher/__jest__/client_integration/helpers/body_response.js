"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwrapBodyResponse = exports.wrapBodyResponse = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const wrapBodyResponse = obj => JSON.stringify({
  body: JSON.stringify(obj)
});

exports.wrapBodyResponse = wrapBodyResponse;

const unwrapBodyResponse = string => JSON.parse(JSON.parse(string).body);

exports.unwrapBodyResponse = unwrapBodyResponse;