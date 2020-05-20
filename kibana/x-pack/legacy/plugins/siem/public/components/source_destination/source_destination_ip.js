"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceDestinationIp = exports.hasPorts = exports.getPorts = exports.isIpFieldPopulated = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _ip = require("../ip");

var _port = require("../port");

var i18n = _interopRequireWildcard(require("../timeline/body/renderers/translations"));

var _geo_fields = require("./geo_fields");

var _ip_with_port = require("./ip_with_port");

var _label = require("./label");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns `true` if the ip field (i.e. `sourceIp`, `destinationIp`) that
 * corresponds with the specified `type` (i.e. `source`, `destination`) is
 * populated. This function will return `false` when the array only contains
 * empty values.
 */
var isIpFieldPopulated = function isIpFieldPopulated(_ref) {
  var destinationIp = _ref.destinationIp,
      sourceIp = _ref.sourceIp,
      type = _ref.type;
  return type === 'source' && sourceIp != null && sourceIp.some(function (ip) {
    return !(0, _fp.isEmpty)(ip);
  }) || type === 'destination' && destinationIp != null && destinationIp.some(function (ip) {
    return !(0, _fp.isEmpty)(ip);
  });
};
/**
 * Returns an array of ports, filtered such that `null` entries are removed. If
 * the provided `destinationPort` and `sourcePort` do not contain valid ports,
 * an empty array will be returned.
 */


exports.isIpFieldPopulated = isIpFieldPopulated;

var getPorts = function getPorts(_ref2) {
  var destinationPort = _ref2.destinationPort,
      sourcePort = _ref2.sourcePort,
      type = _ref2.type;
  var ports = type === 'source' && sourcePort != null ? sourcePort : type === 'destination' && destinationPort != null ? destinationPort : [];
  return ports.filter(function (p) {
    return p != null;
  }).map(function (p) {
    return "".concat(p);
  }).filter(function (p) {
    return !(0, _fp.isEmpty)(p);
  });
};
/**
 * Returns `true` if the array of ports, filtered to remove invalid entries,
 * has at least one port.
 */


exports.getPorts = getPorts;

var hasPorts = function hasPorts(_ref3) {
  var destinationPort = _ref3.destinationPort,
      sourcePort = _ref3.sourcePort,
      type = _ref3.type;
  return getPorts({
    destinationPort: destinationPort,
    sourcePort: sourcePort,
    type: type
  }).length > 0;
};

exports.hasPorts = hasPorts;

var IpAdressesWithPorts = _react.default.memo(function (_ref4) {
  var contextId = _ref4.contextId,
      destinationIp = _ref4.destinationIp,
      destinationPort = _ref4.destinationPort,
      eventId = _ref4.eventId,
      sourceIp = _ref4.sourceIp,
      sourcePort = _ref4.sourcePort,
      type = _ref4.type;
  var ip = type === 'source' ? sourceIp : destinationIp;
  var ipFieldName = type === 'source' ? _ip.SOURCE_IP_FIELD_NAME : _ip.DESTINATION_IP_FIELD_NAME;
  var port = type === 'source' ? sourcePort : destinationPort;
  var portFieldName = type === 'source' ? _port.SOURCE_PORT_FIELD_NAME : _port.DESTINATION_PORT_FIELD_NAME;

  if (ip == null) {
    return null; // if ip is not populated as an array, ports will be ignored
  } // IMPORTANT: The ip and port arrays are parallel arrays; the port at
  // index `i` corresponds with the ip address at index `i`. We must
  // preserve the relationships between the parallel arrays:


  var ipPortPairs = port != null && ip.length === port.length ? ip.map(function (address, i) {
    return {
      ip: address,
      port: port[i] != null ? "".concat(port[i]) : null // use the corresponding port in the parallel array

    };
  }) : ip.map(function (address) {
    return {
      ip: address,
      port: null // drop the port, because the length of the parallel ip and port arrays is different

    };
  });
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, (0, _fp.uniqWith)(_fastDeepEqual.default, ipPortPairs).map(function (ipPortPair) {
    return ipPortPair.ip != null && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: ipPortPair.ip
    }, _react.default.createElement(_ip_with_port.IpWithPort, {
      contextId: contextId,
      "data-test-subj": "".concat(type, "-ip-and-port"),
      eventId: eventId,
      ip: ipPortPair.ip,
      ipFieldName: ipFieldName,
      port: ipPortPair.port,
      portFieldName: portFieldName
    }));
  }));
});

