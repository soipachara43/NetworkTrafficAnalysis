"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatImage = void 0;

var _header = _interopRequireDefault(require("./header.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const repeatImage = () => ({
  name: 'repeatImage',
  displayName: 'Image repeat',
  tags: ['graphic', 'proportion'],
  help: 'Repeats an image N times',
  image: _header.default,
  expression: `filters
| demodata
| math "mean(cost)"
| repeatImage image=null
| render`
});

exports.repeatImage = repeatImage;