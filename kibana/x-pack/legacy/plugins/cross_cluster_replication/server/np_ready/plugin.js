"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrossClusterReplicationServerPlugin = void 0;

var _register_license_checker = require("./lib/register_license_checker");

var _register_routes = require("./routes/register_routes");

var _cross_cluster_replication_data = require("./cross_cluster_replication_data");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
class CrossClusterReplicationServerPlugin {
  // @ts-ignore
  constructor(ctx) {
    this.ctx = ctx;
  }

  setup({
    http
  }, {
    indexManagement,
    __LEGACY
  }) {
    (0, _register_license_checker.registerLicenseChecker)(__LEGACY);
    const router = http.createRouter();
    (0, _register_routes.registerRoutes)({
      router,
      __LEGACY
    });

    if (__LEGACY.ccrUIEnabled && indexManagement && indexManagement.indexDataEnricher) {
      indexManagement.indexDataEnricher.add(_cross_cluster_replication_data.ccrDataEnricher);
    }
  }

  start() {}

}

exports.CrossClusterReplicationServerPlugin = CrossClusterReplicationServerPlugin;