IpAdressesWithPorts.displayName = 'IpAdressesWithPorts';
/**
 * When the ip field (i.e. `sourceIp`, `destinationIp`) that corresponds with
 * the specified `type` (i.e. `source`, `destination`) is populated, this component
 * renders:
 * - a label (i.e. `Source` or `Destination`)
 * - a draggable / hyperlinked IP address, when it's populated
 * - a port, hyperlinked to a port lookup service, when it's populated
 * - a summary of geolocation details, when they are populated
 */

var SourceDestinationIp = _react.default.memo(function (_ref5) {
  var contextId = _ref5.contextId,
      destinationGeoContinentName = _ref5.destinationGeoContinentName,
      destinationGeoCountryName = _ref5.destinationGeoCountryName,
      destinationGeoCountryIsoCode = _ref5.destinationGeoCountryIsoCode,
      destinationGeoRegionName = _ref5.destinationGeoRegionName,
      destinationGeoCityName = _ref5.destinationGeoCityName,
      destinationIp = _ref5.destinationIp,
      destinationPort = _ref5.destinationPort,
      eventId = _ref5.eventId,
      sourceGeoContinentName = _ref5.sourceGeoContinentName,
      sourceGeoCountryName = _ref5.sourceGeoCountryName,
      sourceGeoCountryIsoCode = _ref5.sourceGeoCountryIsoCode,
      sourceGeoRegionName = _ref5.sourceGeoRegionName,
      sourceGeoCityName = _ref5.sourceGeoCityName,
      sourceIp = _ref5.sourceIp,
      sourcePort = _ref5.sourcePort,
      type = _ref5.type;
  var label = type === 'source' ? i18n.SOURCE : i18n.DESTINATION;
  return isIpFieldPopulated({
    destinationIp: destinationIp,
    sourceIp: sourceIp,
    type: type
  }) || hasPorts({
    destinationPort: destinationPort,
    sourcePort: sourcePort,
    type: type
  }) ? _react.default.createElement(_eui.EuiBadge, {
    "data-test-subj": "".concat(type, "-ip-badge"),
    color: "hollow"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    "data-test-subj": "".concat(type, "-ip-group"),
    direction: "column",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_label.Label, {
    "data-test-subj": "".concat(type, "-label")
  }, label)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isIpFieldPopulated({
    destinationIp: destinationIp,
    sourceIp: sourceIp,
    type: type
  }) ? _react.default.createElement(IpAdressesWithPorts, {
    contextId: contextId,
    destinationIp: destinationIp,
    destinationPort: destinationPort,
    eventId: eventId,
    sourceIp: sourceIp,
    sourcePort: sourcePort,
    type: type
  }) : _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, getPorts({
    destinationPort: destinationPort,
    sourcePort: sourcePort,
    type: type
  }).map(function (port, i) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: "port-".concat(port, "-").concat(i),
      grow: false
    }, _react.default.createElement(_port.Port, {
      contextId: contextId,
      "data-test-subj": "port",
      eventId: eventId,
      fieldName: "".concat(type, ".port"),
      value: port
    }));
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_geo_fields.GeoFields, {
    contextId: contextId,
    destinationGeoContinentName: destinationGeoContinentName,
    destinationGeoCountryName: destinationGeoCountryName,
    destinationGeoCountryIsoCode: destinationGeoCountryIsoCode,
    destinationGeoRegionName: destinationGeoRegionName,
    destinationGeoCityName: destinationGeoCityName,
    eventId: eventId,
    sourceGeoContinentName: sourceGeoContinentName,
    sourceGeoCountryName: sourceGeoCountryName,
    sourceGeoCountryIsoCode: sourceGeoCountryIsoCode,
    sourceGeoRegionName: sourceGeoRegionName,
    sourceGeoCityName: sourceGeoCityName,
    type: type
  })))) : null;
});

exports.SourceDestinationIp = SourceDestinationIp;
SourceDestinationIp.displayName = 'SourceDestinationIp';