"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConfig$ = createConfig$;
exports.ConfigSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ConfigSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  maxSpaces: _configSchema.schema.number({
    defaultValue: 1000
  })
});

exports.ConfigSchema = ConfigSchema;

function createConfig$(context) {
  return context.config.create();
}