"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProcess = exports.USER_NAME_FIELD_NAME = exports.PROCESS_NAME_FIELD_NAME = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../draggables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PROCESS_NAME_FIELD_NAME = 'process.name';
exports.PROCESS_NAME_FIELD_NAME = PROCESS_NAME_FIELD_NAME;
var USER_NAME_FIELD_NAME = 'user.name';
/**
 * Renders a column of draggable badges containing:
 * - `user.name`
 * - `process.name`
 */

exports.USER_NAME_FIELD_NAME = USER_NAME_FIELD_NAME;

var UserProcess = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      processName = _ref.processName,
      userName = _ref.userName;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexStart",
    "data-test-subj": "user-process",
    direction: "column",
    justifyContent: "center",
    gutterSize: "none"
  }, userName != null ? (0, _fp.uniq)(userName).map(function (user) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: user
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      "data-test-subj": "user-name",
      eventId: eventId,
      field: USER_NAME_FIELD_NAME,
      value: user,
      iconType: "user"
    }));
  }) : null, processName != null ? (0, _fp.uniq)(processName).map(function (process) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: process
    }, _react.default.createElement(_draggables.DraggableBadge, {
      contextId: contextId,
      "data-test-subj": "process-name",
      eventId: eventId,
      field: PROCESS_NAME_FIELD_NAME,
      value: process,
      iconType: "console"
    }));
  }) : null);
});

exports.UserProcess = UserProcess;
UserProcess.displayName = 'UserProcess';