"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryRulesBulkSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _query_rules_schema = require("./query_rules_schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const queryRulesBulkSchema = _joi.default.array().items(_query_rules_schema.queryRulesSchema);

exports.queryRulesBulkSchema = queryRulesBulkSchema;