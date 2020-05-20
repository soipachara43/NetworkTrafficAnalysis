"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callWithRequestFactory = void 0;

var _lodash = require("lodash");

var _elasticsearch_rollup = require("../../client/elasticsearch_rollup");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const callWithRequest = (0, _lodash.once)(elasticsearchService => {
  const config = {
    plugins: [_elasticsearch_rollup.elasticsearchJsPlugin]
  };
  return elasticsearchService.createClient('rollup', config);
});

const callWithRequestFactory = (elasticsearchService, request) => {
  return (...args) => {
    return callWithRequest(elasticsearchService).asScoped(request) // @ts-ignore
    .callAsCurrentUser(...args);
  };
};

exports.callWithRequestFactory = callWithRequestFactory;