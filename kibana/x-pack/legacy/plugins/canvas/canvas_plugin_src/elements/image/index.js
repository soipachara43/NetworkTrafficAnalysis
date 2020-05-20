"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const image = () => ({
  name: 'image',
  displayName: 'Image',
  tags: ['graphic'],
  help: 'A static image',
  image: _header.default,
  expression: `image dataurl=null mode="contain"
| render`
});

exports.image = image;