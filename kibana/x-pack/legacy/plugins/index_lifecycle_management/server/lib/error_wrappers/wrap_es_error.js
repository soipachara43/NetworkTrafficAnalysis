"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapEsError = wrapEsError;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Wraps an error thrown by the ES JS client into a Boom error response and returns it
 *
 * @param err Object Error thrown by ES JS client
 * @param statusCodeToMessageMap Object Optional map of HTTP status codes => error messages
 * @return Object Boom error response
 */
function wrapEsError(err, statusCodeToMessageMap = {}) {
  const statusCode = err.statusCode; // If no custom message if specified for the error's status code, just
  // wrap the error as a Boom error response and return it

  if (!statusCodeToMessageMap[statusCode]) {
    return _boom.default.boomify(err, {
      statusCode
    });
  } // Otherwise, use the custom message to create a Boom error response and
  // return it


  const message = statusCodeToMessageMap[statusCode];
  return new _boom.default(message, {
    statusCode
  });
}