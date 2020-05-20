"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _tool_tip_shortcut = require("../../tool_tip_shortcut");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ComponentStrings.WorkpadHeaderRefreshControlSettings;

var RefreshControl = function RefreshControl(_ref) {
  var doRefresh = _ref.doRefresh,
      inFlight = _ref.inFlight;
  return _react.default.createElement(_eui.EuiToolTip, {
    position: "bottom",
    content: _react.default.createElement("span", null, strings.getRefreshTooltip(), _react.default.createElement(_tool_tip_shortcut.ToolTipShortcut, {
      namespace: "EDITOR",
      action: "REFRESH"
    }))
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    disabled: inFlight,
    iconType: "refresh",
    "aria-label": strings.getRefreshAriaLabel(),
    onClick: doRefresh
  }));
};

exports.RefreshControl = RefreshControl;
RefreshControl.propTypes = {
  doRefresh: _propTypes.default.func.isRequired,
  inFlight: _propTypes.default.bool
};