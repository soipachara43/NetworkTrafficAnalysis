"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationsSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const authenticationsSchema = (0, _graphqlTag.default)`
  type LastSourceHost {
    timestamp: Date
    source: SourceEcsFields
    host: HostEcsFields
  }

  type AuthenticationItem {
    _id: String!
    failures: Float!
    successes: Float!
    user: UserEcsFields!
    lastSuccess: LastSourceHost
    lastFailure: LastSourceHost
  }

  type AuthenticationsEdges {
    node: AuthenticationItem!
    cursor: CursorType!
  }

  type AuthenticationsData {
    edges: [AuthenticationsEdges!]!
    totalCount: Float!
    pageInfo: PageInfoPaginated!
    inspect: Inspect
  }

  extend type Source {
    "Gets Authentication success and failures based on a timerange"
    Authentications(
      timerange: TimerangeInput!
      pagination: PaginationInputPaginated!
      filterQuery: String
      defaultIndex: [String!]!
    ): AuthenticationsData!
  }
`;
exports.authenticationsSchema = authenticationsSchema;