"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceDestination = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _network = require("./network");

var _source_destination_with_arrows = require("./source_destination_with_arrows");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EuiFlexItemMarginTop = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemMarginTop",
  componentId: "xatag5-0"
})(["margin-top:3px;"]);
EuiFlexItemMarginTop.displayName = 'EuiFlexItemMarginTop';
/**
 * Renders a visualization of network traffic between a source and a destination
 * This component is used by the Netflow row renderer
 */

var SourceDestination = _react.default.memo(function (_ref) {
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
      eventId = _ref.eventId,
      networkBytes = _ref.networkBytes,
      networkCommunityId = _ref.networkCommunityId,
      networkDirection = _ref.networkDirection,
      networkPackets = _ref.networkPackets,
      networkProtocol = _ref.networkProtocol,
      sourceBytes = _ref.sourceBytes,
      sourceGeoContinentName = _ref.sourceGeoContinentName,
      sourceGeoCountryName = _ref.sourceGeoCountryName,
      sourceGeoCountryIsoCode = _ref.sourceGeoCountryIsoCode,
      sourceGeoRegionName = _ref.sourceGeoRegionName,
      sourceGeoCityName = _ref.sourceGeoCityName,
      sourceIp = _ref.sourceIp,
      sourcePackets = _ref.sourcePackets,
      sourcePort = _ref.sourcePort,
      transport = _ref.transport;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    direction: "column",
    justifyContent: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_network.Network, {
    bytes: networkBytes,
    packets: networkPackets,
    communityId: networkCommunityId,
    contextId: contextId,
    eventId: eventId,
    direction: networkDirection,
    protocol: networkProtocol,
    transport: transport
  })), _react.default.createElement(EuiFlexItemMarginTop, {
    grow: false
  }, _react.default.createElement(_source_destination_with_arrows.SourceDestinationWithArrows, {
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
    eventId: eventId,
    sourceBytes: sourceBytes,
    sourceGeoContinentName: sourceGeoContinentName,
    sourceGeoCountryName: sourceGeoCountryName,
    sourceGeoCountryIsoCode: sourceGeoCountryIsoCode,
    sourceGeoRegionName: sourceGeoRegionName,
    sourceGeoCityName: sourceGeoCityName,
    sourceIp: sourceIp,
    sourcePackets: sourcePackets,
    sourcePort: sourcePort
  })));
});

exports.SourceDestination = SourceDestination;
SourceDestination.displayName = 'SourceDestination';