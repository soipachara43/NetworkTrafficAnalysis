"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tray = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ComponentStrings.ToolbarTray;

var Tray = function Tray(_ref) {
  var children = _ref.children,
      done = _ref.done;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "canvasTray__toggle",
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    size: "s",
    onClick: done,
    "aria-label": strings.getCloseTrayAriaLabel(),
    iconType: "arrowDown"
  }))), _react.default.createElement("div", {
    className: "canvasTray"
  }, children));
};

exports.Tray = Tray;
Tray.propTypes = {
  children: _propTypes.default.node,
  done: _propTypes.default.func
};