"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importRulesSchema = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _schemas = require("./schemas");

var _error_schema = require("./error_schema");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-enable @typescript-eslint/camelcase */
const importRulesSchema = t.exact(t.type({
  success: _schemas.success,
  success_count: _schemas.success_count,
  errors: t.array(_error_schema.errorSchema)
}));
exports.importRulesSchema = importRulesSchema;