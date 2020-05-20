"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = void 0;

var _history = require("history");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Make history singleton available across APM project
// TODO: Explore using React context or hook instead?
var history = (0, _history.createHashHistory)();
exports.history = history;