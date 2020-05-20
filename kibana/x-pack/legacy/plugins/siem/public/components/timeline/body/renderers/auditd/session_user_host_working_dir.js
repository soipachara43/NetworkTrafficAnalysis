"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionUserHostWorkingDir = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("../helpers");

var _host_working_dir = require("../host_working_dir");

var _primary_secondary_user_info = require("./primary_secondary_user_info");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SessionUserHostWorkingDir = _react.default.memo(function (_ref) {
  var eventId = _ref.eventId,
      contextId = _ref.contextId,
      hostName = _ref.hostName,
      userName = _ref.userName,
      primary = _ref.primary,
      secondary = _ref.secondary,
      workingDirectory = _ref.workingDirectory,
      session = _ref.session;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, i18n.SESSION), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "auditd.session",
    value: session,
    iconType: "number"
  })), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_primary_secondary_user_info.PrimarySecondaryUserInfo, {
    contextId: contextId,
    eventId: eventId,
    userName: userName,
    primary: primary,
    secondary: secondary
  })), hostName != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, '@'), _react.default.createElement(_host_working_dir.HostWorkingDir, {
    contextId: contextId,
    eventId: eventId,
    workingDirectory: workingDirectory,
    hostName: hostName
  }));
});

exports.SessionUserHostWorkingDir = SessionUserHostWorkingDir;
SessionUserHostWorkingDir.displayName = 'SessionUserHostWorkingDir';