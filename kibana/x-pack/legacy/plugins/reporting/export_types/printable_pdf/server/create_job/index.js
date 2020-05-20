"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJobFactory = void 0;

var _validate_urls = require("../../../../common/validate_urls");

var _crypto = require("../../../../server/lib/crypto");

var _compatibility_shim = require("./compatibility_shim");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped module
const createJobFactory = function createJobFactoryFn(reporting, server, elasticsearch, logger) {
  const compatibilityShim = (0, _compatibility_shim.compatibilityShimFactory)(server, logger);
  const crypto = (0, _crypto.cryptoFactory)(server);
  return compatibilityShim(async function createJobFn({
    objectType,
    title,
    relativeUrls,
    browserTimezone,
    layout
  }, headers, request) {
    const serializedEncryptedHeaders = await crypto.encrypt(headers);
    (0, _validate_urls.validateUrls)(relativeUrls);
    return {
      basePath: request.getBasePath(),
      browserTimezone,
      forceNow: new Date().toISOString(),
      headers: serializedEncryptedHeaders,
      layout,
      objects: relativeUrls.map(u => ({
        relativeUrl: u
      })),
      title,
      type: objectType // Note: this changes the shape of the job params object

    };
  });
};

exports.createJobFactory = createJobFactory;