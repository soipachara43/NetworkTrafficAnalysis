"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeFilter = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const timeFilter = () => ({
  name: 'time_filter',
  displayName: 'Time filter',
  tags: ['filter'],
  help: 'Set a time window',
  image: _header.default,
  height: 50,
  expression: `timefilterControl compact=true column=@timestamp
| render`,
  filter: 'timefilter column=@timestamp from=now-24h to=now'
});

exports.timeFilter = timeFilter;