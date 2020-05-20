"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildHttpQuery = void 0;

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getCountAgg = () => ({
  http_count: {
    cardinality: {
      field: 'url.path'
    }
  }
});

const buildHttpQuery = ({
  defaultIndex,
  filterQuery,
  networkHttpSort,
  pagination: {
    querySize
  },
  sourceConfiguration: {
    fields: {
      timestamp
    }
  },
  timerange: {
    from,
    to
  },
  ip
}) => {
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }, {
    exists: {
      field: 'http.request.method'
    }
  }];
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: { ...getCountAgg(),
        ...getHttpAggs(networkHttpSort, querySize)
      },
      query: {
        bool: ip ? {
          filter,
          should: [{
            term: {
              'source.ip': ip
            }
          }, {
            term: {
              'destination.ip': ip
            }
          }],
          minimum_should_match: 1
        } : {
          filter
        }
      }
    },
    size: 0,
    track_total_hits: false
  };
  return dslQuery;
};

exports.buildHttpQuery = buildHttpQuery;

const getHttpAggs = (networkHttpSortField, querySize) => ({
  url: {
    terms: {
      field: `url.path`,
      size: querySize,
      order: {
        _count: networkHttpSortField.direction
      }
    },
    aggs: {
      methods: {
        terms: {
          field: 'http.request.method',
          size: 4
        }
      },
      domains: {
        terms: {
          field: 'url.domain',
          size: 4
        }
      },
      status: {
        terms: {
          field: 'http.response.status_code',
          size: 4
        }
      },
      source: {
        top_hits: {
          size: 1,
          _source: {
            includes: ['host.name', 'source.ip']
          }
        }
      }
    }
  }
});