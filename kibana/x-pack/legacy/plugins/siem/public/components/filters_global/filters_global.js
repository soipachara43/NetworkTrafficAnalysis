"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiltersGlobal = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _reactSticky = require("react-sticky");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _helpers = require("../../lib/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var offsetChrome = 49;
var disableSticky = "screen and (max-width: ".concat(_eui_theme_light.default.euiBreakpoints.s, ")");
var disableStickyMq = window.matchMedia(disableSticky);

var Wrapper = _styledComponents.default.aside.withConfig({
  displayName: "Wrapper",
  componentId: "anvqrs-0"
})(["position:relative;z-index:", ";background:", ";border-bottom:", ";padding:", " ", " ", " ", ";", " @media only ", "{position:static !important;z-index:", " !important;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiZNavigation;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiColorEmptyShade;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiBorderThin;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.paddingSizes.m;
}, _helpers.gutterTimeline, function (_ref5) {
  var theme = _ref5.theme;
  return theme.eui.paddingSizes.m;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.paddingSizes.l;
}, function (_ref7) {
  var isSticky = _ref7.isSticky;
  return isSticky && (0, _styledComponents.css)(["top:", "px !important;"], offsetChrome);
}, disableSticky, function (_ref8) {
  var theme = _ref8.theme;
  return theme.eui.euiZContent;
});

Wrapper.displayName = 'Wrapper';

var FiltersGlobal = _react.default.memo(function (_ref9) {
  var children = _ref9.children;
  return _react.default.createElement(_reactSticky.Sticky, {
    disableCompensation: disableStickyMq.matches,
    topOffset: -offsetChrome
  }, function (_ref10) {
    var style = _ref10.style,
        isSticky = _ref10.isSticky;
    return _react.default.createElement(Wrapper, {
      className: "siemFiltersGlobal",
      isSticky: isSticky,
      style: style
    }, children);
  });
});

exports.FiltersGlobal = FiltersGlobal;
FiltersGlobal.displayName = 'FiltersGlobal';