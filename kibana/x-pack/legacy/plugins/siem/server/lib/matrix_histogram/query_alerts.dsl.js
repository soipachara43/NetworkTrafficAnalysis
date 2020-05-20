"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAlertsHistogramQuery = exports.buildAlertsQuery = void 0;

var _build_query = require("../../utils/build_query");

var _query = require("../events/query.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildAlertsQuery = options => {
  const eventsQuery = (0, _query.buildTimelineQuery)(options);
  const eventsFilter = eventsQuery.body.query.bool.filter;
  const alertsFilter = [...(0, _build_query.createQueryFilterClauses)({
    match: {
      'event.kind': {
        query: 'alert'
      }
    }
  })];
  return { ...eventsQuery,
    body: { ...eventsQuery.body,
      query: {
        bool: {
          filter: [...eventsFilter, ...alertsFilter]
        }
      }
    }
  };
};

exports.buildAlertsQuery = buildAlertsQuery;

const buildAlertsHistogramQuery = ({
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
    bool: {
      filter: [{
        bool: {
          should: [{
            match: {
              'event.kind': 'alert'
            }
          }],
          minimum_should_match: 1
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
      alertsGroup: {
        terms: {
          field: stackByField,
          missing: 'All others',
          order: {
            _count: 'desc'
          },
          size: 10
        },
        aggs: {
          alerts: dateHistogram
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

exports.buildAlertsHistogramQuery = buildAlertsHistogramQuery;