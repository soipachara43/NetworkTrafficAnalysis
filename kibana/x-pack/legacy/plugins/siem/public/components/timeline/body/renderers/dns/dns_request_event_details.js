"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DnsRequestEventDetails = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _helpers = require("../helpers");

var _netflow = require("../netflow");

var _dns_request_event_details_line = require("./dns_request_event_details_line");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DnsRequestEventDetails = _react.default.memo(function (_ref) {
  var data = _ref.data,
      contextId = _ref.contextId,
      timelineId = _ref.timelineId;
  var dnsQuestionName = (0, _fp.get)('dns.question.name[0]', data);
  var dnsQuestionType = (0, _fp.get)('dns.question.type[0]', data);
  var dnsResolvedIp = (0, _fp.get)('dns.resolved_ip[0]', data);
  var dnsResponseCode = (0, _fp.get)('dns.response_code[0]', data);
  var eventCode = (0, _fp.get)('event.code[0]', data);
  var hostName = (0, _fp.get)('host.name[0]', data);
  var id = data._id;
  var processExecutable = (0, _fp.get)('process.executable[0]', data);
  var processName = (0, _fp.get)('process.name[0]', data);
  var processPid = (0, _fp.get)('process.pid[0]', data);
  var userDomain = (0, _fp.get)('user.domain[0]', data);
  var userName = (0, _fp.get)('user.name[0]', data);
  var winlogEventId = (0, _fp.get)('winlog.event_id[0]', data);
  return _react.default.createElement(_helpers.Details, null, _react.default.createElement(_dns_request_event_details_line.DnsRequestEventDetailsLine, {
    contextId: contextId,
    dnsQuestionName: dnsQuestionName,
    dnsQuestionType: dnsQuestionType,
    dnsResolvedIp: dnsResolvedIp,
    dnsResponseCode: dnsResponseCode,
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

exports.DnsRequestEventDetails = DnsRequestEventDetails;
DnsRequestEventDetails.displayName = 'DnsRequestEventDetails';