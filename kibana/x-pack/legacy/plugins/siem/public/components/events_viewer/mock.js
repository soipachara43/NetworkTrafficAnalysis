"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockEventViewerResponse = void 0;

var _fp = require("lodash/fp");

var _index = require("../../containers/timeline/index.gql_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mockEventViewerResponse = [{
  request: {
    query: _index.timelineQuery,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      fieldRequested: ['@timestamp', 'message', 'host.name', 'event.module', 'event.dataset', 'event.action', 'user.name', 'source.ip', 'destination.ip'],
      filterQuery: '{"bool":{"must":[],"filter":[{"bool":{"filter":[{"bool":{"should":[{"range":{"@timestamp":{"gte":1566943856794}}}],"minimum_should_match":1}},{"bool":{"should":[{"range":{"@timestamp":{"lte":1566857456791}}}],"minimum_should_match":1}}]}}],"should":[],"must_not":[]}}',
      sourceId: 'default',
      pagination: {
        limit: 25,
        cursor: null,
        tiebreaker: null
      },
      sortField: {
        sortFieldId: '@timestamp',
        direction: 'desc'
      },
      defaultIndex: ['filebeat-*', 'auditbeat-*', 'packetbeat-*'],
      inspect: false
    }
  },
  result: {
    loading: false,
    fetchMore: _fp.noop,
    refetch: _fp.noop,
    data: {
      source: {
        id: 'default',
        Timeline: {
          totalCount: 12,
          pageInfo: {
            endCursor: null,
            hasNextPage: true,
            __typename: 'PageInfo'
          },
          edges: [],
          __typename: 'TimelineData'
        },
        __typename: 'Source'
      }
    }
  }
}];
exports.mockEventViewerResponse = mockEventViewerResponse;