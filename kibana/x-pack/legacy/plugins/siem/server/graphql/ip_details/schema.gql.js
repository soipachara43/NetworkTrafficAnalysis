"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ipDetailsSchemas = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ipOverviewSchema = (0, _graphqlTag.default)`
  type AutonomousSystemOrganization {
    name: String
  }

  type AutonomousSystem {
    number: Float
    organization: AutonomousSystemOrganization
  }

  type Overview {
    firstSeen: Date
    lastSeen: Date
    autonomousSystem: AutonomousSystem!
    geo: GeoEcsFields!
  }

  type IpOverviewData {
    client: Overview
    destination: Overview
    host: HostEcsFields!
    server: Overview
    source: Overview
    inspect: Inspect
  }

  extend type Source {
    IpOverview(
      id: String
      filterQuery: String
      ip: String!
      defaultIndex: [String!]!
    ): IpOverviewData
  }
`;
const usersSchema = (0, _graphqlTag.default)`
  enum UsersFields {
    name
    count
  }

  input UsersSortField {
    field: UsersFields!
    direction: Direction!
  }

  type UsersItem {
    name: String
    id: ToStringArray
    groupId: ToStringArray
    groupName: ToStringArray
    count: Float
  }

  type UsersNode {
    _id: String
    timestamp: Date
    user: UsersItem
  }

  type UsersEdges {
    node: UsersNode!
    cursor: CursorType!
  }

  type UsersData {
    edges: [UsersEdges!]!
    totalCount: Float!
    pageInfo: PageInfoPaginated!
    inspect: Inspect
  }

  extend type Source {
    Users(
      filterQuery: String
      id: String
      ip: String!
      pagination: PaginationInputPaginated!
      sort: UsersSortField!
      flowTarget: FlowTarget!
      timerange: TimerangeInput!
      defaultIndex: [String!]!
    ): UsersData!
  }
`;
const ipDetailsSchemas = [ipOverviewSchema, usersSchema];
exports.ipDetailsSchemas = ipDetailsSchemas;