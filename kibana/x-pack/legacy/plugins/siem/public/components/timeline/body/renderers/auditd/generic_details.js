"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuditdGenericDetails = exports.AuditdGenericLine = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var i18n = _interopRequireWildcard(require("./translations"));

var _netflow = require("../netflow");

var _helpers = require("../helpers");

var _process_draggable = require("../process_draggable");

var _args = require("../args");

var _session_user_host_working_dir = require("./session_user_host_working_dir");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AuditdGenericLine = _react.default.memo(function (_ref) {
  var id = _ref.id,
      contextId = _ref.contextId,
      hostName = _ref.hostName,
      userName = _ref.userName,
      primary = _ref.primary,
      processName = _ref.processName,
      processPid = _ref.processPid,
      processExecutable = _ref.processExecutable,
      processTitle = _ref.processTitle,
      secondary = _ref.secondary,
      workingDirectory = _ref.workingDirectory,
      args = _ref.args,
      result = _ref.result,
      session = _ref.session,
      text = _ref.text;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, _react.default.createElement(_session_user_host_working_dir.SessionUserHostWorkingDir, {
    eventId: id,
    contextId: contextId,
    hostName: hostName,
    userName: userName,
    primary: primary,
    secondary: secondary,
    workingDirectory: workingDirectory,
    session: session
  }), processExecutable != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, text), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_process_draggable.ProcessDraggable, {
    contextId: contextId,
    endgamePid: undefined,
    endgameProcessName: undefined,
    eventId: id,
    processPid: processPid,
    processName: processName,
    processExecutable: processExecutable
  })), _react.default.createElement(_args.Args, {
    eventId: id,
    args: args,
    contextId: contextId,
    processTitle: processTitle
  }), result != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, i18n.WITH_RESULT), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "auditd.result",
    queryValue: result,
    value: result
  })));
});

exports.AuditdGenericLine = AuditdGenericLine;
AuditdGenericLine.displayName = 'AuditdGenericLine';

var AuditdGenericDetails = _react.default.memo(function (_ref2) {
  var data = _ref2.data,
      contextId = _ref2.contextId,
      text = _ref2.text,
      timelineId = _ref2.timelineId;
  var id = data._id;
  var session = (0, _fp.get)('auditd.session[0]', data);
  var hostName = (0, _fp.get)('host.name[0]', data);
  var userName = (0, _fp.get)('user.name[0]', data);
  var result = (0, _fp.get)('auditd.result[0]', data);
  var processPid = (0, _fp.get)('process.pid[0]', data);
  var processName = (0, _fp.get)('process.name[0]', data);
  var processExecutable = (0, _fp.get)('process.executable[0]', data);
  var processTitle = (0, _fp.get)('process.title[0]', data);
  var workingDirectory = (0, _fp.get)('process.working_directory[0]', data);
  var primary = (0, _fp.get)('auditd.summary.actor.primary[0]', data);
  var secondary = (0, _fp.get)('auditd.summary.actor.secondary[0]', data);
  var args = (0, _fp.get)('process.args', data);

  if (data.process != null) {
    return _react.default.createElement(_helpers.Details, null, _react.default.createElement(AuditdGenericLine, {
      id: id,
      contextId: contextId,
      text: text,
      hostName: hostName,
      userName: userName,
      processName: processName,
      processPid: processPid,
      processExecutable: processExecutable,
      processTitle: processTitle,
      workingDirectory: workingDirectory,
      args: args,
      session: session,
      primary: primary,
      result: result,
      secondary: secondary
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_netflow.NetflowRenderer, {
      data: data,
      timelineId: timelineId
    }));
  } else {
    return null;
  }
});

exports.AuditdGenericDetails = AuditdGenericDetails;
AuditdGenericDetails.displayName = 'AuditdGenericDetails';