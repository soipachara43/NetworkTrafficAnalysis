"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayFromEnum = arrayFromEnum;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function arrayFromEnum(e) {
  return Object.keys(e).filter(key => isNaN(+key)).map(name => e[name]);
}