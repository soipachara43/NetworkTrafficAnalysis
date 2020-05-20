"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUsersQuery = void 0;

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildUsersQuery = ({
  ip,
  sort,
  filterQuery,
  flowTarget,
  pagination: {
    querySize
  },
  defaultIndex,
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
  const filter = [...(0, _build_query.createQueryFilterClauses)(filterQuery), {
    range: {
      [timestamp]: {
        gte: from,
        lte: to
      }
    }
  }, {
    term: {
      [`${flowTarget}.ip`]: ip
    }
  }];
  const dslQuery = {
    allowNoIndices: true,
    index: defaultIndex,
    ignoreUnavailable: true,
    body: {
      aggs: {
        user_count: {
          cardinality: {
            field: 'user.name'
          }
        },
        users: {
          terms: {
            field: 'user.name',
            size: querySize,
            order: { ...getQueryOrder(sort)
            }
          },
          aggs: {
            id: {
              terms: {
                field: 'user.id'
              }
            },
            groupId: {
              terms: {
                field: 'user.group.id'
              }
            },
            groupName: {
              terms: {
                field: 'user.group.name'
              }
            }
          }
        }
      },
      query: {
        bool: {
          filter,
          must_not: [{
            term: {
              'event.category': 'authentication'
            }
          }]
        }
      },
      size: 0,
      track_total_hits: false
    }
  };
  return dslQuery;
};

exports.buildUsersQuery = buildUsersQuery;

const getQueryOrder = sort => {
  switch (sort.field) {
    case _types.UsersFields.name:
      return {
        _key: sort.direction
      };

    case _types.UsersFields.count:
      return {
        _count: sort.direction
      };

    default:
      return (0, _build_query.assertUnreachable)(sort.field);
  }
};