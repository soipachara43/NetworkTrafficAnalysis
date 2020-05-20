"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDnsQuery = void 0;

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getDnsQueryFilter = () => [{
  bool: {
    should: [{
      exists: {
        field: 'dns.question.name'
      }
    }, {
      term: {
        'suricata.eve.dns.type': {
          value: 'query'
        }
      }
    }, {
      exists: {
        field: 'zeek.dns.query'
      }
    }],
    minimum_should_match: 1
  }
}];

const buildDnsQuery = ({
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
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), ...getDnsQueryFilter(), {
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
    query: {
      bool: {
        filter
      }
    },
    size: 0,
    track_total_hits: true
  }];
  return dslQuery;
};

exports.buildDnsQuery = buildDnsQuery;