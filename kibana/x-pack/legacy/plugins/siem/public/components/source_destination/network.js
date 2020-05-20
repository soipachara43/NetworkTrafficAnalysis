"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _direction = require("../direction");

var _draggables = require("../draggables");

var i18n = _interopRequireWildcard(require("./translations"));

var _field_names = require("./field_names");

var _formatted_bytes = require("../formatted_bytes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EuiFlexItemMarginRight = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "EuiFlexItemMarginRight",
  componentId: "sc-1hu3r1e-0"
})(["margin-right:3px;"]);
EuiFlexItemMarginRight.displayName = 'EuiFlexItemMarginRight';
var Stats = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "Stats",
  componentId: "sc-1hu3r1e-1"
})(["margin:0 5px;"]);
Stats.displayName = 'Stats';
/**
 * Renders a row of draggable badges containing fields from the
 * `Network` category of fields
 */

var Network = _react.default.memo(function (_ref) {
  var bytes = _ref.bytes,
      communityId = _ref.communityId,
      contextId = _ref.contextId,
      direction = _ref.direction,
      eventId = _ref.eventId,
      packets = _ref.packets,
      protocol = _ref.protocol,
      transport = _ref.transport;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center",
    gutterSize: "none"
  }, direction != null ? (0, _fp.uniq)(direction).map(function (dir) {
    return _react.default.createElement(EuiFlexItemMarginRight, {
      grow: false,
      key: dir
    }, _react.default.createElement(_direction.DirectionBadge, {
      contextId: contextId,
      eventId: eventId,
      direction: dir
    }));
  }) : null, protocol != null ? (0, _fp.uniq)(protocol).map(function (proto) {
    return _react.default.createElement(EuiFlexItemMarginRight, {
      grow: false,
      key: proto
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      "data-test-subj": "network-protocol",
      eventId: eventId,
      field: _field_names.NETWORK_PROTOCOL_FIELD_NAME,
      value: proto
    }));
  }) : null, bytes != null ? (0, _fp.uniq)(bytes).map(function (b) {
    return !isNaN(Number(b)) ? _react.default.createElement(EuiFlexItemMarginRight, {
      grow: false,
      key: b
    }, _react.default.createElement(_draggables.DefaultDraggable, {
      field: _field_names.NETWORK_BYTES_FIELD_NAME,
      id: "network-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(_field_names.NETWORK_BYTES_FIELD_NAME, "-").concat(b),
      value: b
    }, _react.default.createElement(Stats, {
      size: "xs"
    }, _react.default.createElement("span", {
      "data-test-subj": "network-bytes"
    }, _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
      value: b
    }))))) : null;
  }) : null, packets != null ? (0, _fp.uniq)(packets).map(function (p) {
    return _react.default.createElement(EuiFlexItemMarginRight, {
      grow: false,
      key: p
    }, _react.default.createElement(_draggables.DefaultDraggable, {
      field: _field_names.NETWORK_PACKETS_FIELD_NAME,
      id: "network-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(_field_names.NETWORK_PACKETS_FIELD_NAME, "-").concat(p),
      value: p
    }, _react.default.createElement(Stats, {
      size: "xs"
    }, _react.default.createElement("span", {
      "data-test-subj": "network-packets"
    }, "".concat(p, " ").concat(i18n.PACKETS)))));
  }) : null, transport != null ? (0, _fp.uniq)(transport).map(function (trans) {
    return _react.default.createElement(EuiFlexItemMarginRight, {
      grow: false,
      key: trans
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      "data-test-subj": "network-transport",
      eventId: eventId,
      field: _field_names.NETWORK_TRANSPORT_FIELD_NAME,
      value: trans
    }));
  }) : null, communityId != null ? (0, _fp.uniq)(communityId).map(function (trans) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: trans
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      "data-test-subj": "network-community-id",
      eventId: eventId,
      field: _field_names.NETWORK_COMMUNITY_ID_FIELD_NAME,
      value: trans
    }));
  }) : null);
});

exports.Network = Network;
Network.displayName = 'Network';