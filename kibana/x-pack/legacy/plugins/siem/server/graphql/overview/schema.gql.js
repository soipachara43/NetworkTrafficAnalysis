"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overviewSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const overviewSchema = (0, _graphqlTag.default)`
  type OverviewNetworkData {
    auditbeatSocket: Float
    filebeatCisco: Float
    filebeatNetflow: Float
    filebeatPanw: Float
    filebeatSuricata: Float
    filebeatZeek: Float
    packetbeatDNS: Float
    packetbeatFlow: Float
    packetbeatTLS: Float
    inspect: Inspect
  }

  type OverviewHostData {
    auditbeatAuditd: Float
    auditbeatFIM: Float
    auditbeatLogin: Float
    auditbeatPackage: Float
    auditbeatProcess: Float
    auditbeatUser: Float
    endgameDns: Float
    endgameFile: Float
    endgameImageLoad: Float
    endgameNetwork: Float
    endgameProcess: Float
    endgameRegistry: Float
    endgameSecurity: Float
    filebeatSystemModule: Float
    winlogbeatSecurity: Float
    winlogbeatMWSysmonOperational: Float
    inspect: Inspect
  }

  extend type Source {
    OverviewNetwork(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): OverviewNetworkData
    OverviewHost(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): OverviewHostData
  }
`;
exports.overviewSchema = overviewSchema;