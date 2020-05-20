"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kpiNetworkSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const kpiNetworkSchema = (0, _graphqlTag.default)`
  type KpiNetworkHistogramData {
    x: Float
    y: Float
  }

  type KpiNetworkData {
    networkEvents: Float
    uniqueFlowId: Float
    uniqueSourcePrivateIps: Float
    uniqueSourcePrivateIpsHistogram: [KpiNetworkHistogramData!]
    uniqueDestinationPrivateIps: Float
    uniqueDestinationPrivateIpsHistogram: [KpiNetworkHistogramData!]
    dnsQueries: Float
    tlsHandshakes: Float
    inspect: Inspect
  }

  extend type Source {
    KpiNetwork(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): KpiNetworkData
  }
`;
exports.kpiNetworkSchema = kpiNetworkSchema;