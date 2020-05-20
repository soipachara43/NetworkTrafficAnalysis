"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentMarker = void 0;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../style/variables");

var _formatters = require("../../../../../utils/formatters");

var _Legend = require("../../Legend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NameContainer = _styledComponents.default.div.withConfig({
  displayName: "NameContainer",
  componentId: "sc-15edmj9-0"
})(["border-bottom:1px solid ", ";padding-bottom:", ";"], _eui_theme_light.default.euiColorMediumShade, (0, _variables.px)(_variables.units.half));

var TimeContainer = _styledComponents.default.div.withConfig({
  displayName: "TimeContainer",
  componentId: "sc-15edmj9-1"
})(["color:", ";padding-top:", ";"], _eui_theme_light.default.euiColorMediumShade, (0, _variables.px)(_variables.units.half));

var AgentMarker = function AgentMarker(_ref) {
  var mark = _ref.mark;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiToolTip, {
    id: mark.id,
    position: "top",
    content: _react.default.createElement("div", null, _react.default.createElement(NameContainer, null, mark.id), _react.default.createElement(TimeContainer, null, (0, _formatters.asDuration)(mark.offset)))
  }, _react.default.createElement(_Legend.Legend, {
    clickable: true,
    color: _eui_theme_light.default.euiColorMediumShade
  })));
};

exports.AgentMarker = AgentMarker;