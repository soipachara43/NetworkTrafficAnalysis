"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchClusters = fetchClusters;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetchClusters(callCluster, index) {
  const params = {
    index,
    filterPath: 'aggregations.clusters.buckets',
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            term: {
              type: 'cluster_stats'
            }
          }, {
            range: {
              timestamp: {
                gte: 'now-2m'
              }
            }
          }]
        }
      },
      aggs: {
        clusters: {
          terms: {
            field: 'cluster_uuid',
            size: 1000
          }
        }
      }
    }
  };
  const response = await callCluster('search', params);
  return (0, _lodash.get)(response, 'aggregations.clusters.buckets', []).map(bucket => ({
    clusterUuid: bucket.key
  }));
}