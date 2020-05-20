"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQuery = exports.auditdFieldsMap = void 0;

var _build_query = require("../../utils/build_query");

var _reduce_fields = require("../../utils/build_query/reduce_fields");

var _ecs_fields = require("../ecs_fields");

var _extend_map = require("../ecs_fields/extend_map");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const auditdFieldsMap = {
  latest: '@timestamp',
  'lastSuccess.timestamp': 'lastSuccess.@timestamp',
  'lastFailure.timestamp': 'lastFailure.@timestamp',
  ...{ ...(0, _extend_map.extendMap)('lastSuccess', _ecs_fields.sourceFieldsMap)
  },
  ...{ ...(0, _extend_map.extendMap)('lastSuccess', _ecs_fields.hostFieldsMap)
  },
  ...{ ...(0, _extend_map.extendMap)('lastFailure', _ecs_fields.sourceFieldsMap)
  },
  ...{ ...(0, _extend_map.extendMap)('lastFailure', _ecs_fields.hostFieldsMap)
  }
};
exports.auditdFieldsMap = auditdFieldsMap;

const buildQuery = ({
  fields,
  filterQuery,
  timerange: {
    from,
    to
  },
  pagination: {
    querySize
  },
  defaultIndex,
  sourceConfiguration: {
    fields: {
      timestamp
    }
  }
}) => {
  const esFields = (0, _reduce_fields.reduceFields)(fields, { ..._ecs_fields.hostFieldsMap,
    ..._ecs_fields.sourceFieldsMap
  });
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    term: {
      'event.category': 'authentication'
    }
  }, {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }];
  const agg = {
    user_count: {
      cardinality: {
        field: 'user.name'
      }
    }
  };
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: { ...agg,
        group_by_users: {
          terms: {
            size: querySize,
            field: 'user.name',
            order: [{
              'successes.doc_count': 'desc'
            }, {
              'failures.doc_count': 'desc'
            }]
          },
          aggs: {
            failures: {
              filter: {
                term: {
                  'event.outcome': 'failure'
                }
              },
              aggs: {
                lastFailure: {
                  top_hits: {
                    size: 1,
                    _source: esFields,
                    sort: [{
                      '@timestamp': {
                        order: 'desc'
                      }
                    }]
                  }
                }
              }
            },
            successes: {
              filter: {
                term: {
                  'event.outcome': 'success'
                }
              },
              aggs: {
                lastSuccess: {
                  top_hits: {
                    size: 1,
                    _source: esFields,
                    sort: [{
                      '@timestamp': {
                        order: 'desc'
                      }
                    }]
                  }
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
      size: 0
    },
    track_total_hits: false
  };
  return dslQuery;
};

exports.buildQuery = buildQuery;