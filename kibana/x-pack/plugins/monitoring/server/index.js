"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = exports.plugin = void 0;

var _plugin = require("./plugin");

var _config = require("./config");

var _deprecations = require("./deprecations");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = initContext => new _plugin.Plugin(initContext);

exports.plugin = plugin;
const config = {
  schema: _config.configSchema,
  deprecations: _deprecations.deprecations
};
exports.config = config;