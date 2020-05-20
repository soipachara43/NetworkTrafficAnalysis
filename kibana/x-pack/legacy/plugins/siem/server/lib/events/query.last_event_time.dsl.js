"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLastEventTimeQuery = void 0;

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildLastEventTimeQuery = ({
  indexKey,
  details,
  defaultIndex
}) => {
  const indicesToQuery = {
    hosts: defaultIndex,
    network: defaultIndex
  };

  const getHostDetailsFilter = hostName => [{
    term: {
      'host.name': hostName
    }
  }];

  const getIpDetailsFilter = ip => [{
    term: {
      'source.ip': ip
    }
  }, {
    term: {
      'destination.ip': ip
    }
  }];

  const getQuery = eventIndexKey => {
    switch (eventIndexKey) {
      case _types.LastEventIndexKey.ipDetails:
        if (details.ip) {
          return {
            allowNoIndices: true,
            index: indicesToQuery.network,
            ignoreUnavailable: true,
            body: {
              aggregations: {
                last_seen_event: {
                  max: {
                    field: '@timestamp'
                  }
                }
              },
              query: {
                bool: {
                  should: getIpDetailsFilter(details.ip)
                }
              },
              size: 0,
              track_total_hits: false
            }
          };
        }

        throw new Error('buildLastEventTimeQuery - no IP argument provided');

      case _types.LastEventIndexKey.hostDetails:
        if (details.hostName) {
          return {
            allowNoIndices: true,
            index: indicesToQuery.hosts,
            ignoreUnavailable: true,
            body: {
              aggregations: {
                last_seen_event: {
                  max: {
                    field: '@timestamp'
                  }
                }
              },
              query: {
                bool: {
                  filter: getHostDetailsFilter(details.hostName)
                }
              },
              size: 0,
              track_total_hits: false
            }
          };
        }

        throw new Error('buildLastEventTimeQuery - no hostName argument provided');

      case _types.LastEventIndexKey.hosts:
      case _types.LastEventIndexKey.network:
        return {
          allowNoIndices: true,
          index: indicesToQuery[indexKey],
          ignoreUnavailable: true,
          body: {
            aggregations: {
              last_seen_event: {
                max: {
                  field: '@timestamp'
                }
              }
            },
            query: {
              match_all: {}
            },
            size: 0,
            track_total_hits: false
          }
        };

      default:
        return (0, _build_query.assertUnreachable)(eventIndexKey);
    }
  };

  return getQuery(indexKey);
};

exports.buildLastEventTimeQuery = buildLastEventTimeQuery;