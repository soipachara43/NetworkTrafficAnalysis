"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPolicy = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const setPolicy = async (callWithRequest, policy, body) => {
  return callWithRequest('transport.request', {
    path: `/_ilm/policy/${policy}`,
    method: 'PUT',
    body
  });
};

exports.setPolicy = setPolicy;