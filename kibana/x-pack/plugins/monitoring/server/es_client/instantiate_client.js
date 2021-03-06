"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instantiateClient = instantiateClient;
exports.hasMonitoringCluster = hasMonitoringCluster;

var _monitoring_bulk = require("../kibana_monitoring/lib/monitoring_bulk");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore

/* Provide a dedicated Elasticsearch client for Monitoring
 * The connection options can be customized for the Monitoring application
 * This allows the app to connect to a dedicated monitoring cluster even if
 * Kibana itself is connected to a production cluster.
 */
function instantiateClient(elasticsearchConfig, log, createClient) {
  const isMonitoringCluster = hasMonitoringCluster(elasticsearchConfig);
  const cluster = createClient('monitoring', { ...(isMonitoringCluster ? elasticsearchConfig : {}),
    plugins: [_monitoring_bulk.monitoringBulk],
    logQueries: Boolean(elasticsearchConfig.logQueries)
  });
  const configSource = isMonitoringCluster ? 'monitoring' : 'production';
  log.info(`config sourced from: ${configSource} cluster`);
  return cluster;
}

function hasMonitoringCluster(config) {
  return Boolean(config.hosts && config.hosts[0]);
}