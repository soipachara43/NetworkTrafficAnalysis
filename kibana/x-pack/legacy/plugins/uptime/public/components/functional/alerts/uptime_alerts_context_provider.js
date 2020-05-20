"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeAlertsContextProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../plugins/triggers_actions_ui/public");

var _public2 = require("../../../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UptimeAlertsContextProvider = function UptimeAlertsContextProvider(_ref) {
  var children = _ref.children;

  var _useKibana = (0, _public2.useKibana)(),
      _useKibana$services = _useKibana.services,
      fieldFormats = _useKibana$services.data.fieldFormats,
      http = _useKibana$services.http,
      charts = _useKibana$services.charts,
      notifications = _useKibana$services.notifications,
      _useKibana$services$t = _useKibana$services.triggers_actions_ui,
      actionTypeRegistry = _useKibana$services$t.actionTypeRegistry,
      alertTypeRegistry = _useKibana$services$t.alertTypeRegistry,
      uiSettings = _useKibana$services.uiSettings,
      docLinks = _useKibana$services.docLinks;

  return _react.default.createElement(_public.AlertsContextProvider, {
    value: {
      actionTypeRegistry: actionTypeRegistry,
      alertTypeRegistry: alertTypeRegistry,
      charts: charts,
      docLinks: docLinks,
      dataFieldsFormats: fieldFormats,
      http: http,
      toastNotifications: notifications === null || notifications === void 0 ? void 0 : notifications.toasts,
      uiSettings: uiSettings
    }
  }, children);
};

exports.UptimeAlertsContextProvider = UptimeAlertsContextProvider;