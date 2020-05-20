"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventsSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eventsSchema = (0, _graphqlTag.default)`
  scalar EsValue

  type EventsTimelineData {
    edges: [EcsEdges!]!
    totalCount: Float!
    pageInfo: PageInfo!
    inspect: Inspect
  }

  type TimelineNonEcsData {
    field: String!
    value: ToStringArray
  }

  type TimelineItem {
    _id: String!
    _index: String
    data: [TimelineNonEcsData!]!
    ecs: ECS!
  }

  type TimelineEdges {
    node: TimelineItem!
    cursor: CursorType!
  }

  type TimelineData {
    edges: [TimelineEdges!]!
    totalCount: Float!
    pageInfo: PageInfo!
    inspect: Inspect
  }

  type DetailItem {
    field: String!
    values: ToStringArray
    originalValue: EsValue
  }

  input LastTimeDetails {
    hostName: String
    ip: String
  }

  type TimelineDetailsData {
    data: [DetailItem!]
    inspect: Inspect
  }

  type LastEventTimeData {
    lastSeen: Date
    inspect: Inspect
  }

  enum LastEventIndexKey {
    hostDetails
    hosts
    ipDetails
    network
  }

  extend type Source {
    Timeline(
      pagination: PaginationInput!
      sortField: SortField!
      fieldRequested: [String!]!
      timerange: TimerangeInput
      filterQuery: String
      defaultIndex: [String!]!
    ): TimelineData!
    TimelineDetails(
      eventId: String!
      indexName: String!
      defaultIndex: [String!]!
    ): TimelineDetailsData!
    LastEventTime(
      id: String
      indexKey: LastEventIndexKey!
      details: LastTimeDetails!
      defaultIndex: [String!]!
    ): LastEventTimeData!
  }
`;
exports.eventsSchema = eventsSchema;