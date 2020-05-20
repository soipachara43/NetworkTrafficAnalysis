"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_INDEX_MANAGEMENT_BASE_PATH = exports.API_REMOTE_CLUSTERS_BASE_PATH = exports.API_BASE_PATH = exports.BASE_PATH_REMOTE_CLUSTERS = exports.BASE_PATH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const BASE_PATH = '/management/elasticsearch/cross_cluster_replication';
exports.BASE_PATH = BASE_PATH;
const BASE_PATH_REMOTE_CLUSTERS = '/management/elasticsearch/remote_clusters';
exports.BASE_PATH_REMOTE_CLUSTERS = BASE_PATH_REMOTE_CLUSTERS;
const API_BASE_PATH = '/api/cross_cluster_replication';
exports.API_BASE_PATH = API_BASE_PATH;
const API_REMOTE_CLUSTERS_BASE_PATH = '/api/remote_clusters';
exports.API_REMOTE_CLUSTERS_BASE_PATH = API_REMOTE_CLUSTERS_BASE_PATH;
const API_INDEX_MANAGEMENT_BASE_PATH = '/api/index_management';
exports.API_INDEX_MANAGEMENT_BASE_PATH = API_INDEX_MANAGEMENT_BASE_PATH;