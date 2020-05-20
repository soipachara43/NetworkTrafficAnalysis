"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserHostWorkingDir = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _helpers = require("./helpers");

var _host_working_dir = require("./host_working_dir");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UserHostWorkingDir = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      hostName = _ref.hostName,
      _ref$hostNameSeparato = _ref.hostNameSeparator,
      hostNameSeparator = _ref$hostNameSeparato === void 0 ? '@' : _ref$hostNameSeparato,
      userDomain = _ref.userDomain,
      _ref$userDomainField = _ref.userDomainField,
      userDomainField = _ref$userDomainField === void 0 ? 'user.domain' : _ref$userDomainField,
      userName = _ref.userName,
      _ref$userNameField = _ref.userNameField,
      userNameField = _ref$userNameField === void 0 ? 'user.name' : _ref$userNameField,
      workingDirectory = _ref.workingDirectory;
  return userName != null || userDomain != null || hostName != null || workingDirectory != null ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: userNameField,
    value: userName,
    iconType: "user"
  })), userDomain != null && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    "data-test-subj": "user-host-working-dir-domain-separator-text",
    grow: false,
    component: "span"
  }, '\\'), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: userDomainField,
    value: userDomain
  }))), hostName != null && userName != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, hostNameSeparator), _react.default.createElement(_host_working_dir.HostWorkingDir, {
    contextId: contextId,
    eventId: eventId,
    hostName: hostName,
    workingDirectory: workingDirectory
  })) : null;
});

exports.UserHostWorkingDir = UserHostWorkingDir;
UserHostWorkingDir.displayName = 'UserHostWorkingDir';