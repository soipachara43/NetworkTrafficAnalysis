"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shape = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const shape = () => ({
  name: 'shape',
  displayName: 'Shape',
  tags: ['graphic'],
  help: 'A customizable shape',
  width: 200,
  height: 200,
  image: _header.default,
  expression: 'shape "square" fill="#4cbce4" border="rgba(255,255,255,0)" borderWidth=0 maintainAspect=false | render'
});

exports.shape = shape;