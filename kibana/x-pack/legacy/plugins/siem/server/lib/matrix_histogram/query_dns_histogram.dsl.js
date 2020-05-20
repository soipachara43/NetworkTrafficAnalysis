"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDnsHistogramQuery = void 0;

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildDnsHistogramQuery = ({
  filterQuery,
  timerange: {
    from,
    to
  },
  defaultIndex,
  sourceConfiguration: {
    fields: {
      timestamp
    }
  },
  stackByField
}) => {
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }];

  const getHistogramAggregation = () => {
    const interval = (0, _build_query.calculateTimeSeriesInterval)(from, to);
    const histogramTimestampField = '@timestamp';
    const dateHistogram = {
      date_histogram: {
        field: histogramTimestampField,
        fixed_interval: interval
      }
    };
    return {
      NetworkDns: { ...dateHistogram,
        aggs: {
          dns: {
            terms: {
              field: stackByField,
              order: {
                orderAgg: 'desc'
              },
              size: 10
            },
            aggs: {
              orderAgg: {
                cardinality: {
                  field: 'dns.question.name'
                }
              }
            }
          }
        }
      }
    };
  };

  const dslQuery = {
    index: defaultIndex,
    allowNoIndices: true,
    ignoreUnavailable: true,
    body: {
      aggregations: getHistogramAggregation(),
      query: {
        bool: {
          filter
        }
      },
      size: 0,
      track_total_hits: true
    }
  };
  return dslQuery;
};

exports.buildDnsHistogramQuery = buildDnsHistogramQuery;