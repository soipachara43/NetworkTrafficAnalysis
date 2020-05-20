"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kpiHostsSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const kpiHostsSchema = (0, _graphqlTag.default)`
  type KpiHostHistogramData {
    x: Float
    y: Float
  }

  type KpiHostsData {
    hosts: Float
    hostsHistogram: [KpiHostHistogramData!]
    authSuccess: Float
    authSuccessHistogram: [KpiHostHistogramData!]
    authFailure: Float
    authFailureHistogram: [KpiHostHistogramData!]
    uniqueSourceIps: Float
    uniqueSourceIpsHistogram: [KpiHostHistogramData!]
    uniqueDestinationIps: Float
    uniqueDestinationIpsHistogram: [KpiHostHistogramData!]
    inspect: Inspect
  }

  type KpiHostDetailsData {
    authSuccess: Float
    authSuccessHistogram: [KpiHostHistogramData!]
    authFailure: Float
    authFailureHistogram: [KpiHostHistogramData!]
    uniqueSourceIps: Float
    uniqueSourceIpsHistogram: [KpiHostHistogramData!]
    uniqueDestinationIps: Float
    uniqueDestinationIpsHistogram: [KpiHostHistogramData!]
    inspect: Inspect
  }

  extend type Source {
    KpiHosts(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): KpiHostsData!

    KpiHostDetails(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): KpiHostDetailsData!
  }
`;
exports.kpiHostsSchema = kpiHostsSchema;