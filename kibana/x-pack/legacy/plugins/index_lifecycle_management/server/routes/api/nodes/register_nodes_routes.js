"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerNodesRoutes = registerNodesRoutes;

var _register_list_route = require("./register_list_route");

var _register_details_route = require("./register_details_route");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerNodesRoutes(server) {
  (0, _register_list_route.registerListRoute)(server);
  (0, _register_details_route.registerDetailsRoute)(server);
}