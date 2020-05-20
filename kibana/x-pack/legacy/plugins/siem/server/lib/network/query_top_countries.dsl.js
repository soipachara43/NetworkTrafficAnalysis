"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOppositeField = exports.buildTopCountriesQuery = void 0;

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getCountAgg = flowTarget => ({
  top_countries_count: {
    cardinality: {
      field: `${flowTarget}.geo.country_iso_code`
    }
  }
});

const buildTopCountriesQuery = ({
  defaultIndex,
  filterQuery,
  flowTarget,
  networkTopCountriesSort,
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
  }];
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: { ...getCountAgg(flowTarget),
        ...getFlowTargetAggs(networkTopCountriesSort, flowTarget, querySize)
      },
      query: {
        bool: ip ? {
          filter,
          should: [{
            term: {
              [`${getOppositeField(flowTarget)}.ip`]: ip
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

exports.buildTopCountriesQuery = buildTopCountriesQuery;

const getFlowTargetAggs = (networkTopCountriesSortField, flowTarget, querySize) => ({
  [flowTarget]: {
    terms: {
      field: `${flowTarget}.geo.country_iso_code`,
      size: querySize,
      order: { ...getQueryOrder(networkTopCountriesSortField)
      }
    },
    aggs: {
      bytes_in: {
        sum: {
          field: `${getOppositeField(flowTarget)}.bytes`
        }
      },
      bytes_out: {
        sum: {
          field: `${flowTarget}.bytes`
        }
      },
      flows: {
        cardinality: {
          field: 'network.community_id'
        }
      },
      source_ips: {
        cardinality: {
          field: 'source.ip'
        }
      },
      destination_ips: {
        cardinality: {
          field: 'destination.ip'
        }
      }
    }
  }
});

const getOppositeField = flowTarget => {
  switch (flowTarget) {
    case _types.FlowTargetSourceDest.source:
      return _types.FlowTargetSourceDest.destination;

    case _types.FlowTargetSourceDest.destination:
      return _types.FlowTargetSourceDest.source;
  }

  (0, _build_query.assertUnreachable)(flowTarget);
};

exports.getOppositeField = getOppositeField;

const getQueryOrder = networkTopCountriesSortField => {
  switch (networkTopCountriesSortField.field) {
    case _types.NetworkTopTablesFields.bytes_in:
      return {
        bytes_in: networkTopCountriesSortField.direction
      };

    case _types.NetworkTopTablesFields.bytes_out:
      return {
        bytes_out: networkTopCountriesSortField.direction
      };

    case _types.NetworkTopTablesFields.flows:
      return {
        flows: networkTopCountriesSortField.direction
      };

    case _types.NetworkTopTablesFields.destination_ips:
      return {
        destination_ips: networkTopCountriesSortField.direction
      };

    case _types.NetworkTopTablesFields.source_ips:
      return {
        source_ips: networkTopCountriesSortField.direction
      };
  }

  (0, _build_query.assertUnreachable)(networkTopCountriesSortField.field);
};