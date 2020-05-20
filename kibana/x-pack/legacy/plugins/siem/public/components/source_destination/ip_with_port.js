"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IpWithPort = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ip = require("../ip");

var _port = require("../port");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IpPortSeparator = _styledComponents.default.span.withConfig({
  displayName: "IpPortSeparator",
  componentId: "sc-8f7edl-0"
})(["margin:0 3px;"]);

IpPortSeparator.displayName = 'IpPortSeparator';
/**
 * Renders a separator (i.e. `:`) and a draggable, hyperlinked port when
 * a port is specified
 */

var PortWithSeparator = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      port = _ref.port,
      portFieldName = _ref.portFieldName;
  return port != null ? _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(IpPortSeparator, {
    "data-test-subj": "ip-port-separator"
  }, ':')), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_port.Port, {
    contextId: contextId,
    "data-test-subj": "port",
    eventId: eventId,
    fieldName: portFieldName,
    value: port
  }))) : null;
});

PortWithSeparator.displayName = 'PortWithSeparator';
/**
 * Renders a draggable, hyperlinked IP address, and if provided, an associated
 * draggable, hyperlinked port (with a separator between the IP address and port)
 */

var IpWithPort = _react.default.memo(function (_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      ip = _ref2.ip,
      ipFieldName = _ref2.ipFieldName,
      port = _ref2.port,
      portFieldName = _ref2.portFieldName;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_ip.Ip, {
    contextId: contextId,
    "data-test-subj": "ip",
    eventId: eventId,
    fieldName: ipFieldName,
    value: ip
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(PortWithSeparator, {
    contextId: contextId,
    eventId: eventId,
    port: port,
    portFieldName: portFieldName
  })));
});

exports.IpWithPort = IpWithPort;
IpWithPort.displayName = 'IpWithPort';