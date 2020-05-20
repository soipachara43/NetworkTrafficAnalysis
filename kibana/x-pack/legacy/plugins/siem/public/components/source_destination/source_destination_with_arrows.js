"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceDestinationWithArrows = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _source_destination_arrows = require("./source_destination_arrows");

var _source_destination_ip = require("./source_destination_ip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Visualizes the communication between a source and a destination by
 * providing an interactive (draggable, hyperlinked) visualization,
 * which contains both the source and destination. (See
 * `SourceDestinationIp` ) for details on how the source and destination
 * are visually represented.
 */
var SourceDestinationWithArrows = _react.default.memo(function (_ref) {
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
      sourceBytes = _ref.sourceBytes,
      sourceGeoContinentName = _ref.sourceGeoContinentName,
      sourceGeoCountryName = _ref.sourceGeoCountryName,
      sourceGeoCountryIsoCode = _ref.sourceGeoCountryIsoCode,
      sourceGeoRegionName = _ref.sourceGeoRegionName,
      sourceGeoCityName = _ref.sourceGeoCityName,
      sourcePackets = _ref.sourcePackets,
      sourceIp = _ref.sourceIp,
      sourcePort = _ref.sourcePort;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_source_destination_ip.SourceDestinationIp, {
    contextId: contextId,
    destinationGeoContinentName: destinationGeoContinentName,
    destinationGeoCountryName: destinationGeoCountryName,
    destinationGeoCountryIsoCode: destinationGeoCountryIsoCode,
    destinationGeoRegionName: destinationGeoRegionName,
    destinationGeoCityName: destinationGeoCityName,
    destinationIp: destinationIp,
    destinationPort: destinationPort,
    eventId: eventId,
    sourceGeoContinentName: sourceGeoContinentName,
    sourceGeoCountryName: sourceGeoCountryName,
    sourceGeoCountryIsoCode: sourceGeoCountryIsoCode,
    sourceGeoRegionName: sourceGeoRegionName,
    sourceGeoCityName: sourceGeoCityName,
    sourceIp: sourceIp,
    sourcePort: sourcePort,
    type: "source"
  })), _react.default.createElement(_source_destination_arrows.SourceDestinationArrows, {
    contextId: contextId,
    destinationBytes: destinationBytes,
    destinationPackets: destinationPackets,
    eventId: eventId,
    sourceBytes: sourceBytes,
    sourcePackets: sourcePackets
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_source_destination_ip.SourceDestinationIp, {
    contextId: contextId,
    destinationGeoContinentName: destinationGeoContinentName,
    destinationGeoCountryName: destinationGeoCountryName,
    destinationGeoCountryIsoCode: destinationGeoCountryIsoCode,
    destinationGeoRegionName: destinationGeoRegionName,
    destinationGeoCityName: destinationGeoCityName,
    destinationIp: destinationIp,
    destinationPort: destinationPort,
    eventId: eventId,
    sourceGeoContinentName: sourceGeoContinentName,
    sourceGeoCountryName: sourceGeoCountryName,
    sourceGeoCountryIsoCode: sourceGeoCountryIsoCode,
    sourceGeoRegionName: sourceGeoRegionName,
    sourceGeoCityName: sourceGeoCityName,
    sourceIp: sourceIp,
    sourcePort: sourcePort,
    type: "destination"
  })));
});

exports.SourceDestinationWithArrows = SourceDestinationWithArrows;
SourceDestinationWithArrows.displayName = 'SourceDestinationWithArrows';