"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSignalsStatusSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _schemas = require("./schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-enable @typescript-eslint/camelcase */
const setSignalsStatusSchema = _joi.default.object({
  signal_ids: _schemas.signal_ids,
  query: _schemas.signal_status_query,
  status: _schemas.status.required()
}).xor('signal_ids', 'query');

exports.setSignalsStatusSchema = setSignalsStatusSchema;