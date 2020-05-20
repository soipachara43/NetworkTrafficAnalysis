"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemRowRenderers = exports.createDnsRowRenderer = exports.createSecurityEventRowRenderer = exports.createSocketRowRenderer = exports.createGenericFileRowRenderer = exports.createFimRowRenderer = exports.createEndgameProcessRowRenderer = exports.createGenericSystemRowRenderer = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _dns_request_event_details = require("../dns/dns_request_event_details");

var _endgame_security_event_details = require("../endgame/endgame_security_event_details");

var _helpers = require("../helpers");

var _row_renderer = require("../row_renderer");

var _generic_details = require("./generic_details");

var _generic_file_details = require("./generic_file_details");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var createGenericSystemRowRenderer = function createGenericSystemRowRenderer(_ref) {
  var actionName = _ref.actionName,
      text = _ref.text;
  return {
    isInstance: function isInstance(ecs) {
      var module = (0, _fp.get)('event.module[0]', ecs);
      var action = (0, _fp.get)('event.action[0]', ecs);
      return module != null && module.toLowerCase() === 'system' && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref2) {
      var browserFields = _ref2.browserFields,
          data = _ref2.data,
          timelineId = _ref2.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_details.SystemGenericDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "".concat(actionName, "-").concat(timelineId),
        text: text,
        timelineId: timelineId
      }));
    }
  };
};

exports.createGenericSystemRowRenderer = createGenericSystemRowRenderer;

var createEndgameProcessRowRenderer = function createEndgameProcessRowRenderer(_ref3) {
  var actionName = _ref3.actionName,
      text = _ref3.text;
  return {
    isInstance: function isInstance(ecs) {
      var action = (0, _fp.get)('event.action[0]', ecs);
      var category = (0, _fp.get)('event.category[0]', ecs);
      return category != null && category.toLowerCase() === 'process' && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref4) {
      var browserFields = _ref4.browserFields,
          data = _ref4.data,
          timelineId = _ref4.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_file_details.SystemGenericFileDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "endgame-process-".concat(actionName, "-").concat(timelineId),
        showMessage: false,
        text: text,
        timelineId: timelineId
      }));
    }
  };
};

exports.createEndgameProcessRowRenderer = createEndgameProcessRowRenderer;

var createFimRowRenderer = function createFimRowRenderer(_ref5) {
  var actionName = _ref5.actionName,
      text = _ref5.text;
  return {
    isInstance: function isInstance(ecs) {
      var action = (0, _fp.get)('event.action[0]', ecs);
      var category = (0, _fp.get)('event.category[0]', ecs);
      var dataset = (0, _fp.get)('event.dataset[0]', ecs);
      return (0, _helpers.isFileEvent)({
        eventCategory: category,
        eventDataset: dataset
      }) && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref6) {
      var browserFields = _ref6.browserFields,
          data = _ref6.data,
          timelineId = _ref6.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_file_details.SystemGenericFileDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "fim-".concat(actionName, "-").concat(timelineId),
        showMessage: false,
        text: text,
        timelineId: timelineId
      }));
    }
  };
};

exports.createFimRowRenderer = createFimRowRenderer;

var createGenericFileRowRenderer = function createGenericFileRowRenderer(_ref7) {
  var actionName = _ref7.actionName,
      text = _ref7.text;
  return {
    isInstance: function isInstance(ecs) {
      var module = (0, _fp.get)('event.module[0]', ecs);
      var action = (0, _fp.get)('event.action[0]', ecs);
      return module != null && module.toLowerCase() === 'system' && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref8) {
      var browserFields = _ref8.browserFields,
          data = _ref8.data,
          timelineId = _ref8.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_file_details.SystemGenericFileDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "".concat(actionName, "-").concat(timelineId),
        text: text,
        timelineId: timelineId
      }));
    }
  };
};

exports.createGenericFileRowRenderer = createGenericFileRowRenderer;

var createSocketRowRenderer = function createSocketRowRenderer(_ref9) {
  var actionName = _ref9.actionName,
      text = _ref9.text;
  return {
    isInstance: function isInstance(ecs) {
      var action = (0, _fp.get)('event.action[0]', ecs);
      return action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref10) {
      var browserFields = _ref10.browserFields,
          data = _ref10.data,
          timelineId = _ref10.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_generic_file_details.SystemGenericFileDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "socket-".concat(actionName, "-").concat(timelineId),
        text: text,
        timelineId: timelineId
      }));
    }
  };
};

exports.createSocketRowRenderer = createSocketRowRenderer;

