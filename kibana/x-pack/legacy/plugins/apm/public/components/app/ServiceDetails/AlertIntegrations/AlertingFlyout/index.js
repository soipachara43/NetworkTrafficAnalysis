"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertingFlyout = AlertingFlyout;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../../../plugins/triggers_actions_ui/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function AlertingFlyout(props) {
  var addFlyoutVisible = props.addFlyoutVisible,
      setAddFlyoutVisibility = props.setAddFlyoutVisibility,
      alertType = props.alertType;
  return alertType ? _react.default.createElement(_public.AlertAdd, {
    addFlyoutVisible: addFlyoutVisible,
    setAddFlyoutVisibility: setAddFlyoutVisibility,
    consumer: "apm",
    alertTypeId: alertType,
    canChangeTrigger: false
  }) : null;
}