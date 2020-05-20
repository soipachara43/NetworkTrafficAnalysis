"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summary = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _variables = require("../../../../public/style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: Light/Dark theme (@see https://github.com/elastic/kibana/issues/44840)
var theme = _eui_theme_light.default;
var Item = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "Item",
  componentId: "sc-11nr6pd-0"
})(["flex-wrap:nowrap;border-right:1px solid ", ";padding-right:", ";flex-flow:row nowrap;line-height:1.5;align-items:center !important;&:last-child{border-right:none;padding-right:0;}"], theme.euiColorLightShade, (0, _variables.px)(_variables.units.half));

var Summary = function Summary(_ref) {
  var items = _ref.items;
  var filteredItems = items.filter(Boolean);
  return _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "s"
  }, filteredItems.map(function (item, index) {
    return _react.default.createElement(Item, {
      key: index,
      grow: false
    }, item);
  }));
};

exports.Summary = Summary;