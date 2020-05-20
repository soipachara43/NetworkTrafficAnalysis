"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLastSignalsQuery = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var buildLastSignalsQuery = function buildLastSignalsQuery(ruleId) {
  var queryFilter = [{
    bool: {
      should: [{
        match: {
          'signal.status': 'open'
        }
      }],
      minimum_should_match: 1
    }
  }];
  return {
    aggs: {
      lastSeen: {
        max: {
          field: '@timestamp'
        }
      }
    },
    query: {
      bool: {
        filter: ruleId != null ? [].concat(queryFilter, [{
          bool: {
            should: [{
              match: {
                'signal.rule.id': ruleId
              }
            }],
            minimum_should_match: 1
          }
        }]) : queryFilter
      }
    },
    size: 0,
    track_total_hits: true
  };
};

exports.buildLastSignalsQuery = buildLastSignalsQuery;