"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockFirstLastSeenHostQuery = void 0;

var _default_index_pattern = require("../../../../default_index_pattern");

var _first_last_seen = require("./first_last_seen.gql_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mockFirstLastSeenHostQuery = [{
  request: {
    query: _first_last_seen.HostFirstLastSeenGqlQuery,
    variables: {
      sourceId: 'default',
      hostName: 'kibana-siem',
      defaultIndex: _default_index_pattern.defaultIndexPattern
    }
  },
  result: {
    data: {
      source: {
        id: 'default',
        HostFirstLastSeen: {
          firstSeen: '2019-04-08T16:09:40.692Z',
          lastSeen: '2019-04-08T18:35:45.064Z'
        }
      }
    }
  }
}];
exports.mockFirstLastSeenHostQuery = mockFirstLastSeenHostQuery;