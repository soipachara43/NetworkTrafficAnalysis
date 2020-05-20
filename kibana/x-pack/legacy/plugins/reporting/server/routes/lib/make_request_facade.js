"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequestFacade = makeRequestFacade;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function makeRequestFacade(request) {
  // This condition is for unit tests
  const getSavedObjectsClient = request.getSavedObjectsClient ? request.getSavedObjectsClient.bind(request) : request.getSavedObjectsClient;
  return {
    getSavedObjectsClient,
    headers: request.headers,
    params: request.params,
    payload: request.payload,
    query: request.query,
    pre: request.pre,
    getBasePath: request.getBasePath,
    route: request.route,
    getRawRequest: () => request
  };
}