"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildEventsSearchQuery = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildEventsSearchQuery = ({
  index,
  from,
  to,
  filter,
  size,
  searchAfterSortId
}) => {
  const filterWithTime = [filter, {
    bool: {
      filter: [{
        bool: {
          should: [{
            range: {
              '@timestamp': {
                gte: from
              }
            }
          }],
          minimum_should_match: 1
        }
      }, {
        bool: {
          should: [{
            range: {
              '@timestamp': {
                lte: to
              }
            }
          }],
          minimum_should_match: 1
        }
      }]
    }
  }];
  const searchQuery = {
    allowNoIndices: true,
    index,
    size,
    ignoreUnavailable: true,
    body: {
      query: {
        bool: {
          filter: [...filterWithTime, {
            match_all: {}
          }]
        }
      },
      sort: [{
        '@timestamp': {
          order: 'asc'
        }
      }]
    }
  };

  if (searchAfterSortId) {
    return { ...searchQuery,
      body: { ...searchQuery.body,
        search_after: [searchAfterSortId]
      }
    };
  }

  return searchQuery;
};

exports.buildEventsSearchQuery = buildEventsSearchQuery;