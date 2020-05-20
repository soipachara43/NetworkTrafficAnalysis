"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJobFactory = void 0;

var _validate_urls = require("../../../../common/validate_urls");

var _crypto = require("../../../../server/lib/crypto");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createJobFactory = function createJobFactoryFn(reporting, server) {
  const crypto = (0, _crypto.cryptoFactory)(server);
  return async function createJob({
    objectType,
    title,
    relativeUrl,
    browserTimezone,
    layout
  }, headers, request) {
    const serializedEncryptedHeaders = await crypto.encrypt(headers);
    (0, _validate_urls.validateUrls)([relativeUrl]);
    return {
      objectType,
      title,
      relativeUrl,
      headers: serializedEncryptedHeaders,
      browserTimezone,
      layout,
      basePath: request.getBasePath(),
      forceNow: new Date().toISOString()
    };
  };
};

exports.createJobFactory = createJobFactory;