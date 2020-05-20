"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapRequest = wrapRequest;

var _adapter_types = require("../lib/adapters/framework/adapter_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function wrapRequest(req) {
  const {
    params,
    payload,
    query,
    headers,
    info
  } = req;
  const isAuthenticated = headers.authorization != null;
  return {
    // @ts-ignore -- partial applucation, adapter adds other user data
    user: isAuthenticated ? {
      kind: 'authenticated',
      [_adapter_types.internalAuthData]: headers
    } : {
      kind: 'unauthenticated'
    },
    headers,
    info,
    params,
    payload,
    query
  };
}