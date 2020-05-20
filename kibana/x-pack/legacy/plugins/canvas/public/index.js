"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CanvasSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.CanvasSetup;
  }
});
Object.defineProperty(exports, "CanvasStart", {
  enumerable: true,
  get: function get() {
    return _plugin.CanvasStart;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin(initializerContext) {
  return new _plugin.CanvasPlugin();
};

exports.plugin = plugin;