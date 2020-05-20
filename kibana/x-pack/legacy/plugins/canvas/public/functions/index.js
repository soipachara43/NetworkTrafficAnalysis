"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFunctions = initFunctions;

var _asset = require("./asset");

var _filters = require("./filters");

var _timelion = require("./timelion");

var _to = require("./to");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initFunctions(initialize) {
  return [_asset.asset, (0, _filters.filtersFunctionFactory)(initialize), _timelion.timelion, (0, _to.toFunctionFactory)(initialize)];
}