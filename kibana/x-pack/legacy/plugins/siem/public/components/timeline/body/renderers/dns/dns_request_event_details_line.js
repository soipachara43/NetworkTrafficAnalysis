"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DnsRequestEventDetailsLine = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var _helpers = require("../helpers");

var _process_draggable = require("../process_draggable");

var _user_host_working_dir = require("../user_host_working_dir");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DnsRequestEventDetailsLine = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      dnsQuestionName = _ref.dnsQuestionName,
      dnsQuestionType = _ref.dnsQuestionType,
      dnsResolvedIp = _ref.dnsResolvedIp,
      dnsResponseCode = _ref.dnsResponseCode,
      eventCode = _ref.eventCode,
      hostName = _ref.hostName,
      id = _ref.id,
      processExecutable = _ref.processExecutable,
      processName = _ref.processName,
      processPid = _ref.processPid,
      userDomain = _ref.userDomain,
      userName = _ref.userName,
      winlogEventId = _ref.winlogEventId;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, _react.default.createElement(_user_host_working_dir.UserHostWorkingDir, {
    contextId: contextId,
    eventId: id,
    hostName: hostName,
    userDomain: userDomain,
    userName: userName,
    workingDirectory: undefined
  }), !(0, _helpers.isNillEmptyOrNotFinite)(dnsQuestionName) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "asked-for",
    grow: false
  }, i18n.ASKED_FOR), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "dns.question.name",
    value: dnsQuestionName
  }))), !(0, _helpers.isNillEmptyOrNotFinite)(dnsQuestionType) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "with-question-type",
    grow: false
  }, i18n.WITH_QUESTION_TYPE), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "dns.question.type",
    value: dnsQuestionType
  }))), !(0, _helpers.isNillEmptyOrNotFinite)(dnsResolvedIp) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "which-resolved-to",
    grow: false
  }, i18n.WHICH_RESOLVED_TO), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "dns.resolved_ip",
    value: dnsResolvedIp
  }))), !(0, _helpers.isNillEmptyOrNotFinite)(dnsResponseCode) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, '('), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "response-code",
    grow: false
  }, i18n.RESPONSE_CODE), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "dns.response_code",
    value: dnsResponseCode
  })), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, ')')), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, i18n.VIA), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_process_draggable.ProcessDraggableWithNonExistentProcess, {
    contextId: contextId,
    endgamePid: undefined,
    endgameProcessName: undefined,
    eventId: id,
    processPid: processPid,
    processName: processName,
    processExecutable: processExecutable
  })), (!(0, _helpers.isNillEmptyOrNotFinite)(eventCode) || !(0, _helpers.isNillEmptyOrNotFinite)(winlogEventId)) && _react.default.createElement(_react.default.Fragment, null, !(0, _helpers.isNillEmptyOrNotFinite)(eventCode) ? _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "event.code",
    value: eventCode
  })) : _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    iconType: "logoWindows",
    field: "winlog.event_id",
    value: winlogEventId
  })))));
});

exports.DnsRequestEventDetailsLine = DnsRequestEventDetailsLine;
DnsRequestEventDetailsLine.displayName = 'DnsRequestEventDetailsLine';