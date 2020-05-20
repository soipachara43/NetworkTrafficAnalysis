"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListsDefaultArray = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _schemas = require("../response/schemas");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Types the ListsDefaultArray as:
 *   - If null or undefined, then a default array will be set for the list
 */
const ListsDefaultArray = new t.Type('listsWithDefaultArray', t.array(_schemas.list).is, input => input == null ? t.success([]) : t.array(_schemas.list).decode(input), t.identity);
exports.ListsDefaultArray = ListsDefaultArray;