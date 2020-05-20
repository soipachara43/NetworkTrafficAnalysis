"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndgameSecurityEventDetails = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _netflow = require("../netflow");

var _endgame_security_event_details_line = require("./endgame_security_event_details_line");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EndgameSecurityEventDetails = _react.default.memo(function (_ref) {
  var data = _ref.data,
      contextId = _ref.contextId,
      timelineId = _ref.timelineId;
  var endgameLogonType = (0, _fp.get)('endgame.logon_type[0]', data);
  var endgameSubjectDomainName = (0, _fp.get)('endgame.subject_domain_name[0]', data);
  var endgameSubjectLogonId = (0, _fp.get)('endgame.subject_logon_id[0]', data);
  var endgameSubjectUserName = (0, _fp.get)('endgame.subject_user_name[0]', data);
  var endgameTargetLogonId = (0, _fp.get)('endgame.target_logon_id[0]', data);
  var endgameTargetDomainName = (0, _fp.get)('endgame.target_domain_name[0]', data);
  var endgameTargetUserName = (0, _fp.get)('endgame.target_user_name[0]', data);
  var eventAction = (0, _fp.get)('event.action[0]', data);
  var eventCode = (0, _fp.get)('event.code[0]', data);
  var hostName = (0, _fp.get)('host.name[0]', data);
  var id = data._id;
  var processExecutable = (0, _fp.get)('process.executable[0]', data);
  var processName = (0, _fp.get)('process.name[0]', data);
  var processPid = (0, _fp.get)('process.pid[0]', data);
  var userDomain = (0, _fp.get)('user.domain[0]', data);
  var userName = (0, _fp.get)('user.name[0]', data);
  var winlogEventId = (0, _fp.get)('winlog.event_id[0]', data);
  return _react.default.createElement(_helpers.Details, null, _react.default.createElement(_endgame_security_event_details_line.EndgameSecurityEventDetailsLine, {
    contextId: contextId,
    endgameLogonType: endgameLogonType,
    endgameSubjectDomainName: endgameSubjectDomainName,
    endgameSubjectLogonId: endgameSubjectLogonId,
    endgameSubjectUserName: endgameSubjectUserName,
    endgameTargetDomainName: endgameTargetDomainName,
    endgameTargetLogonId: endgameTargetLogonId,
    endgameTargetUserName: endgameTargetUserName,
    eventAction: eventAction,
    eventCode: eventCode,
    hostName: hostName,
    id: id,
    processExecutable: processExecutable,
    processName: processName,
    processPid: processPid,
    userDomain: userDomain,
    userName: userName,
    winlogEventId: winlogEventId
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_netflow.NetflowRenderer, {
    data: data,
    timelineId: timelineId
  }));
});

exports.EndgameSecurityEventDetails = EndgameSecurityEventDetails;
EndgameSecurityEventDetails.displayName = 'EndgameSecurityEventDetails';