var createSecurityEventRowRenderer = function createSecurityEventRowRenderer(_ref11) {
  var actionName = _ref11.actionName;
  return {
    isInstance: function isInstance(ecs) {
      var category = (0, _fp.get)('event.category[0]', ecs);
      var action = (0, _fp.get)('event.action[0]', ecs);
      return category != null && category.toLowerCase() === 'authentication' && action != null && action.toLowerCase() === actionName;
    },
    renderRow: function renderRow(_ref12) {
      var browserFields = _ref12.browserFields,
          data = _ref12.data,
          timelineId = _ref12.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_endgame_security_event_details.EndgameSecurityEventDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "authentication-".concat(actionName, "-").concat(timelineId),
        timelineId: timelineId
      }));
    }
  };
};

exports.createSecurityEventRowRenderer = createSecurityEventRowRenderer;

var createDnsRowRenderer = function createDnsRowRenderer() {
  return {
    isInstance: function isInstance(ecs) {
      var dnsQuestionType = (0, _fp.get)('dns.question.type[0]', ecs);
      var dnsQuestionName = (0, _fp.get)('dns.question.name[0]', ecs);
      return !(0, _helpers.isNillEmptyOrNotFinite)(dnsQuestionType) && !(0, _helpers.isNillEmptyOrNotFinite)(dnsQuestionName);
    },
    renderRow: function renderRow(_ref13) {
      var browserFields = _ref13.browserFields,
          data = _ref13.data,
          timelineId = _ref13.timelineId;
      return _react.default.createElement(_row_renderer.RowRendererContainer, null, _react.default.createElement(_dns_request_event_details.DnsRequestEventDetails, {
        browserFields: browserFields,
        data: data,
        contextId: "dns-request-".concat(timelineId),
        timelineId: timelineId
      }));
    }
  };
};

exports.createDnsRowRenderer = createDnsRowRenderer;
var systemLoginRowRenderer = createGenericSystemRowRenderer({
  actionName: 'user_login',
  text: i18n.ATTEMPTED_LOGIN
});
var systemProcessStartedRowRenderer = createGenericFileRowRenderer({
  actionName: 'process_started',
  text: i18n.PROCESS_STARTED
});
var endgameProcessStartedRowRenderer = createEndgameProcessRowRenderer({
  actionName: 'creation_event',
  text: i18n.PROCESS_STARTED
});
var systemProcessStoppedRowRenderer = createGenericFileRowRenderer({
  actionName: 'process_stopped',
  text: i18n.PROCESS_STOPPED
});
var endgameProcessTerminationRowRenderer = createEndgameProcessRowRenderer({
  actionName: 'termination_event',
  text: i18n.TERMINATED_PROCESS
});
var endgameFileCreateEventRowRenderer = createFimRowRenderer({
  actionName: 'file_create_event',
  text: i18n.CREATED_FILE
});
var fimFileCreateEventRowRenderer = createFimRowRenderer({
  actionName: 'created',
  text: i18n.CREATED_FILE
});
var endgameFileDeleteEventRowRenderer = createFimRowRenderer({
  actionName: 'file_delete_event',
  text: i18n.DELETED_FILE
});
var fimFileDeletedEventRowRenderer = createFimRowRenderer({
  actionName: 'deleted',
  text: i18n.DELETED_FILE
});
var systemExistingRowRenderer = createGenericFileRowRenderer({
  actionName: 'existing_process',
  text: i18n.EXISTING_PROCESS
});
var systemSocketOpenedRowRenderer = createSocketRowRenderer({
  actionName: 'socket_opened',
  text: i18n.SOCKET_OPENED
});
var systemSocketClosedRowRenderer = createSocketRowRenderer({
  actionName: 'socket_closed',
  text: i18n.SOCKET_CLOSED
});
var endgameIpv4ConnectionAcceptEventRowRenderer = createSocketRowRenderer({
  actionName: 'ipv4_connection_accept_event',
  text: i18n.ACCEPTED_A_CONNECTION_VIA
});
var endgameIpv6ConnectionAcceptEventRowRenderer = createSocketRowRenderer({
  actionName: 'ipv6_connection_accept_event',
  text: i18n.ACCEPTED_A_CONNECTION_VIA
});
var endgameIpv4DisconnectReceivedEventRowRenderer = createSocketRowRenderer({
  actionName: 'ipv4_disconnect_received_event',
  text: i18n.DISCONNECTED_VIA
});
var endgameIpv6DisconnectReceivedEventRowRenderer = createSocketRowRenderer({
  actionName: 'ipv6_disconnect_received_event',
  text: i18n.DISCONNECTED_VIA
});
var endgameAdminLogonRowRenderer = createSecurityEventRowRenderer({
  actionName: 'admin_logon'
});
var endgameExplicitUserLogonRowRenderer = createSecurityEventRowRenderer({
  actionName: 'explicit_user_logon'
});
var endgameUserLogoffRowRenderer = createSecurityEventRowRenderer({
  actionName: 'user_logoff'
});
var endgameUserLogonRowRenderer = createSecurityEventRowRenderer({
  actionName: 'user_logon'
});
var dnsRowRenderer = createDnsRowRenderer();
var systemExistingUserRowRenderer = createGenericSystemRowRenderer({
  actionName: 'existing_user',
  text: i18n.EXISTING_USER
});
var systemExistingSocketRowRenderer = createGenericFileRowRenderer({
  actionName: 'existing_socket',
  text: i18n.EXISTING_SOCKET
});
var systemExistingPackageRowRenderer = createGenericSystemRowRenderer({
  actionName: 'existing_package',
  text: i18n.EXISTING_PACKAGE
});
var systemInvalidRowRenderer = createGenericFileRowRenderer({
  actionName: 'invalid',
  text: i18n.INVALID
});
var systemUserChangedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'user_changed',
  text: i18n.USER_CHANGED
});
var systemHostChangedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'host',
  text: i18n.HOST_CHANGED
});
var systemUserAddedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'user_added',
  text: i18n.USER_ADDED
});
var systemLogoutRowRenderer = createGenericSystemRowRenderer({
  actionName: 'user_logout',
  text: i18n.LOGGED_OUT
});
var systemProcessErrorRowRenderer = createGenericFileRowRenderer({
  actionName: 'process_error',
  text: i18n.PROCESS_ERROR
}); // TODO: Remove this once this has been replaced everywhere with "error" below

