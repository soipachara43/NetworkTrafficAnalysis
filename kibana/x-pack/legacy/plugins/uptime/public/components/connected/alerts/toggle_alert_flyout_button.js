"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleAlertFlyoutButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _functional = require("../../functional");

var _actions = require("../../../state/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ToggleAlertFlyoutButton = function ToggleAlertFlyoutButton() {
  var dispatch = (0, _reactRedux.useDispatch)();
  return _react.default.createElement(_functional.ToggleAlertFlyoutButtonComponent, {
    setAlertFlyoutVisible: function setAlertFlyoutVisible(value) {
      return dispatch((0, _actions.setAlertFlyoutVisible)(value));
    }
  });
};

exports.ToggleAlertFlyoutButton = ToggleAlertFlyoutButton;