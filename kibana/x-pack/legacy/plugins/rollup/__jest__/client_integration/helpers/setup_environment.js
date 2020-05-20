"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockHttpRequest = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const mockHttpRequest = (http, {
  jobs = {},
  createdJob = {},
  indxPatternVldtResp = {}
} = {}) => {
  http.get.mockImplementation(async url => {
    if (url === '/api/rollup/jobs') {
      return jobs;
    }

    if (url.startsWith('/api/rollup/index_pattern_validity')) {
      return {
        doesMatchIndices: true,
        doesMatchRollupIndices: false,
        dateFields: ['foo', 'bar'],
        numericFields: [],
        keywordFields: [],
        ...indxPatternVldtResp
      };
    }

    return {};
  }); // mock '/api/rollup/start'

  http.post.mockImplementation(async url => ({})); // mock '/api/rollup/create

  http.put.mockImplementation(async url => createdJob);
};

exports.mockHttpRequest = mockHttpRequest;