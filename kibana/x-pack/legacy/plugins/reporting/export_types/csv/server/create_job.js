"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJobFactory = void 0;

var _crypto = require("../../../server/lib/crypto");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createJobFactory = function createJobFactoryFn(reporting, server) {
  const crypto = (0, _crypto.cryptoFactory)(server);
  return async function createJob(jobParams, headers, request) {
    const serializedEncryptedHeaders = await crypto.encrypt(headers);
    const savedObjectsClient = request.getSavedObjectsClient();
    const indexPatternSavedObject = await savedObjectsClient.get('index-pattern', jobParams.indexPatternId);
    return {
      headers: serializedEncryptedHeaders,
      indexPatternSavedObject,
      basePath: request.getBasePath(),
      ...jobParams
    };
  };
};

exports.createJobFactory = createJobFactory;