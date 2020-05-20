"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTemplatesRoutes = registerTemplatesRoutes;

var _register_fetch_route = require("./register_fetch_route");

var _register_get_route = require("./register_get_route");

var _register_add_policy_route = require("./register_add_policy_route");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerTemplatesRoutes(server) {
  (0, _register_fetch_route.registerFetchRoute)(server);
  (0, _register_get_route.registerGetRoute)(server);
  (0, _register_add_policy_route.registerAddPolicyRoute)(server);
}