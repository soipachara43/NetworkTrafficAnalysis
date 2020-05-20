"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.setup = void 0;

require("ui/autoload/all");

require("uiExports/savedObjectTypes");

require("uiExports/spyModes");

require("uiExports/embeddableFactories");

require("uiExports/interpreter");

require("./legacy_plugin_support");

require("uiExports/canvas");

var _ = require("./");

var _legacy = require("./legacy");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: These are legacy imports.  We should work to have all of these come from New Platform
// Import the uiExports that the application uses
// These will go away as these plugins are converted to NP
// load application code
var pluginInstance = (0, _.plugin)({}); // Setup and Startup the plugin

var setup = pluginInstance.setup((0, _legacy.getCoreSetup)(), (0, _legacy.getSetupPlugins)());
exports.setup = setup;
var start = pluginInstance.start((0, _legacy.getCoreStart)(), (0, _legacy.getStartPlugins)());
exports.start = start;