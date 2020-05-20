"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _plugin = require("./server/plugin");

var _shim = require("./server/shim");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const init = async function (server) {
  const {
    coreSetup,
    pluginsSetup
  } = await (0, _shim.createSetupShim)(server);
  const serverPlugin = new _plugin.Plugin();
  serverPlugin.setup(coreSetup, pluginsSetup);
};

exports.init = init;