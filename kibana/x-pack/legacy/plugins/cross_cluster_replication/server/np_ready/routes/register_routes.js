"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _auto_follow_pattern = require("./api/auto_follow_pattern");

var _follower_index = require("./api/follower_index");

var _ccr = require("./api/ccr");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerRoutes(deps) {
  (0, _auto_follow_pattern.registerAutoFollowPatternRoutes)(deps);
  (0, _follower_index.registerFollowerIndexRoutes)(deps);
  (0, _ccr.registerCcrRoutes)(deps);
}