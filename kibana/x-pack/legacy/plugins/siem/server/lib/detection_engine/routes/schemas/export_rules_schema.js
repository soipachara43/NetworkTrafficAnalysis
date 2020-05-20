"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportRulesQuerySchema = exports.exportRulesSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _schemas = require("./schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-disable @typescript-eslint/camelcase */
const exportRulesSchema = _joi.default.object({
  objects: _schemas.objects
}).min(1).allow(null);

exports.exportRulesSchema = exportRulesSchema;

const exportRulesQuerySchema = _joi.default.object({
  file_name: _schemas.file_name.default('export.ndjson'),
  exclude_export_details: _schemas.exclude_export_details.default(false)
});

exports.exportRulesQuerySchema = exportRulesQuerySchema;