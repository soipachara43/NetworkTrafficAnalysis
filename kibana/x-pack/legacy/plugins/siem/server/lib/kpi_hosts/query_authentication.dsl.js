"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAuthQuery = void 0;

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildAuthQuery = ({
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
  }
}) => {
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    bool: {
      filter: [{
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
  const dslQuery = [{
    index: defaultIndex,
    allowNoIndices: true,
    ignoreUnavailable: true
  }, {
    aggs: {
      authentication_success: {
        filter: {
          term: {
            'event.outcome': 'success'
          }
        }
      },
      authentication_success_histogram: {
        auto_date_histogram: {
          field: '@timestamp',
          buckets: '6'
        },
        aggs: {
          count: {
            filter: {
              term: {
                'event.outcome': 'success'
              }
            }
          }
        }
      },
      authentication_failure: {
        filter: {
          term: {
            'event.outcome': 'failure'
          }
        }
      },
      authentication_failure_histogram: {
        auto_date_histogram: {
          field: '@timestamp',
          buckets: '6'
        },
        aggs: {
          count: {
            filter: {
              term: {
                'event.outcome': 'failure'
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
  }];
  return dslQuery;
};

exports.buildAuthQuery = buildAuthQuery;