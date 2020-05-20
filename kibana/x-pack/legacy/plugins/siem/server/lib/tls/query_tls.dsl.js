"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTlsQuery = void 0;

var _build_query = require("../../utils/build_query");

var _types = require("../../graphql/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getAggs = (querySize, sort) => ({
  count: {
    cardinality: {
      field: 'tls.server.hash.sha1'
    }
  },
  sha1: {
    terms: {
      field: 'tls.server.hash.sha1',
      size: querySize,
      order: { ...getQueryOrder(sort)
      }
    },
    aggs: {
      issuers: {
        terms: {
          field: 'tls.server.issuer'
        }
      },
      subjects: {
        terms: {
          field: 'tls.server.subject'
        }
      },
      not_after: {
        terms: {
          field: 'tls.server.not_after'
        }
      },
      ja3: {
        terms: {
          field: 'tls.server.ja3s'
        }
      }
    }
  }
});

const buildTlsQuery = ({
  ip,
  sort,
  filterQuery,
  flowTarget,
  pagination: {
    querySize
  },
  defaultIndex,
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
  const defaultFilter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }];
  const filter = ip ? [...defaultFilter, {
    term: {
      [`${flowTarget}.ip`]: ip
    }
  }] : defaultFilter;
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggs: { ...getAggs(querySize, sort)
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

exports.buildTlsQuery = buildTlsQuery;

const getQueryOrder = sort => {
  switch (sort.field) {
    case _types.TlsFields._id:
      return {
        _key: sort.direction
      };

    default:
      return (0, _build_query.assertUnreachable)(sort.field);
  }
};