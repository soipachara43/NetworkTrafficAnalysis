"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLicenses = fetchLicenses;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetchLicenses(callCluster, clusters, index) {
  const params = {
    index,
    filterPath: ['hits.hits._source.license.*', 'hits.hits._source.cluster_settings.cluster.metadata.display_name', 'hits.hits._source.cluster_uuid', 'hits.hits._source.cluster_name'],
    body: {
      size: 1,
      sort: [{
        timestamp: {
          order: 'desc'
        }
      }],
      query: {
        bool: {
          filter: [{
            terms: {
              cluster_uuid: clusters.map(cluster => cluster.clusterUuid)
            }
          }, {
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
      }
    }
  };
  const response = await callCluster('search', params);
  return (0, _lodash.get)(response, 'hits.hits', []).map(hit => {
    const clusterName = (0, _lodash.get)(hit, '_source.cluster_settings.cluster.metadata.display_name') || (0, _lodash.get)(hit, '_source.cluster_name') || (0, _lodash.get)(hit, '_source.cluster_uuid');
    const rawLicense = (0, _lodash.get)(hit, '_source.license', {});
    const license = {
      status: rawLicense.status,
      type: rawLicense.type,
      expiryDateMS: rawLicense.expiry_date_in_millis,
      clusterUuid: (0, _lodash.get)(hit, '_source.cluster_uuid'),
      clusterName
    };
    return license;
  });
}