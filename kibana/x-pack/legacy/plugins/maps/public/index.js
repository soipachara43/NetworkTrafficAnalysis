"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = void 0;

require("./kibana_services");

require("uiExports/inspectorViews");

require("uiExports/search");

require("uiExports/embeddableFactories");

require("uiExports/embeddableActions");

require("ui/autoload/all");

require("react-vis/dist/style.css");

require("./angular/services/gis_map_saved_object_loader");

require("./angular/map_controller");

require("./routes");

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// import the uiExports that we want to "use"
var plugin = function plugin(initializerContext) {
  return new _plugin.MapsPlugin();
};

exports.plugin = plugin;