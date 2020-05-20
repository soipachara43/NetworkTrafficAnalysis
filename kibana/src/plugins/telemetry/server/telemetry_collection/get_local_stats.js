"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleLocalStats = handleLocalStats;
exports.getLocalStats = void 0;

var _get_cluster_info = require("./get_cluster_info");

var _get_cluster_stats = require("./get_cluster_stats");

var _get_kibana = require("./get_kibana");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Handle the separate local calls by combining them into a single object response that looks like the
 * "cluster_stats" document from X-Pack monitoring.
 *
 * @param {Object} server ??
 * @param {Object} clusterInfo Cluster info (GET /)
 * @param {Object} clusterStats Cluster stats (GET /_cluster/stats)
 * @param {Object} kibana The Kibana Usage stats
 */
function handleLocalStats({
  cluster_name,
  cluster_uuid,
  version
}, {
  _nodes,
  cluster_name: clusterName,
  ...clusterStats
}, kibana, context) {
  return {
    timestamp: new Date().toISOString(),
    cluster_uuid,
    cluster_name,
    version: version.number,
    cluster_stats: clusterStats,
    collection: 'local',
    stack_stats: {
      kibana: (0, _get_kibana.handleKibanaStats)(context, kibana)
    }
  };
}

/**
 * Get statistics for all products joined by Elasticsearch cluster.
 */
const getLocalStats = async (clustersDetails, config, context) => {
  const {
    callCluster,
    usageCollection
  } = config;
  return await Promise.all(clustersDetails.map(async clustersDetail => {
    const [clusterInfo, clusterStats, kibana] = await Promise.all([(0, _get_cluster_info.getClusterInfo)(callCluster), // cluster info
    (0, _get_cluster_stats.getClusterStats)(callCluster), // cluster stats (not to be confused with cluster _state_)
    (0, _get_kibana.getKibana)(usageCollection, callCluster)]);
    return handleLocalStats(clusterInfo, clusterStats, kibana, context);
  }));
};

exports.getLocalStats = getLocalStats;