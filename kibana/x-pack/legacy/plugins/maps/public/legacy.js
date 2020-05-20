"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.setup = void 0;

var _new_platform = require("ui/new_platform");

var _modules = require("ui/modules");

var _ = require(".");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Untyped Module
// eslint-disable-line import/order
var pluginInstance = (0, _.plugin)({});
var setupPlugins = {
  __LEGACY: {
    uiModules: _modules.uiModules
  },
  np: _new_platform.npSetup.plugins
};
var setup = pluginInstance.setup(_new_platform.npSetup.core, setupPlugins);
exports.setup = setup;
var start = pluginInstance.start(_new_platform.npStart.core, _new_platform.npStart.plugins);
exports.start = start;