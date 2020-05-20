"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildHostsQuery = void 0;

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildHostsQuery = ({
  defaultIndex,
  fields,
  filterQuery,
  pagination: {
    querySize
  },
  sort,
  sourceConfiguration: {
    fields: {
      timestamp
    }
  },
  timerange: {
    from,
    to
  }
}) => {
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }];
  const agg = {
    host_count: {
      cardinality: {
        field: 'host.name'
      }
    }
  };
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: { ...agg,
        host_data: {
          terms: {
            size: querySize,
            field: 'host.name',
            order: getQueryOrder(sort)
          },
          aggs: {
            lastSeen: {
              max: {
                field: '@timestamp'
              }
            },
            os: {
              top_hits: {
                size: 1,
                sort: [{
                  '@timestamp': {
                    order: 'desc'
                  }
                }],
                _source: {
                  includes: ['host.os.*']
                }
              }
            }
          }
        }
      },
      query: {
        bool: {
          filter
        }
      },
      size: 0,
      track_total_hits: false
    }
  };
  return dslQuery;
};

exports.buildHostsQuery = buildHostsQuery;

const getQueryOrder = sort => {
  switch (sort.field) {
    case _types.HostsFields.lastSeen:
      return {
        lastSeen: sort.direction
      };

    case _types.HostsFields.hostName:
      return {
        _key: sort.direction
      };

    default:
      return (0, _build_query.assertUnreachable)(sort.field);
  }
};