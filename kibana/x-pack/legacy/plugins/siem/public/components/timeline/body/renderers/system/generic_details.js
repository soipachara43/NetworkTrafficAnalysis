"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemGenericDetails = exports.SystemGenericLine = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var _helpers = require("../../../../tables/helpers");

var i18n = _interopRequireWildcard(require("./translations"));

var _netflow = require("../netflow");

var _user_host_working_dir = require("../user_host_working_dir");

var _helpers2 = require("../helpers");

var _process_draggable = require("../process_draggable");

var _package = require("./package");

var _auth_ssh = require("./auth_ssh");

var _page = require("../../../../page");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SystemGenericLine = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      hostName = _ref.hostName,
      id = _ref.id,
      message = _ref.message,
      outcome = _ref.outcome,
      packageName = _ref.packageName,
      packageSummary = _ref.packageSummary,
      packageVersion = _ref.packageVersion,
      processPid = _ref.processPid,
      processName = _ref.processName,
      processExecutable = _ref.processExecutable,
      sshSignature = _ref.sshSignature,
      sshMethod = _ref.sshMethod,
      text = _ref.text,
      userDomain = _ref.userDomain,
      userName = _ref.userName,
      workingDirectory = _ref.workingDirectory;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, _react.default.createElement(_user_host_working_dir.UserHostWorkingDir, {
    contextId: contextId,
    eventId: id,
    userDomain: userDomain,
    userName: userName,
    hostName: hostName,
    workingDirectory: workingDirectory
  }), _react.default.createElement(_helpers2.TokensFlexItem, {
    grow: false,
    component: "span"
  }, text), _react.default.createElement(_helpers2.TokensFlexItem, {
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
  })), outcome != null && _react.default.createElement(_helpers2.TokensFlexItem, {
    grow: false,
    component: "span"
  }, i18n.WITH_RESULT), _react.default.createElement(_helpers2.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "event.outcome",
    queryValue: outcome,
    value: outcome
  })), _react.default.createElement(_auth_ssh.AuthSsh, {
    contextId: contextId,
    eventId: id,
    sshSignature: sshSignature,
    sshMethod: sshMethod
  }), _react.default.createElement(_package.Package, {
    contextId: contextId,
    eventId: id,
    packageName: packageName,
    packageSummary: packageSummary,
    packageVersion: packageVersion
  })), message != null && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, _react.default.createElement(_helpers2.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_page.Badge, {
    iconType: "editorComment",
    color: "hollow"
  }, _react.default.createElement(_helpers.OverflowField, {
    value: message
  }))))));
});

exports.SystemGenericLine = SystemGenericLine;
SystemGenericLine.displayName = 'SystemGenericLine';

var SystemGenericDetails = _react.default.memo(function (_ref2) {
  var data = _ref2.data,
      contextId = _ref2.contextId,
      text = _ref2.text,
      timelineId = _ref2.timelineId;
  var id = data._id;
  var message = data.message != null ? data.message[0] : null;
  var hostName = (0, _fp.get)('host.name[0]', data);
  var userDomain = (0, _fp.get)('user.domain[0]', data);
  var userName = (0, _fp.get)('user.name[0]', data);
  var outcome = (0, _fp.get)('event.outcome[0]', data);
  var packageName = (0, _fp.get)('system.audit.package.name[0]', data);
  var packageSummary = (0, _fp.get)('system.audit.package.summary[0]', data);
  var packageVersion = (0, _fp.get)('system.audit.package.version[0]', data);
  var processPid = (0, _fp.get)('process.pid[0]', data);
  var processName = (0, _fp.get)('process.name[0]', data);
  var processExecutable = (0, _fp.get)('process.executable[0]', data);
  var sshSignature = (0, _fp.get)('system.auth.ssh.signature[0]', data);
  var sshMethod = (0, _fp.get)('system.auth.ssh.method[0]', data);
  var workingDirectory = (0, _fp.get)('process.working_directory[0]', data);
  return _react.default.createElement(_helpers2.Details, null, _react.default.createElement(SystemGenericLine, {
    contextId: contextId,
    hostName: hostName,
    id: id,
    message: message,
    outcome: outcome,
    packageName: packageName,
    packageSummary: packageSummary,
    packageVersion: packageVersion,
    processExecutable: processExecutable,
    processPid: processPid,
    processName: processName,
    sshMethod: sshMethod,
    sshSignature: sshSignature,
    text: text,
    userDomain: userDomain,
    userName: userName,
    workingDirectory: workingDirectory
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_netflow.NetflowRenderer, {
    data: data,
    timelineId: timelineId
  }));
});

exports.SystemGenericDetails = SystemGenericDetails;
SystemGenericDetails.displayName = 'SystemGenericDetails';