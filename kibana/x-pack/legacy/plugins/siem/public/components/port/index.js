"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Port = exports.PORT_NAMES = exports.URL_PORT_FIELD_NAME = exports.SOURCE_PORT_FIELD_NAME = exports.SERVER_PORT_FIELD_NAME = exports.DESTINATION_PORT_FIELD_NAME = exports.CLIENT_PORT_FIELD_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../draggables");

var _empty_value = require("../empty_value");

var _external_link_icon = require("../external_link_icon");

var _links = require("../links");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CLIENT_PORT_FIELD_NAME = 'client.port';
exports.CLIENT_PORT_FIELD_NAME = CLIENT_PORT_FIELD_NAME;
var DESTINATION_PORT_FIELD_NAME = 'destination.port';
exports.DESTINATION_PORT_FIELD_NAME = DESTINATION_PORT_FIELD_NAME;
var SERVER_PORT_FIELD_NAME = 'server.port';
exports.SERVER_PORT_FIELD_NAME = SERVER_PORT_FIELD_NAME;
var SOURCE_PORT_FIELD_NAME = 'source.port';
exports.SOURCE_PORT_FIELD_NAME = SOURCE_PORT_FIELD_NAME;
var URL_PORT_FIELD_NAME = 'url.port';
exports.URL_PORT_FIELD_NAME = URL_PORT_FIELD_NAME;
var PORT_NAMES = [CLIENT_PORT_FIELD_NAME, DESTINATION_PORT_FIELD_NAME, SERVER_PORT_FIELD_NAME, SOURCE_PORT_FIELD_NAME, URL_PORT_FIELD_NAME];
exports.PORT_NAMES = PORT_NAMES;

var Port = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      value = _ref.value;
  return _react.default.createElement(_draggables.DefaultDraggable, {
    "data-test-subj": "port",
    field: fieldName,
    id: "port-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
    tooltipContent: fieldName,
    value: value
  }, _react.default.createElement(_links.PortOrServiceNameLink, {
    portOrServiceName: value || (0, _empty_value.getEmptyValue)()
  }), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null));
});

exports.Port = Port;
Port.displayName = 'Port';