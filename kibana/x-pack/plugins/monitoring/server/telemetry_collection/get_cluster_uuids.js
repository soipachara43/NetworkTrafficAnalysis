"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchClusterUuids = fetchClusterUuids;
exports.handleClusterUuidsResponse = handleClusterUuidsResponse;
exports.getClusterUuids = void 0;

var _lodash = require("lodash");

var _create_query = require("./create_query");

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Get a list of Cluster UUIDs that exist within the specified timespan.
 */
const getClusterUuids = async (config, {
  maxBucketSize
}) => {
  const response = await fetchClusterUuids(config, maxBucketSize);
  return handleClusterUuidsResponse(response);
};
/**
 * Fetch the aggregated Cluster UUIDs from the monitoring cluster.
 */


exports.getClusterUuids = getClusterUuids;

function fetchClusterUuids({
  callCluster,
  start,
  end
}, maxBucketSize) {
  const params = {
    index: _constants.INDEX_PATTERN_ELASTICSEARCH,
    size: 0,
    ignoreUnavailable: true,
    filterPath: 'aggregations.cluster_uuids.buckets.key',
    body: {
      query: (0, _create_query.createQuery)({
        type: 'cluster_stats',
        start,
        end
      }),
      aggs: {
        cluster_uuids: {
          terms: {
            field: 'cluster_uuid',
            size: maxBucketSize
          }
        }
      }
    }
  };
  return callCluster('search', params);
}
/**
 * Convert the aggregation response into an array of Cluster UUIDs.
 *
 * @param {Object} response The aggregation response
 * @return {Array} Strings; each representing a Cluster's UUID.
 */


function handleClusterUuidsResponse(response) {
  const uuidBuckets = (0, _lodash.get)(response, 'aggregations.cluster_uuids.buckets', []);
  return uuidBuckets.map(uuidBucket => ({
    clusterUuid: uuidBucket.key
  }));
}