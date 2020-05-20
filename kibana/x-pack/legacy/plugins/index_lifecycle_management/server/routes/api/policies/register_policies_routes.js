"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPoliciesRoutes = registerPoliciesRoutes;

var _register_fetch_route = require("./register_fetch_route");

var _register_create_route = require("./register_create_route");

var _register_delete_route = require("./register_delete_route");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerPoliciesRoutes(server) {
  (0, _register_fetch_route.registerFetchRoute)(server);
  (0, _register_create_route.registerCreateRoute)(server);
  (0, _register_delete_route.registerDeleteRoute)(server);
}