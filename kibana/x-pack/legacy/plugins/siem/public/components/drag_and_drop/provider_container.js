"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _helpers = require("../timeline/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ProviderContainerComponent = _styledComponents.default.div.withConfig({
  displayName: "ProviderContainerComponent",
  componentId: "sc-1geoc-0"
})(["&,&::before,&::after{transition:background ", " ease,color ", " ease;}", " ", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiAnimSpeedFast;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiAnimSpeedFast;
}, function (_ref3) {
  var isDragging = _ref3.isDragging;
  return !isDragging && (0, _styledComponents.css)(["&{border-radius:2px;padding:0 4px 0 8px;position:relative;z-index:", " !important;&::before{background-image:linear-gradient( 135deg,", " 25%,transparent 25% ),linear-gradient( -135deg,", " 25%,transparent 25% ),linear-gradient( 135deg,transparent 75%,", " 75% ),linear-gradient( -135deg,transparent 75%,", " 75% );background-position:0 0,1px 0,1px -1px,0px 1px;background-size:2px 2px;bottom:2px;content:'';display:block;left:2px;position:absolute;top:2px;width:4px;}}&:hover{&,& .euiBadge,& .euiBadge__text{cursor:move;cursor:grab;}}.", ":hover &,tr:hover &{background-color:", ";&::before{background-image:linear-gradient( 135deg,", " 25%,transparent 25% ),linear-gradient( -135deg,", " 25%,transparent 25% ),linear-gradient( 135deg,transparent 75%,", " 75% ),linear-gradient( -135deg,transparent 75%,", " 75% );}}&:hover,&:focus,.", ":hover &:hover,.", ":focus &:focus,tr:hover &:hover,tr:hover &:focus{background-color:", ";&,& a,& a:hover{color:", ";}&::before{background-image:linear-gradient( 135deg,", " 25%,transparent 25% ),linear-gradient( -135deg,", " 25%,transparent 25% ),linear-gradient( 135deg,transparent 75%,", " 75% ),linear-gradient( -135deg,transparent 75%,", " 75% );}}"], function (_ref4) {
    var theme = _ref4.theme;
    return theme.eui.euiZLevel0;
  }, function (_ref5) {
    var theme = _ref5.theme;
    return theme.eui.euiColorMediumShade;
  }, function (_ref6) {
    var theme = _ref6.theme;
    return theme.eui.euiColorMediumShade;
  }, function (_ref7) {
    var theme = _ref7.theme;
    return theme.eui.euiColorMediumShade;
  }, function (_ref8) {
    var theme = _ref8.theme;
    return theme.eui.euiColorMediumShade;
  }, _helpers.STATEFUL_EVENT_CSS_CLASS_NAME, function (_ref9) {
    var theme = _ref9.theme;
    return theme.eui.euiColorLightShade;
  }, function (_ref10) {
    var theme = _ref10.theme;
    return theme.eui.euiColorDarkShade;
  }, function (_ref11) {
    var theme = _ref11.theme;
    return theme.eui.euiColorDarkShade;
  }, function (_ref12) {
    var theme = _ref12.theme;
    return theme.eui.euiColorDarkShade;
  }, function (_ref13) {
    var theme = _ref13.theme;
    return theme.eui.euiColorDarkShade;
  }, _helpers.STATEFUL_EVENT_CSS_CLASS_NAME, _helpers.STATEFUL_EVENT_CSS_CLASS_NAME, function (_ref14) {
    var theme = _ref14.theme;
    return theme.eui.euiColorPrimary;
  }, function (_ref15) {
    var theme = _ref15.theme;
    return theme.eui.euiColorEmptyShade;
  }, function (_ref16) {
    var theme = _ref16.theme;
    return theme.eui.euiColorEmptyShade;
  }, function (_ref17) {
    var theme = _ref17.theme;
    return theme.eui.euiColorEmptyShade;
  }, function (_ref18) {
    var theme = _ref18.theme;
    return theme.eui.euiColorEmptyShade;
  }, function (_ref19) {
    var theme = _ref19.theme;
    return theme.eui.euiColorEmptyShade;
  });
}, function (_ref20) {
  var isDragging = _ref20.isDragging;
  return isDragging && (0, _styledComponents.css)(["&{z-index:9999 !important;}"]);
});

ProviderContainerComponent.displayName = 'ProviderContainerComponent';

var ProviderContainer = _react.default.memo(ProviderContainerComponent);

exports.ProviderContainer = ProviderContainer;
ProviderContainer.displayName = 'ProviderContainer';