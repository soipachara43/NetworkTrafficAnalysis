"use strict";

var _new_platform = require("ui/new_platform");

var _plugin = require("./plugin");

require("uiExports/embeddableFactories");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = new _plugin.Plugin({
  opaqueId: Symbol('uptime'),
  env: {},
  config: {
    get: function get() {
      return {};
    }
  }
});
plugin.setup(_new_platform.npSetup);