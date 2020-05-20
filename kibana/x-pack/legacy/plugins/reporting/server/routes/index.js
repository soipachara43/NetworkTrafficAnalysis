"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _generation = require("./generation");

var _jobs = require("./jobs");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerRoutes(reporting, server, plugins, logger) {
  (0, _generation.registerJobGenerationRoutes)(reporting, server, plugins, logger);
  (0, _jobs.registerJobInfoRoutes)(reporting, server, plugins, logger);
}