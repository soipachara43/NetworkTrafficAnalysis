"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ReportingPlugin", {
  enumerable: true,
  get: function () {
    return _plugin.ReportingPlugin;
  }
});
Object.defineProperty(exports, "ReportingCore", {
  enumerable: true,
  get: function () {
    return _core.ReportingCore;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _core = require("./core");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = context => {
  return new _plugin.ReportingPlugin(context);
};

exports.plugin = plugin;