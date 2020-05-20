"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUniqueFlowIdsQuery = void 0;

var _build_query = require("../../utils/build_query");

var _helpers = require("./helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildUniqueFlowIdsQuery = ({
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
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), ...(0, _helpers.getIpFilter)(), {
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
    aggregations: {
      unique_flow_id: {
        cardinality: {
          field: 'network.community_id'
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

exports.buildUniqueFlowIdsQuery = buildUniqueFlowIdsQuery;