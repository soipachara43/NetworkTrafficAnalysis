"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEsErrorFactory = isEsErrorFactory;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const esErrorsFactory = (0, _lodash.memoize)(server => {
  return server.plugins.elasticsearch.getCluster('admin').errors;
});

function isEsErrorFactory(server) {
  const esErrors = esErrorsFactory(server);
  return function isEsError(err) {
    return err instanceof esErrors._Abstract;
  };
}