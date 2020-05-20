"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeAlertsFlyoutWrapperComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../plugins/triggers_actions_ui/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UptimeAlertsFlyoutWrapperComponent = function UptimeAlertsFlyoutWrapperComponent(_ref) {
  var alertFlyoutVisible = _ref.alertFlyoutVisible,
      alertTypeId = _ref.alertTypeId,
      canChangeTrigger = _ref.canChangeTrigger,
      setAlertFlyoutVisibility = _ref.setAlertFlyoutVisibility;
  return _react.default.createElement(_public.AlertAdd, {
    addFlyoutVisible: alertFlyoutVisible,
    consumer: "uptime",
    setAddFlyoutVisibility: setAlertFlyoutVisibility,
    alertTypeId: alertTypeId,
    canChangeTrigger: canChangeTrigger
  });
};

exports.UptimeAlertsFlyoutWrapperComponent = UptimeAlertsFlyoutWrapperComponent;