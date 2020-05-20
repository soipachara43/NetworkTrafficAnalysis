"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callWithRequestFactory = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const callWithRequest = (0, _lodash.once)(server => {
  const cluster = server.plugins.elasticsearch.getCluster('data');
  return cluster.callWithRequest;
});

const callWithRequestFactory = (server, request) => {
  return (...args) => {
    return callWithRequest(server)(request, ...args);
  };
};

exports.callWithRequestFactory = callWithRequestFactory;