"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPlugin = void 0;

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createPlugin = function createPlugin(ctx) {
  return new _plugin.IndexLifecycleManagementPlugin();
};

exports.createPlugin = createPlugin;