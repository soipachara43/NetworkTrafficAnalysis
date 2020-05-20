"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemGenericFileDetails = exports.SystemGenericFileLine = void 0;

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

var _args = require("../args");

var _auth_ssh = require("./auth_ssh");

var _exit_code_draggable = require("../exit_code_draggable");

var _file_draggable = require("../file_draggable");

var _package = require("./package");

var _page = require("../../../../page");

var _parent_process_draggable = require("../parent_process_draggable");

var _process_hash = require("../process_hash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SystemGenericFileLine = _react.default.memo(function (_ref) {
  var args = _ref.args,
      contextId = _ref.contextId,
      endgameExitCode = _ref.endgameExitCode,
      endgameFileName = _ref.endgameFileName,
      endgameFilePath = _ref.endgameFilePath,
      endgameParentProcessName = _ref.endgameParentProcessName,
      endgamePid = _ref.endgamePid,
      endgameProcessName = _ref.endgameProcessName,
      eventAction = _ref.eventAction,
      fileName = _ref.fileName,
      filePath = _ref.filePath,
      hostName = _ref.hostName,
      id = _ref.id,
      message = _ref.message,
      outcome = _ref.outcome,
      packageName = _ref.packageName,
      packageSummary = _ref.packageSummary,
      packageVersion = _ref.packageVersion,
      processExecutable = _ref.processExecutable,
      processHashMd5 = _ref.processHashMd5,
      processHashSha1 = _ref.processHashSha1,
      processHashSha256 = _ref.processHashSha256,
      processName = _ref.processName,
      processPid = _ref.processPid,
      processPpid = _ref.processPpid,
      processTitle = _ref.processTitle,
      showMessage = _ref.showMessage,
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
    eventId: id,
    contextId: contextId,
    userDomain: userDomain,
    userName: userName,
    workingDirectory: workingDirectory,
    hostName: hostName
  }), _react.default.createElement(_helpers2.TokensFlexItem, {
    grow: false,
    component: "span"
  }, text), _react.default.createElement(_file_draggable.FileDraggable, {
    contextId: contextId,
    endgameFileName: endgameFileName,
    endgameFilePath: endgameFilePath,
    eventId: id,
    fileName: fileName,
    filePath: filePath
  }), (0, _helpers2.showVia)(eventAction) && _react.default.createElement(_helpers2.TokensFlexItem, {
    "data-test-subj": "via",
    grow: false,
    component: "span"
  }, i18n.VIA), _react.default.createElement(_helpers2.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_process_draggable.ProcessDraggableWithNonExistentProcess, {
    contextId: contextId,
    endgamePid: endgamePid,
    endgameProcessName: endgameProcessName,
    eventId: id,
    processPid: processPid,
    processName: processName,
    processExecutable: processExecutable
  })), _react.default.createElement(_args.Args, {
    args: args,
    contextId: contextId,
    eventId: id,
    processTitle: processTitle
  }), _react.default.createElement(_exit_code_draggable.ExitCodeDraggable, {
    contextId: contextId,
    endgameExitCode: endgameExitCode,
    eventId: id,
    text: i18n.WITH_EXIT_CODE
  }), !(0, _helpers2.isProcessStoppedOrTerminationEvent)(eventAction) && _react.default.createElement(_parent_process_draggable.ParentProcessDraggable, {
    contextId: contextId,
    endgameParentProcessName: endgameParentProcessName,
    eventId: id,
    processPpid: processPpid,
    text: i18n.VIA_PARENT_PROCESS
  }), outcome != null && _react.default.createElement(_helpers2.TokensFlexItem, {
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
  })), _react.default.createElement(_process_hash.ProcessHash, {
    contextId: contextId,
    eventId: id,
    processHashMd5: processHashMd5,
    processHashSha1: processHashSha1,
    processHashSha256: processHashSha256
  }), message != null && showMessage && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
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

exports.SystemGenericFileLine = SystemGenericFileLine;
SystemGenericFileLine.displayName = 'SystemGenericFileLine';

