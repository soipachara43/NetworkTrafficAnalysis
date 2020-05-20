"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true
};
exports.plugin = void 0;

var _plugin = require("./plugin");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin() {
  return new _plugin.LensPlugin();
};

exports.plugin = plugin;