var systemErrorRowRendererDeprecated = createGenericSystemRowRenderer({
  actionName: 'error:',
  text: i18n.ERROR
});
var systemErrorRowRenderer = createGenericSystemRowRenderer({
  actionName: 'error',
  text: i18n.ERROR
});
var systemPackageInstalledRowRenderer = createGenericSystemRowRenderer({
  actionName: 'package_installed',
  text: i18n.PACKAGE_INSTALLED
});
var systemBootRowRenderer = createGenericSystemRowRenderer({
  actionName: 'boot',
  text: i18n.BOOT
});
var systemAcceptedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'accepted',
  text: i18n.ACCEPTED
});
var systemPackageUpdatedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'package_updated',
  text: i18n.PACKAGE_UPDATED
});
var systemPackageRemovedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'package_removed',
  text: i18n.PACKAGE_REMOVED
});
var systemUserRemovedRowRenderer = createGenericSystemRowRenderer({
  actionName: 'user_removed',
  text: i18n.USER_REMOVED
});
var systemRowRenderers = [dnsRowRenderer, endgameAdminLogonRowRenderer, endgameExplicitUserLogonRowRenderer, endgameFileCreateEventRowRenderer, endgameFileDeleteEventRowRenderer, endgameIpv4ConnectionAcceptEventRowRenderer, endgameIpv6ConnectionAcceptEventRowRenderer, endgameIpv4DisconnectReceivedEventRowRenderer, endgameIpv6DisconnectReceivedEventRowRenderer, endgameProcessStartedRowRenderer, endgameProcessTerminationRowRenderer, endgameUserLogoffRowRenderer, endgameUserLogonRowRenderer, fimFileCreateEventRowRenderer, fimFileDeletedEventRowRenderer, systemAcceptedRowRenderer, systemBootRowRenderer, systemErrorRowRenderer, systemErrorRowRendererDeprecated, systemExistingPackageRowRenderer, systemExistingRowRenderer, systemExistingSocketRowRenderer, systemExistingUserRowRenderer, systemHostChangedRowRenderer, systemInvalidRowRenderer, systemLoginRowRenderer, systemLogoutRowRenderer, systemPackageInstalledRowRenderer, systemPackageUpdatedRowRenderer, systemPackageRemovedRowRenderer, systemProcessErrorRowRenderer, systemProcessStartedRowRenderer, systemProcessStoppedRowRenderer, systemSocketClosedRowRenderer, systemSocketOpenedRowRenderer, systemUserAddedRowRenderer, systemUserChangedRowRenderer, systemUserRemovedRowRenderer];
exports.systemRowRenderers = systemRowRenderers;