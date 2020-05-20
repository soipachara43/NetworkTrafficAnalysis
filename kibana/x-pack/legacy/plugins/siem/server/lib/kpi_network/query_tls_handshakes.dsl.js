"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTlsHandshakeQuery = void 0;

var _build_query = require("../../utils/build_query");

var _helpers = require("./helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getTlsHandshakesQueryFilter = () => [{
  bool: {
    should: [{
      exists: {
        field: 'tls.version'
      }
    }, {
      exists: {
        field: 'suricata.eve.tls.version'
      }
    }, {
      exists: {
        field: 'zeek.ssl.version'
      }
    }],
    minimum_should_match: 1
  }
}];

const buildTlsHandshakeQuery = ({
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
  const filter = [...(0, _helpers.getIpFilter)(), ...(0, _build_query.createQueryFilterClauses)(filterQuery), ...getTlsHandshakesQueryFilter(), {
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

exports.buildTlsHandshakeQuery = buildTlsHandshakeQuery;