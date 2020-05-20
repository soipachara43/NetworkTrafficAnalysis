"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQuery = void 0;

var _build_query = require("../../utils/build_query");

var _reduce_fields = require("../../utils/build_query/reduce_fields");

var _ecs_fields = require("../ecs_fields");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildQuery = ({
  defaultIndex,
  fields,
  filterQuery,
  pagination: {
    querySize
  },
  sourceConfiguration: {
    fields: {
      timestamp
    }
  },
  timerange: {
    from,
    to
  }
}) => {
  const processUserFields = (0, _reduce_fields.reduceFields)(fields, { ..._ecs_fields.processFieldsMap,
    ..._ecs_fields.userFieldsMap
  });
  const hostFields = (0, _reduce_fields.reduceFields)(fields, _ecs_fields.hostFieldsMap);
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }];
  const agg = {
    process_count: {
      cardinality: {
        field: 'process.name'
      }
    }
  };
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggregations: { ...agg,
        group_by_process: {
          terms: {
            size: querySize,
            field: 'process.name',
            order: [{
              host_count: 'asc'
            }, {
              _count: 'asc'
            }, {
              _key: 'asc'
            }]
          },
          aggregations: {
            process: {
              top_hits: {
                size: 1,
                sort: [{
                  '@timestamp': {
                    order: 'desc'
                  }
                }],
                _source: processUserFields
              }
            },
            host_count: {
              cardinality: {
                field: 'host.name'
              }
            },
            hosts: {
              terms: {
                field: 'host.name'
              },
              aggregations: {
                host: {
                  top_hits: {
                    size: 1,
                    _source: hostFields
                  }
                }
              }
            }
          }
        }
      },
      query: {
        bool: {
          should: [{
            bool: {
              filter: [{
                term: {
                  'agent.type': 'auditbeat'
                }
              }, {
                term: {
                  'event.module': 'auditd'
                }
              }, {
                term: {
                  'event.action': 'executed'
                }
              }]
            }
          }, {
            bool: {
              filter: [{
                term: {
                  'agent.type': 'auditbeat'
                }
              }, {
                term: {
                  'event.module': 'system'
                }
              }, {
                term: {
                  'event.dataset': 'process'
                }
              }, {
                term: {
                  'event.action': 'process_started'
                }
              }]
            }
          }, {
            bool: {
              filter: [{
                term: {
                  'agent.type': 'winlogbeat'
                }
              }, {
                term: {
                  'event.code': '4688'
                }
              }]
            }
          }, {
            bool: {
              filter: [{
                term: {
                  'winlog.event_id': 1
                }
              }, {
                term: {
                  'winlog.channel': 'Microsoft-Windows-Sysmon/Operational'
                }
              }]
            }
          }, {
            bool: {
              filter: [{
                term: {
                  'event.type': 'process_start'
                }
              }, {
                term: {
                  'event.category': 'process'
                }
              }]
            }
          }, {
            bool: {
              filter: [{
                term: {
                  'event.category': 'process'
                }
              }, {
                term: {
                  'event.type': 'start'
                }
              }]
            }
          }],
          minimum_should_match: 1,
          filter
        }
      }
    },
    size: 0,
    track_total_hits: false
  };
  return dslQuery;
};

exports.buildQuery = buildQuery;