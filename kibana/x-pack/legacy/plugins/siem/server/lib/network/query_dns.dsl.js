"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDnsQuery = void 0;

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getQueryOrder = networkDnsSortField => {
  switch (networkDnsSortField.field) {
    case _types.NetworkDnsFields.queryCount:
      return {
        _count: networkDnsSortField.direction
      };

    case _types.NetworkDnsFields.dnsName:
      return {
        _key: networkDnsSortField.direction
      };

    case _types.NetworkDnsFields.uniqueDomains:
      return {
        unique_domains: networkDnsSortField.direction
      };

    case _types.NetworkDnsFields.dnsBytesIn:
      return {
        dns_bytes_in: networkDnsSortField.direction
      };

    case _types.NetworkDnsFields.dnsBytesOut:
      return {
        dns_bytes_out: networkDnsSortField.direction
      };
  }

  (0, _build_query.assertUnreachable)(networkDnsSortField.field);
};

const getCountAgg = () => ({
  dns_count: {
    cardinality: {
      field: 'dns.question.registered_domain'
    }
  }
});

const createIncludePTRFilter = isPtrIncluded => isPtrIncluded ? {} : {
  must_not: [{
    term: {
      'dns.question.type': {
        value: 'PTR'
      }
    }
  }]
};

const buildDnsQuery = ({
  defaultIndex,
  filterQuery,
  isPtrIncluded,
  networkDnsSortField,
  pagination: {
    querySize
  },
  sourceConfiguration: {
    fields: {
      timestamp
    }
  },
  stackByField = 'dns.question.registered_domain',
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
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: { ...getCountAgg(),
        dns_name_query_count: {
          terms: {
            field: stackByField,
            size: querySize,
            order: { ...getQueryOrder(networkDnsSortField)
            }
          },
          aggs: {
            unique_domains: {
              cardinality: {
                field: 'dns.question.name'
              }
            },
            dns_bytes_in: {
              sum: {
                field: 'source.bytes'
              }
            },
            dns_bytes_out: {
              sum: {
                field: 'destination.bytes'
              }
            }
          }
        }
      },
      query: {
        bool: {
          filter,
          ...createIncludePTRFilter(isPtrIncluded)
        }
      }
    },
    size: 0,
    track_total_hits: false
  };
  return dslQuery;
};

exports.buildDnsQuery = buildDnsQuery;