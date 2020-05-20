"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.querySignalsSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const querySignalsSchema = _joi.default.object({
  query: _joi.default.object(),
  aggs: _joi.default.object(),
  size: _joi.default.number().integer(),
  track_total_hits: _joi.default.boolean(),
  _source: _joi.default.array().items(_joi.default.string())
}).min(1);

exports.querySignalsSchema = querySignalsSchema;