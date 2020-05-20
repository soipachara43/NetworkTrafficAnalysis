"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRiskScoreBySeverity = exports.severityOptions = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var I18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StyledEuiHealth = (0, _styledComponents.default)(_eui.EuiHealth).withConfig({
  displayName: "StyledEuiHealth",
  componentId: "sc-6votpe-0"
})(["line-height:inherit;"]);
var severityOptions = [{
  value: 'low',
  inputDisplay: _react.default.createElement(StyledEuiHealth, {
    color: _eui_theme_light.default.euiColorVis0
  }, I18n.LOW)
}, {
  value: 'medium',
  inputDisplay: _react.default.createElement(StyledEuiHealth, {
    color: _eui_theme_light.default.euiColorVis5
  }, I18n.MEDIUM)
}, {
  value: 'high',
  inputDisplay: _react.default.createElement(StyledEuiHealth, {
    color: _eui_theme_light.default.euiColorVis7
  }, I18n.HIGH)
}, {
  value: 'critical',
  inputDisplay: _react.default.createElement(StyledEuiHealth, {
    color: _eui_theme_light.default.euiColorVis9
  }, I18n.CRITICAL)
}];
exports.severityOptions = severityOptions;
var defaultRiskScoreBySeverity = {
  low: 21,
  medium: 47,
  high: 73,
  critical: 99
};
exports.defaultRiskScoreBySeverity = defaultRiskScoreBySeverity;