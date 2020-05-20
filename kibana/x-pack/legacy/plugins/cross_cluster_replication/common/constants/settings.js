"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOLLOWER_INDEX_ADVANCED_SETTINGS = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const FOLLOWER_INDEX_ADVANCED_SETTINGS = {
  maxReadRequestOperationCount: 5120,
  maxOutstandingReadRequests: 12,
  maxReadRequestSize: '32mb',
  maxWriteRequestOperationCount: 5120,
  maxWriteRequestSize: '9223372036854775807b',
  maxOutstandingWriteRequests: 9,
  maxWriteBufferCount: 2147483647,
  maxWriteBufferSize: '512mb',
  maxRetryDelay: '500ms',
  readPollTimeout: '1m'
};
exports.FOLLOWER_INDEX_ADVANCED_SETTINGS = FOLLOWER_INDEX_ADVANCED_SETTINGS;