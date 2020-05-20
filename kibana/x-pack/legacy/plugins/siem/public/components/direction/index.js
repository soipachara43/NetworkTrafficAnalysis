"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionBadge = exports.getDirectionIcon = exports.DEFAULT_ICON = exports.UNKNOWN = exports.LISTENING = exports.OUTGOING = exports.INCOMING = exports.INTERNAL = exports.EXTERNAL = exports.OUTBOUND = exports.INBOUND = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("../../graphql/types");

var _draggables = require("../draggables");

var _field_names = require("../source_destination/field_names");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INBOUND = 'inbound';
exports.INBOUND = INBOUND;
var OUTBOUND = 'outbound';
exports.OUTBOUND = OUTBOUND;
var EXTERNAL = 'external';
exports.EXTERNAL = EXTERNAL;
var INTERNAL = 'internal';
exports.INTERNAL = INTERNAL;
var INCOMING = 'incoming';
exports.INCOMING = INCOMING;
var OUTGOING = 'outgoing';
exports.OUTGOING = OUTGOING;
var LISTENING = 'listening';
exports.LISTENING = LISTENING;
var UNKNOWN = 'unknown';
exports.UNKNOWN = UNKNOWN;
var DEFAULT_ICON = 'questionInCircle';
/** Returns an icon representing the value of `network.direction` */

exports.DEFAULT_ICON = DEFAULT_ICON;

var getDirectionIcon = function getDirectionIcon(networkDirection) {
  if (networkDirection == null) {
    return DEFAULT_ICON;
  }

  var direction = "".concat(networkDirection).toLowerCase();

  switch (direction) {
    case _types.NetworkDirectionEcs.outbound:
    case _types.NetworkDirectionEcs.outgoing:
      return 'arrowUp';

    case _types.NetworkDirectionEcs.inbound:
    case _types.NetworkDirectionEcs.incoming:
    case _types.NetworkDirectionEcs.listening:
      return 'arrowDown';

    case _types.NetworkDirectionEcs.external:
      return 'globe';

    case _types.NetworkDirectionEcs.internal:
      return 'bullseye';

    case _types.NetworkDirectionEcs.unknown:
    default:
      return DEFAULT_ICON;
  }
};
/**
 * Renders a badge containing the value of `network.direction`
 */


exports.getDirectionIcon = getDirectionIcon;

var DirectionBadge = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      direction = _ref.direction;
  return _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    "data-test-subj": "network-direction",
    eventId: eventId,
    field: _field_names.NETWORK_DIRECTION_FIELD_NAME,
    iconType: getDirectionIcon(direction),
    value: direction
  });
});

exports.DirectionBadge = DirectionBadge;
DirectionBadge.displayName = 'DirectionBadge';