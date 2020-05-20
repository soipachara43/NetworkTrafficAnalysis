"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRulesSchema = void 0;

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
const findRulesSchema = _joi.default.object({
  fields: _schemas.fields,
  filter: _schemas.queryFilter,
  per_page: _schemas.per_page,
  page: _schemas.page,
  sort_field: _joi.default.when(_joi.default.ref('sort_order'), {
    is: _joi.default.exist(),
    then: _schemas.sort_field.required(),
    otherwise: _schemas.sort_field.optional()
  }),
  sort_order: _schemas.sort_order
});

exports.findRulesSchema = findRulesSchema;