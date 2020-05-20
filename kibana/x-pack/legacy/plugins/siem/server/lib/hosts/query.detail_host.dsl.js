"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildHostOverviewQuery = void 0;

var _reduce_fields = require("../../utils/build_query/reduce_fields");

var _ecs_fields = require("../ecs_fields");

var _helpers = require("./helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildHostOverviewQuery = ({
  fields,
  hostName,
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
  const esFields = (0, _reduce_fields.reduceFields)(fields, { ..._ecs_fields.hostFieldsMap,
    ..._ecs_fields.cloudFieldsMap
  });
  const filter = [{
    term: {
      'host.name': hostName
    }
  }, {
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
      aggregations: { ...(0, _helpers.buildFieldsTermAggregation)(esFields.filter(field => !['@timestamp'].includes(field)))
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

exports.buildHostOverviewQuery = buildHostOverviewQuery;