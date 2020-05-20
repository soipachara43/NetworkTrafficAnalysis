"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.revealImage = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const revealImage = () => ({
  name: 'revealImage',
  displayName: 'Image reveal',
  tags: ['graphic', 'proportion'],
  help: 'Reveals a percentage of an image',
  image: _header.default,
  expression: `filters
| demodata
| math "mean(percent_uptime)"
| revealImage origin=bottom image=null
| render`
});

exports.revealImage = revealImage;