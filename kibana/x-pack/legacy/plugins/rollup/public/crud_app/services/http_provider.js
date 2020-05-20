"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHttp = setHttp;
exports.getHttp = getHttp;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var _http = null;

function setHttp(http) {
  _http = http;
}

function getHttp() {
  if (!_http) {
    throw new Error('Rollup http is not defined');
  }

  return _http;
}