var SystemGenericFileDetails = _react.default.memo(function (_ref2) {
  var data = _ref2.data,
      contextId = _ref2.contextId,
      _ref2$showMessage = _ref2.showMessage,
      showMessage = _ref2$showMessage === void 0 ? true : _ref2$showMessage,
      text = _ref2.text,
      timelineId = _ref2.timelineId;
  var id = data._id;
  var message = data.message != null ? data.message[0] : null;
  var hostName = (0, _fp.get)('host.name[0]', data);
  var endgameExitCode = (0, _fp.get)('endgame.exit_code[0]', data);
  var endgameFileName = (0, _fp.get)('endgame.file_name[0]', data);
  var endgameFilePath = (0, _fp.get)('endgame.file_path[0]', data);
  var endgameParentProcessName = (0, _fp.get)('endgame.parent_process_name[0]', data);
  var endgamePid = (0, _fp.get)('endgame.pid[0]', data);
  var endgameProcessName = (0, _fp.get)('endgame.process_name[0]', data);
  var eventAction = (0, _fp.get)('event.action[0]', data);
  var fileName = (0, _fp.get)('file.name[0]', data);
  var filePath = (0, _fp.get)('file.path[0]', data);
  var userDomain = (0, _fp.get)('user.domain[0]', data);
  var userName = (0, _fp.get)('user.name[0]', data);
  var outcome = (0, _fp.get)('event.outcome[0]', data);
  var packageName = (0, _fp.get)('system.audit.package.name[0]', data);
  var packageSummary = (0, _fp.get)('system.audit.package.summary[0]', data);
  var packageVersion = (0, _fp.get)('system.audit.package.version[0]', data);
  var processHashMd5 = (0, _fp.get)('process.hash.md5[0]', data);
  var processHashSha1 = (0, _fp.get)('process.hash.sha1[0]', data);
  var processHashSha256 = (0, _fp.get)('process.hash.sha256', data);
  var processPid = (0, _fp.get)('process.pid[0]', data);
  var processPpid = (0, _fp.get)('process.ppid[0]', data);
  var processName = (0, _fp.get)('process.name[0]', data);
  var sshSignature = (0, _fp.get)('system.auth.ssh.signature[0]', data);
  var sshMethod = (0, _fp.get)('system.auth.ssh.method[0]', data);
  var processExecutable = (0, _fp.get)('process.executable[0]', data);
  var processTitle = (0, _fp.get)('process.title[0]', data);
  var workingDirectory = (0, _fp.get)('process.working_directory[0]', data);
  var args = (0, _fp.get)('process.args', data);
  return _react.default.createElement(_helpers2.Details, null, _react.default.createElement(SystemGenericFileLine, {
    id: id,
    contextId: contextId,
    text: text,
    hostName: hostName,
    endgameExitCode: endgameExitCode,
    endgameFileName: endgameFileName,
    endgameFilePath: endgameFilePath,
    endgameParentProcessName: endgameParentProcessName,
    endgamePid: endgamePid,
    endgameProcessName: endgameProcessName,
    eventAction: eventAction,
    fileName: fileName,
    filePath: filePath,
    userDomain: userDomain,
    userName: userName,
    message: message,
    processTitle: processTitle,
    workingDirectory: workingDirectory,
    args: args,
    packageName: packageName,
    packageSummary: packageSummary,
    packageVersion: packageVersion,
    processHashMd5: processHashMd5,
    processHashSha1: processHashSha1,
    processHashSha256: processHashSha256,
    processName: processName,
    processPid: processPid,
    processPpid: processPpid,
    processExecutable: processExecutable,
    showMessage: showMessage,
    sshSignature: sshSignature,
    sshMethod: sshMethod,
    outcome: outcome
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_netflow.NetflowRenderer, {
    data: data,
    timelineId: timelineId
  }));
});

exports.SystemGenericFileDetails = SystemGenericFileDetails;
SystemGenericFileDetails.displayName = 'SystemGenericFileDetails';