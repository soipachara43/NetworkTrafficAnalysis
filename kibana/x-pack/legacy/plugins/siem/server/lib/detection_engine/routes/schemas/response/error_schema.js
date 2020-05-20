"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorSchema = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _schemas = require("./schemas");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-enable @typescript-eslint/camelcase */
// We use id: t.string intentionally and _never_ the id from global schemas as
// sometimes echo back out the id that the user gave us and it is not guaranteed
// to be a UUID but rather just a string
const partial = t.exact(t.partial({
  id: t.string,
  rule_id: _schemas.rule_id
}));
const required = t.exact(t.type({
  error: t.type({
    status_code: _schemas.status_code,
    message: _schemas.message
  })
}));
const errorSchema = t.intersection([partial, required]);
exports.errorSchema = errorSchema;