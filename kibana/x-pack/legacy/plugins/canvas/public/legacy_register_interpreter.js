"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _new_platform = require("ui/new_platform");

var _browser = require("../canvas_plugin_src/functions/browser");

var _expression_types = require("../canvas_plugin_src/expression_types");

var _renderers = require("../canvas_plugin_src/renderers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
_browser.functions.forEach(_new_platform.npSetup.plugins.expressions.registerFunction);

_expression_types.typeFunctions.forEach(_new_platform.npSetup.plugins.expressions.registerType);

_renderers.renderFunctions.forEach(_new_platform.npSetup.plugins.expressions.registerRenderer); // eslint-disable-next-line import/no-default-export


var _default = _browser.functions;
exports.default = _default;
module.exports = exports.default;