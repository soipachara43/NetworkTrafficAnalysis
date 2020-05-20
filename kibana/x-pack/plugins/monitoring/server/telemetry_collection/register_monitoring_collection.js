"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMonitoringCollection = registerMonitoringCollection;

var _get_all_stats = require("./get_all_stats");

var _get_cluster_uuids = require("./get_cluster_uuids");

var _get_licenses = require("./get_licenses");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerMonitoringCollection(telemetryCollectionManager, esCluster, customContext) {
  telemetryCollectionManager.setCollection({
    esCluster,
    title: 'monitoring',
    priority: 2,
    statsGetter: _get_all_stats.getAllStats,
    clusterDetailsGetter: _get_cluster_uuids.getClusterUuids,
    licenseGetter: _get_licenses.getLicenses,
    customContext
  });
}