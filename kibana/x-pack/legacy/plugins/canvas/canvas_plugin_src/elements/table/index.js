"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.table = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const table = () => ({
  name: 'table',
  displayName: 'Data table',
  tags: ['text'],
  help: 'A scrollable grid for displaying data in a tabular format',
  image: _header.default,
  expression: `filters
| demodata
| table
| render`
});

exports.table = table;