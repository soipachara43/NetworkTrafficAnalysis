"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;

require("./application/index.scss");

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** @public */
var plugin = function plugin(ctx) {
  return new _plugin.SnapshotRestoreUIPlugin(ctx);
};

exports.plugin = plugin;