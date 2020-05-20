"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isApiError = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isApiError = function isApiError(error) {
  return (0, _fp.has)('message', error) && (0, _fp.has)('body.message', error) && (0, _fp.has)('body.status_code', error);
};

exports.isApiError = isApiError;