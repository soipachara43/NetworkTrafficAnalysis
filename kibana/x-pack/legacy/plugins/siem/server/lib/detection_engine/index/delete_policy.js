"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePolicy = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const deletePolicy = async (callWithRequest, policy) => {
  return callWithRequest('transport.request', {
    path: `/_ilm/policy/${policy}`,
    method: 'DELETE'
  });
};

exports.deletePolicy = deletePolicy;