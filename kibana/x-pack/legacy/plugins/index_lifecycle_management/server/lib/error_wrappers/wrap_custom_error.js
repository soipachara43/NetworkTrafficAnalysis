"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapCustomError = wrapCustomError;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Wraps a custom error into a Boom error response and returns it
 *
 * @param err Object error
 * @param statusCode Error status code
 * @return Object Boom error response
 */
function wrapCustomError(err, statusCode) {
  return _boom.default.boomify(err, {
    statusCode
  });
}