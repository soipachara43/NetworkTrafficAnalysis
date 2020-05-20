"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGenerateCsv = createGenerateCsv;

var _boom = require("boom");

var _generate_csv_search = require("./generate_csv_search");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createGenerateCsv(reporting, server, elasticsearch, logger) {
  return async function generateCsv(request, visType, panel, jobParams) {
    // This should support any vis type that is able to fetch
    // and model data on the server-side
    // This structure will not be needed when the vis data just consists of an
    // expression that we could run through the interpreter to get csv
    switch (visType) {
      case 'search':
        return await (0, _generate_csv_search.generateCsvSearch)(request, reporting, server, elasticsearch, logger, panel, jobParams);

      default:
        throw (0, _boom.badRequest)(`Unsupported or unrecognized saved object type: ${visType}`);
    }
  };
}