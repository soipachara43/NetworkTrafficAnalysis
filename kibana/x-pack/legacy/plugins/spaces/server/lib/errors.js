"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapError = wrapError;

var _boom = require("boom");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function wrapError(error) {
  if ((0, _boom.isBoom)(error)) {
    return error;
  }

  return (0, _boom.boomify)(error, {
    statusCode: error.status
  });
}