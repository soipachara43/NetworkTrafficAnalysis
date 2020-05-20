"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.puppeteerLaunch = void 0;

var _puppeteerCore = _interopRequireDefault(require("puppeteer-core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore lacking typedefs which this module fixes
const puppeteerLaunch = _puppeteerCore.default.launch.bind(_puppeteerCore.default);

exports.puppeteerLaunch = puppeteerLaunch;