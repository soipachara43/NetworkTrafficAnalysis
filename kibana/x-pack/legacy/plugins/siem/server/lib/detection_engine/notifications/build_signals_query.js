"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSignalsSearchQuery = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildSignalsSearchQuery = ({
  ruleId,
  index,
  from,
  to
}) => ({
  index,
  body: {
    query: {
      bool: {
        filter: [{
          bool: {
            should: {
              match: {
                'signal.rule.rule_id': ruleId
              }
            },
            minimum_should_match: 1
          }
        }, {
          range: {
            '@timestamp': {
              gt: from,
              lte: to,
              format: 'epoch_millis'
            }
          }
        }]
      }
    }
  }
});

exports.buildSignalsSearchQuery = buildSignalsSearchQuery;