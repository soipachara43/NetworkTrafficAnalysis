"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarAction = exports.BarText = exports.BarGroup = exports.BarSection = exports.Bar = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Bar = _styledComponents.default.aside.attrs({
  className: 'siemUtilityBar'
}).withConfig({
  displayName: "Bar",
  componentId: "gg24im-0"
})(["", ""], function (_ref) {
  var border = _ref.border,
      theme = _ref.theme;
  return (0, _styledComponents.css)(["", " @media only screen and (min-width:", "){display:flex;justify-content:space-between;}"], border && (0, _styledComponents.css)(["border-bottom:", ";padding-bottom:", ";"], theme.eui.euiBorderThin, theme.eui.paddingSizes.s), theme.eui.euiBreakpoints.l);
});

exports.Bar = Bar;
Bar.displayName = 'Bar';

var BarSection = _styledComponents.default.div.attrs({
  className: 'siemUtilityBar__section'
}).withConfig({
  displayName: "BarSection",
  componentId: "gg24im-1"
})(["", ""], function (_ref2) {
  var theme = _ref2.theme;
  return (0, _styledComponents.css)(["& + &{margin-top:", ";}@media only screen and (min-width:", "){display:flex;flex-wrap:wrap;}@media only screen and (min-width:", "){& + &{margin-top:0;margin-left:", ";}}"], theme.eui.euiSizeS, theme.eui.euiBreakpoints.m, theme.eui.euiBreakpoints.l, theme.eui.euiSize);
});

exports.BarSection = BarSection;
BarSection.displayName = 'BarSection';

var BarGroup = _styledComponents.default.div.attrs({
  className: 'siemUtilityBar__group'
}).withConfig({
  displayName: "BarGroup",
  componentId: "gg24im-2"
})(["", ""], function (_ref3) {
  var theme = _ref3.theme;
  return (0, _styledComponents.css)(["align-items:flex-start;display:flex;flex-wrap:wrap;& + &{margin-top:", ";}@media only screen and (min-width:", "){border-right:", ";flex-wrap:nowrap;margin-right:", ";padding-right:", ";& + &{margin-top:0;}&:last-child{border-right:none;margin-right:0;padding-right:0;}}& > *{margin-right:", ";&:last-child{margin-right:0;}}"], theme.eui.euiSizeS, theme.eui.euiBreakpoints.m, theme.eui.euiBorderThin, theme.eui.paddingSizes.m, theme.eui.paddingSizes.m, theme.eui.euiSize);
});

exports.BarGroup = BarGroup;
BarGroup.displayName = 'BarGroup';

var BarText = _styledComponents.default.p.attrs({
  className: 'siemUtilityBar__text'
}).withConfig({
  displayName: "BarText",
  componentId: "gg24im-3"
})(["", ""], function (_ref4) {
  var theme = _ref4.theme;
  return (0, _styledComponents.css)(["color:", ";font-size:", ";line-height:", ";white-space:nowrap;"], theme.eui.textColors.subdued, theme.eui.euiFontSizeXS, theme.eui.euiLineHeight);
});

exports.BarText = BarText;
BarText.displayName = 'BarText';

var BarAction = _styledComponents.default.div.attrs({
  className: 'siemUtilityBar__action'
}).withConfig({
  displayName: "BarAction",
  componentId: "gg24im-4"
})(["", ""], function (_ref5) {
  var theme = _ref5.theme;
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], theme.eui.euiFontSizeXS, theme.eui.euiLineHeight);
});

exports.BarAction = BarAction;
BarAction.displayName = 'BarAction';