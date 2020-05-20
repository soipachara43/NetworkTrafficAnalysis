"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeAlertsFlyoutWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _functional = require("../../functional");

var _actions = require("../../../state/actions");

var _selectors = require("../../../state/selectors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UptimeAlertsFlyoutWrapper = function UptimeAlertsFlyoutWrapper(_ref) {
  var alertTypeId = _ref.alertTypeId,
      canChangeTrigger = _ref.canChangeTrigger;
  var dispatch = (0, _reactRedux.useDispatch)();

  var setAddFlyoutVisiblity = function setAddFlyoutVisiblity(value) {
    return (// @ts-ignore the value here is a boolean, and it works with the action creator function
      dispatch((0, _actions.setAlertFlyoutVisible)(value))
    );
  };

  var alertFlyoutVisible = (0, _reactRedux.useSelector)(_selectors.selectAlertFlyoutVisibility);
  return _react.default.createElement(_functional.UptimeAlertsFlyoutWrapperComponent, {
    alertFlyoutVisible: alertFlyoutVisible,
    alertTypeId: alertTypeId,
    canChangeTrigger: canChangeTrigger,
    setAlertFlyoutVisibility: setAddFlyoutVisiblity
  });
};

exports.UptimeAlertsFlyoutWrapper = UptimeAlertsFlyoutWrapper;