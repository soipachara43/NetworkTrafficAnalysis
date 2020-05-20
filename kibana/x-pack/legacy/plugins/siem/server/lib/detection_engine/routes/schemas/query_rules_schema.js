"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryRulesSchema = void 0;

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
const queryRulesSchema = _joi.default.object({
  rule_id: _schemas.rule_id,
  id: _schemas.id
}).xor('id', 'rule_id');

exports.queryRulesSchema = queryRulesSchema;