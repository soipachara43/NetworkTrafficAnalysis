"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOppositeField = exports.buildTopNFlowQuery = void 0;

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getCountAgg = flowTarget => ({
  top_n_flow_count: {
    cardinality: {
      field: `${flowTarget}.ip`
    }
  }
});

const buildTopNFlowQuery = ({
  defaultIndex,
  filterQuery,
  flowTarget,
  networkTopNFlowSort,
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
        ...getFlowTargetAggs(networkTopNFlowSort, flowTarget, querySize)
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

exports.buildTopNFlowQuery = buildTopNFlowQuery;

const getFlowTargetAggs = (networkTopNFlowSortField, flowTarget, querySize) => ({
  [flowTarget]: {
    terms: {
      field: `${flowTarget}.ip`,
      size: querySize,
      order: { ...getQueryOrder(networkTopNFlowSortField)
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
      domain: {
        terms: {
          field: `${flowTarget}.domain`,
          order: {
            timestamp: 'desc'
          }
        },
        aggs: {
          timestamp: {
            max: {
              field: '@timestamp'
            }
          }
        }
      },
      location: {
        filter: {
          exists: {
            field: `${flowTarget}.geo`
          }
        },
        aggs: {
          top_geo: {
            top_hits: {
              _source: `${flowTarget}.geo.*`,
              size: 1
            }
          }
        }
      },
      autonomous_system: {
        filter: {
          exists: {
            field: `${flowTarget}.as`
          }
        },
        aggs: {
          top_as: {
            top_hits: {
              _source: `${flowTarget}.as.*`,
              size: 1
            }
          }
        }
      },
      flows: {
        cardinality: {
          field: 'network.community_id'
        }
      },
      [`${getOppositeField(flowTarget)}_ips`]: {
        cardinality: {
          field: `${getOppositeField(flowTarget)}.ip`
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

const getQueryOrder = networkTopNFlowSortField => {
  switch (networkTopNFlowSortField.field) {
    case _types.NetworkTopTablesFields.bytes_in:
      return {
        bytes_in: networkTopNFlowSortField.direction
      };

    case _types.NetworkTopTablesFields.bytes_out:
      return {
        bytes_out: networkTopNFlowSortField.direction
      };

    case _types.NetworkTopTablesFields.flows:
      return {
        flows: networkTopNFlowSortField.direction
      };

    case _types.NetworkTopTablesFields.destination_ips:
      return {
        destination_ips: networkTopNFlowSortField.direction
      };

    case _types.NetworkTopTablesFields.source_ips:
      return {
        source_ips: networkTopNFlowSortField.direction
      };
  }

  (0, _build_query.assertUnreachable)(networkTopNFlowSortField.field);
};