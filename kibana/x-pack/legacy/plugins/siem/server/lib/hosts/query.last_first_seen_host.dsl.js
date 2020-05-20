"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLastFirstSeenHostQuery = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildLastFirstSeenHostQuery = ({
  hostName,
  defaultIndex
}) => {
  const filter = [{
    term: {
      'host.name': hostName
    }
  }];
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: {
        firstSeen: {
          min: {
            field: '@timestamp'
          }
        },
        lastSeen: {
          max: {
            field: '@timestamp'
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
    }
  };
  return dslQuery;
};

exports.buildLastFirstSeenHostQuery = buildLastFirstSeenHostQuery;