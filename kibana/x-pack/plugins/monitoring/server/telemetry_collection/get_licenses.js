"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLicenses = fetchLicenses;
exports.handleLicenses = handleLicenses;
exports.getLicenses = void 0;

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Get statistics for all selected Elasticsearch clusters.
 */
const getLicenses = async (clustersDetails, {
  callCluster
}, {
  maxBucketSize
}) => {
  const clusterUuids = clustersDetails.map(({
    clusterUuid
  }) => clusterUuid);
  const response = await fetchLicenses(callCluster, clusterUuids, maxBucketSize);
  return handleLicenses(response);
};
/**
 * Fetch the Elasticsearch stats.
 *
 * @param {Object} server The server instance
 * @param {function} callCluster The callWithRequest or callWithInternalUser handler
 * @param {Array} clusterUuids Cluster UUIDs to limit the request against
 *
 * Returns the response for the aggregations to fetch details for the product.
 */


exports.getLicenses = getLicenses;

function fetchLicenses(callCluster, clusterUuids, maxBucketSize) {
  const params = {
    index: _constants.INDEX_PATTERN_ELASTICSEARCH,
    size: maxBucketSize,
    ignoreUnavailable: true,
    filterPath: ['hits.hits._source.cluster_uuid', 'hits.hits._source.license'],
    body: {
      query: {
        bool: {
          filter: [
          /*
           * Note: Unlike most places, we don't care about the old _type: cluster_stats because it would NOT
           * have the license in it (that used to be in the .monitoring-data-2 index in cluster_info)
           */
          {
            term: {
              type: 'cluster_stats'
            }
          }, {
            terms: {
              cluster_uuid: clusterUuids
            }
          }]
        }
      },
      collapse: {
        field: 'cluster_uuid'
      },
      sort: {
        timestamp: {
          order: 'desc'
        }
      }
    }
  };
  return callCluster('search', params);
}

/**
 * Extract the cluster stats for each cluster.
 */
function handleLicenses(response) {
  var _response$hits;

  const clusters = ((_response$hits = response.hits) === null || _response$hits === void 0 ? void 0 : _response$hits.hits) || [];
  return clusters.reduce((acc, {
    _source
  }) => ({ ...acc,
    [_source.cluster_uuid]: _source.license
  }), {});
}