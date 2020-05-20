"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Title = function Title() {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink', {
    defaultMessage: 'Custom Links'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIconTip, {
    type: "iInCircle",
    position: "top",
    content: _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.info', {
      defaultMessage: 'These links will be shown in the Actions context menu for transactions.'
    })
  }))))));
};

exports.Title = Title;