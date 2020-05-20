"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDriverFactory = createDriverFactory;
Object.defineProperty(exports, "paths", {
  enumerable: true,
  get: function () {
    return _paths.paths;
  }
});

var _driver_factory = require("./driver_factory");

var _paths = require("./paths");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createDriverFactory(binaryPath, logger, browserConfig, captureConfig) {
  return new _driver_factory.HeadlessChromiumDriverFactory(binaryPath, logger, browserConfig, captureConfig);
}