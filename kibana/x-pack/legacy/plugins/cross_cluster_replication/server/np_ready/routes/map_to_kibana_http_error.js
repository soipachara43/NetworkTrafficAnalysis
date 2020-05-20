"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapErrorToKibanaHttpResponse = void 0;

var _server = require("../../../../../../../src/core/server");

var _error_wrappers = require("../lib/error_wrappers");

var _is_es_error = require("../lib/is_es_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const mapErrorToKibanaHttpResponse = err => {
  if ((0, _is_es_error.isEsError)(err)) {
    const {
      statusCode,
      message,
      body
    } = (0, _error_wrappers.wrapEsError)(err);
    return _server.kibanaResponseFactory.customError({
      statusCode,
      body: {
        message,
        attributes: {
          cause: body === null || body === void 0 ? void 0 : body.cause
        }
      }
    });
  }

  return _server.kibanaResponseFactory.internalError(err);
};

exports.mapErrorToKibanaHttpResponse = mapErrorToKibanaHttpResponse;