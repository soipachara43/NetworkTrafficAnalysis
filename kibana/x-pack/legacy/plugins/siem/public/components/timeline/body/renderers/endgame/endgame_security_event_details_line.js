"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndgameSecurityEventDetailsLine = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../../draggables");

var _helpers = require("../helpers");

var _process_draggable = require("../process_draggable");

var _user_host_working_dir = require("../user_host_working_dir");

var _helpers2 = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EndgameSecurityEventDetailsLine = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      endgameLogonType = _ref.endgameLogonType,
      endgameSubjectDomainName = _ref.endgameSubjectDomainName,
      endgameSubjectLogonId = _ref.endgameSubjectLogonId,
      endgameSubjectUserName = _ref.endgameSubjectUserName,
      endgameTargetDomainName = _ref.endgameTargetDomainName,
      endgameTargetLogonId = _ref.endgameTargetLogonId,
      endgameTargetUserName = _ref.endgameTargetUserName,
      eventAction = _ref.eventAction,
      eventCode = _ref.eventCode,
      hostName = _ref.hostName,
      id = _ref.id,
      processExecutable = _ref.processExecutable,
      processName = _ref.processName,
      processPid = _ref.processPid,
      userDomain = _ref.userDomain,
      userName = _ref.userName,
      winlogEventId = _ref.winlogEventId;
  var domain = (0, _helpers2.getTargetUserAndTargetDomain)(eventAction) ? endgameTargetDomainName : userDomain;
  var eventDetails = (0, _helpers2.getEventDetails)(eventAction);
  var hostNameSeparator = (0, _helpers2.getHostNameSeparator)(eventAction);
  var user = (0, _helpers2.getTargetUserAndTargetDomain)(eventAction) ? endgameTargetUserName : userName;
  var userDomainField = (0, _helpers2.getUserDomainField)(eventAction);
  var userNameField = (0, _helpers2.getUserNameField)(eventAction);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, eventAction === 'admin_logon' && _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "with-special-privileges",
    grow: false
  }, i18n.WITH_SPECIAL_PRIVILEGES), eventAction === 'explicit_user_logon' && _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "a-login-was-attempted",
    grow: false
  }, i18n.A_LOGIN_WAS_ATTEMPTED_USING_EXPLICIT_CREDENTIALS), _react.default.createElement(_user_host_working_dir.UserHostWorkingDir, {
    contextId: contextId,
    eventId: id,
    hostName: hostName,
    hostNameSeparator: hostNameSeparator,
    userDomain: domain,
    userDomainField: userDomainField,
    userName: user,
    userNameField: userNameField,
    workingDirectory: undefined
  }), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "event-details",
    grow: false
  }, eventDetails), !(0, _helpers.isNillEmptyOrNotFinite)(endgameLogonType) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "using-logon-type",
    grow: false
  }, i18n.USING_LOGON_TYPE), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "endgame.logon_type",
    queryValue: String(endgameLogonType),
    value: "".concat(endgameLogonType, " - ").concat((0, _helpers2.getHumanReadableLogonType)(endgameLogonType))
  }))), !(0, _helpers.isNillEmptyOrNotFinite)(endgameTargetLogonId) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, '('), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "using-logon-type",
    grow: false
  }, i18n.TARGET_LOGON_ID), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "endgame.target_logon_id",
    value: endgameTargetLogonId
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
  })), !(0, _helpers.isNillEmptyOrNotFinite)(endgameSubjectUserName) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "as-requested-by-subject",
    grow: false
  }, i18n.AS_REQUESTED_BY_SUBJECT), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "endgame.subject_user_name",
    iconType: "user",
    value: endgameSubjectUserName
  }))), endgameSubjectDomainName != null && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "subject-domain-name-domain-separator-text",
    grow: false
  }, '\\'), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "endgame.subject_domain_name",
    value: endgameSubjectDomainName
  }))), !(0, _helpers.isNillEmptyOrNotFinite)(endgameSubjectLogonId) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, '('), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    "data-test-subj": "subject-login-id",
    grow: false
  }, i18n.SUBJECT_LOGON_ID), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: id,
    field: "endgame.subject_logon_id",
    value: endgameSubjectLogonId
  })), _react.default.createElement(_helpers.TokensFlexItem, {
    component: "span",
    grow: false
  }, ')')), (!(0, _helpers.isNillEmptyOrNotFinite)(eventCode) || !(0, _helpers.isNillEmptyOrNotFinite)(winlogEventId)) && _react.default.createElement(_react.default.Fragment, null, !(0, _helpers.isNillEmptyOrNotFinite)(eventCode) ? _react.default.createElement(_helpers.TokensFlexItem, {
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

exports.EndgameSecurityEventDetailsLine = EndgameSecurityEventDetailsLine;
EndgameSecurityEventDetailsLine.displayName = 'EndgameSecurityEventDetailsLine';