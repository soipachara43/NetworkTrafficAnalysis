"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCloudMetricsMetadata = void 0;

var _constants = require("../../../lib/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getCloudMetricsMetadata = async (framework, requestContext, sourceConfiguration, instanceId) => {
  const metricQuery = {
    allowNoIndices: true,
    ignoreUnavailable: true,
    index: sourceConfiguration.metricAlias,
    body: {
      query: {
        bool: {
          filter: [{
            match: {
              'cloud.instance.id': instanceId
            }
          }],
          should: _constants.CLOUD_METRICS_MODULES.map(module => ({
            match: {
              'event.module': module
            }
          }))
        }
      },
      size: 0,
      aggs: {
        metrics: {
          terms: {
            field: 'event.dataset',
            size: 1000
          }
        }
      }
    }
  };
  const response = await framework.callWithRequest(requestContext, 'search', metricQuery);
  const buckets = response.aggregations && response.aggregations.metrics ? response.aggregations.metrics.buckets : [];
  return {
    buckets
  };
};

exports.getCloudMetricsMetadata = getCloudMetricsMetadata;