"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetflowRenderer = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _helpers = require("../../../../lib/helpers");

var _certificate_fingerprint = require("../../../certificate_fingerprint");

var _duration = require("../../../duration");

var _event_id = require("../../../event_details/event_id");

var _ip = require("../../../ip");

var _ja3_fingerprint = require("../../../ja3_fingerprint");

var _netflow = require("../../../netflow");

var _duration_event_start_end = require("../../../netflow/netflow_columns/duration_event_start_end");

var _port = require("../../../port");

var _geo_fields = require("../../../source_destination/geo_fields");

var _source_destination_arrows = require("../../../source_destination/source_destination_arrows");

var _field_names = require("../../../source_destination/field_names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NetflowRenderer = _react.default.memo(function (_ref) {
  var data = _ref.data,
      timelineId = _ref.timelineId;
  return _react.default.createElement(_netflow.Netflow, {
    contextId: "netflow-renderer-".concat(timelineId, "-").concat(data._id),
    destinationBytes: (0, _helpers.asArrayIfExists)((0, _fp.get)(_source_destination_arrows.DESTINATION_BYTES_FIELD_NAME, data)),
    destinationGeoContinentName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME, data)),
    destinationGeoCountryName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME, data)),
    destinationGeoCountryIsoCode: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME, data)),
    destinationGeoRegionName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.DESTINATION_GEO_REGION_NAME_FIELD_NAME, data)),
    destinationGeoCityName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.DESTINATION_GEO_CITY_NAME_FIELD_NAME, data)),
    destinationIp: (0, _helpers.asArrayIfExists)((0, _fp.get)(_ip.DESTINATION_IP_FIELD_NAME, data)),
    destinationPackets: (0, _helpers.asArrayIfExists)((0, _fp.get)(_source_destination_arrows.DESTINATION_PACKETS_FIELD_NAME, data)),
    destinationPort: (0, _helpers.asArrayIfExists)((0, _fp.get)(_port.DESTINATION_PORT_FIELD_NAME, data)),
    eventDuration: (0, _helpers.asArrayIfExists)((0, _fp.get)(_duration.EVENT_DURATION_FIELD_NAME, data)),
    eventId: (0, _fp.get)(_event_id.ID_FIELD_NAME, data),
    eventEnd: (0, _helpers.asArrayIfExists)((0, _fp.get)(_duration_event_start_end.EVENT_END_FIELD_NAME, data)),
    eventStart: (0, _helpers.asArrayIfExists)((0, _fp.get)(_duration_event_start_end.EVENT_START_FIELD_NAME, data)),
    networkBytes: (0, _helpers.asArrayIfExists)((0, _fp.get)(_field_names.NETWORK_BYTES_FIELD_NAME, data)),
    networkCommunityId: (0, _helpers.asArrayIfExists)((0, _fp.get)(_field_names.NETWORK_COMMUNITY_ID_FIELD_NAME, data)),
    networkDirection: (0, _helpers.asArrayIfExists)((0, _fp.get)(_field_names.NETWORK_DIRECTION_FIELD_NAME, data)),
    networkPackets: (0, _helpers.asArrayIfExists)((0, _fp.get)(_field_names.NETWORK_PACKETS_FIELD_NAME, data)),
    networkProtocol: (0, _helpers.asArrayIfExists)((0, _fp.get)(_field_names.NETWORK_PROTOCOL_FIELD_NAME, data)),
    sourceBytes: (0, _helpers.asArrayIfExists)((0, _fp.get)(_source_destination_arrows.SOURCE_BYTES_FIELD_NAME, data)),
    sourceGeoContinentName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.SOURCE_GEO_CONTINENT_NAME_FIELD_NAME, data)),
    sourceGeoCountryName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.SOURCE_GEO_COUNTRY_NAME_FIELD_NAME, data)),
    sourceGeoCountryIsoCode: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME, data)),
    sourceGeoRegionName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.SOURCE_GEO_REGION_NAME_FIELD_NAME, data)),
    sourceGeoCityName: (0, _helpers.asArrayIfExists)((0, _fp.get)(_geo_fields.SOURCE_GEO_CITY_NAME_FIELD_NAME, data)),
    sourceIp: (0, _helpers.asArrayIfExists)((0, _fp.get)(_ip.SOURCE_IP_FIELD_NAME, data)),
    sourcePackets: (0, _helpers.asArrayIfExists)((0, _fp.get)(_source_destination_arrows.SOURCE_PACKETS_FIELD_NAME, data)),
    sourcePort: (0, _helpers.asArrayIfExists)((0, _fp.get)(_port.SOURCE_PORT_FIELD_NAME, data)),
    tlsClientCertificateFingerprintSha1: (0, _helpers.asArrayIfExists)((0, _fp.get)(_certificate_fingerprint.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME, data)),
    tlsFingerprintsJa3Hash: (0, _helpers.asArrayIfExists)((0, _fp.get)(_ja3_fingerprint.JA3_HASH_FIELD_NAME, data)),
    tlsServerCertificateFingerprintSha1: (0, _helpers.asArrayIfExists)((0, _fp.get)(_certificate_fingerprint.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME, data)),
    transport: (0, _helpers.asArrayIfExists)((0, _fp.get)(_field_names.NETWORK_TRANSPORT_FIELD_NAME, data)),
    userName: undefined
  });
});

exports.NetflowRenderer = NetflowRenderer;
NetflowRenderer.displayName = 'NetflowRenderer';