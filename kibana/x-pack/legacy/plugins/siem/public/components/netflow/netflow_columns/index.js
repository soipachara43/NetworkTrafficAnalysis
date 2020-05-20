"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetflowColumns = exports.EVENT_END = exports.EVENT_START = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _source_destination = require("../../source_destination");

var _duration_event_start_end = require("./duration_event_start_end");

var _user_process = require("./user_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EVENT_START = 'event.start';
exports.EVENT_START = EVENT_START;
var EVENT_END = 'event.end';
exports.EVENT_END = EVENT_END;
var EuiFlexItemMarginRight = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemMarginRight",
  componentId: "sc-1lh4en2-0"
})(["margin-right:10px;"]);
EuiFlexItemMarginRight.displayName = 'EuiFlexItemMarginRight';
/**
 * Renders columns of draggable badges that describe both Netflow data, or more
 * generally, hosts interacting over a network connection. This component is
 * consumed by the `Netflow` visualization / row renderer.
 *
 * This component will allow columns to wrap if constraints on width prevent all
 * the columns from fitting on a single horizontal row
 */

var NetflowColumns = _react.default.memo(function (_ref) {
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
      sourceIp = _ref.sourceIp,
      sourcePackets = _ref.sourcePackets,
      sourcePort = _ref.sourcePort,
      transport = _ref.transport,
      userName = _ref.userName;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    "data-test-subj": "netflow-columns",
    gutterSize: "none",
    justifyContent: "center",
    wrap: true
  }, _react.default.createElement(EuiFlexItemMarginRight, {
    grow: false
  }, _react.default.createElement(_user_process.UserProcess, {
    contextId: contextId,
    eventId: eventId,
    processName: processName,
    userName: userName
  })), _react.default.createElement(EuiFlexItemMarginRight, {
    grow: false
  }, _react.default.createElement(_duration_event_start_end.DurationEventStartEnd, {
    contextId: contextId,
    eventDuration: eventDuration,
    eventId: eventId,
    eventEnd: eventEnd,
    eventStart: eventStart
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_source_destination.SourceDestination, {
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
    networkBytes: networkBytes,
    networkCommunityId: networkCommunityId,
    networkDirection: networkDirection,
    networkPackets: networkPackets,
    networkProtocol: networkProtocol,
    sourceBytes: sourceBytes,
    sourceGeoContinentName: sourceGeoContinentName,
    sourceGeoCountryName: sourceGeoCountryName,
    sourceGeoCountryIsoCode: sourceGeoCountryIsoCode,
    sourceGeoRegionName: sourceGeoRegionName,
    sourceGeoCityName: sourceGeoCityName,
    sourceIp: sourceIp,
    sourcePackets: sourcePackets,
    sourcePort: sourcePort,
    transport: transport
  })));
});

exports.NetflowColumns = NetflowColumns;
NetflowColumns.displayName = 'NetflowColumns';