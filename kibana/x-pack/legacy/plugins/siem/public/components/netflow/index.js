"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Netflow = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _fingerprints = require("./fingerprints");

var _netflow_columns = require("./netflow_columns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Renders a visual representation of network traffic between hosts,
 * typically for use in a row renderer. In addition to rendering Netflow event
 * data (i.e. `event.action: netflow_flow`), this row renderer is also useful
 * when, for example:
 * - `event.action` is `network_flow` or `socket_open`
 * - `event.category` is `network_traffic`
 * - rendering data from `Zeek` and `Suricata`
 */
var Netflow = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      destinationBytes = _ref.destinationBytes,
      destinationGeoContinentName = _ref.destinationGeoContinentName,
      destinationGeoCountryName = _ref.destinationGeoCountryName,
      destinationGeoCountryIsoCode = _ref.destinationGeoCountryIsoCode,
      destinationGeoRegionName = _ref.destinationGeoRegionName,
      destinationGeoCityName = _ref.destinationGeoCityName,
      destinationIp = _ref.destinationIp,
      destinationPackets = _ref.destinationPackets,
      destinationPort = _ref.destinationPort,
      eventDuration = _ref.eventDuration,
      eventId = _ref.eventId,
      eventEnd = _ref.eventEnd,
      eventStart = _ref.eventStart,
      networkBytes = _ref.networkBytes,
      networkCommunityId = _ref.networkCommunityId,
      networkDirection = _ref.networkDirection,
      networkPackets = _ref.networkPackets,
      networkProtocol = _ref.networkProtocol,
      processName = _ref.processName,
      sourceBytes = _ref.sourceBytes,
      sourceGeoContinentName = _ref.sourceGeoContinentName,
      sourceGeoCountryName = _ref.sourceGeoCountryName,
      sourceGeoCountryIsoCode = _ref.sourceGeoCountryIsoCode,
      sourceGeoRegionName = _ref.sourceGeoRegionName,
      sourceGeoCityName = _ref.sourceGeoCityName,
      sourcePackets = _ref.sourcePackets,
      sourceIp = _ref.sourceIp,
      sourcePort = _ref.sourcePort,
      tlsClientCertificateFingerprintSha1 = _ref.tlsClientCertificateFingerprintSha1,
      tlsFingerprintsJa3Hash = _ref.tlsFingerprintsJa3Hash,
      tlsServerCertificateFingerprintSha1 = _ref.tlsServerCertificateFingerprintSha1,
      transport = _ref.transport,
      userName = _ref.userName;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    "data-test-subj": "netflow-rows",
    direction: "column",
    justifyContent: "center",
    wrap: true,
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_netflow_columns.NetflowColumns, {
    contextId: contextId,
    destinationBytes: destinationBytes,
    destinationGeoContinentName: destinationGeoContinentName,
    destinationGeoCountryName: destinationGeoCountryName,
    destinationGeoCountryIsoCode: destinationGeoCountryIsoCode,
    destinationGeoRegionName: destinationGeoRegionName,
    destinationGeoCityName: destinationGeoCityName,
    destinationIp: destinationIp,
    destinationPackets: destinationPackets,
    destinationPort: destinationPort,
    eventDuration: eventDuration,
    eventId: eventId,
    eventEnd: eventEnd,
    eventStart: eventStart,
    networkBytes: networkBytes,
    networkCommunityId: networkCommunityId,
    networkDirection: networkDirection,
    networkPackets: networkPackets,
    networkProtocol: networkProtocol,
    processName: processName,
    sourceBytes: sourceBytes,
    sourceGeoContinentName: sourceGeoContinentName,
    sourceGeoCountryName: sourceGeoCountryName,
    sourceGeoCountryIsoCode: sourceGeoCountryIsoCode,
    sourceGeoRegionName: sourceGeoRegionName,
    sourceGeoCityName: sourceGeoCityName,
    sourceIp: sourceIp,
    sourcePackets: sourcePackets,
    sourcePort: sourcePort,
    transport: transport,
    userName: userName
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_fingerprints.Fingerprints, {
    contextId: contextId,
    eventId: eventId,
    tlsClientCertificateFingerprintSha1: tlsClientCertificateFingerprintSha1,
    tlsFingerprintsJa3Hash: tlsFingerprintsJa3Hash,
    tlsServerCertificateFingerprintSha1: tlsServerCertificateFingerprintSha1
  })));
});

exports.Netflow = Netflow;
Netflow.displayName = 'Netflow';