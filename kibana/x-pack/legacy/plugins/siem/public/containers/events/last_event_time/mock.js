"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockLastEventTimeQuery = void 0;

var _default_index_pattern = require("../../../../default_index_pattern");

var _types = require("../../../graphql/types");

var _last_event_time = require("./last_event_time.gql_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTimeTwelveMinutesAgo = function getTimeTwelveMinutesAgo() {
  var d = new Date();
  var ts = d.getTime();
  var twelveMinutes = ts - 12 * 60 * 1000;
  return new Date(twelveMinutes).toISOString();
};

var mockLastEventTimeQuery = [{
  request: {
    query: _last_event_time.LastEventTimeGqlQuery,
    variables: {
      sourceId: 'default',
      indexKey: _types.LastEventIndexKey.hosts,
      details: {},
      defaultIndex: _default_index_pattern.defaultIndexPattern
    }
  },
  result: {
    data: {
      source: {
        id: 'default',
        LastEventTime: {
          lastSeen: getTimeTwelveMinutesAgo(),
          errorMessage: null
        }
      }
    }
  }
}];
exports.mockLastEventTimeQuery = mockLastEventTimeQuery;