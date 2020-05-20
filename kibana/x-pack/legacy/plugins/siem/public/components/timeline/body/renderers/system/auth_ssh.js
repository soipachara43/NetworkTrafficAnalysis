"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthSsh = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AuthSsh = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      sshSignature = _ref.sshSignature,
      sshMethod = _ref.sshMethod;
  return _react.default.createElement(_react.default.Fragment, null, sshSignature != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "system.audit.package.name",
    value: sshSignature,
    iconType: "document"
  })), sshMethod != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "system.audit.package.version",
    value: sshMethod,
    iconType: "document"
  })));
});

exports.AuthSsh = AuthSsh;
AuthSsh.displayName = 'AuthSsh';