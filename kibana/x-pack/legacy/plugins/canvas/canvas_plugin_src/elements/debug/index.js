"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const debug = () => ({
  name: 'debug',
  displayName: 'Debug',
  tags: ['text'],
  help: 'Just dumps the configuration of the element',
  image: _header.default,
  expression: `demodata
| render as=debug`
});

exports.debug = debug;