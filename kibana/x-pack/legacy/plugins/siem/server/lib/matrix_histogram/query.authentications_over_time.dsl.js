"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAuthenticationsOverTimeQuery = void 0;

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildAuthenticationsOverTimeQuery = ({
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
  stackByField = 'event.outcome'
}) => {
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    bool: {
      must: [{
        term: {
          'event.category': 'authentication'
        }
      }]
    }
  }, {
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
        fixed_interval: interval,
        min_doc_count: 0,
        extended_bounds: {
          min: from,
          max: to
        }
      }
    };
    return {
      eventActionGroup: {
        terms: {
          field: stackByField,
          include: ['success', 'failure'],
          order: {
            _count: 'desc'
          },
          size: 2
        },
        aggs: {
          events: dateHistogram
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

exports.buildAuthenticationsOverTimeQuery = buildAuthenticationsOverTimeQuery;