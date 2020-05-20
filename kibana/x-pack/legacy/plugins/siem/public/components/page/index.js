"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewWrapper = exports.MoreRowItems = exports.Badge = exports.Spacer = exports.CountBadge = exports.Pane1FlexContent = exports.PaneHeader = exports.Pane = exports.PaneScrollContainer = exports.FooterContainer = exports.PageHeader = exports.FlexPage = exports.PageContent = exports.PageContainer = exports.DescriptionListStyled = exports.AppGlobalStyle = void 0;

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* dirty hack to fix draggables with tooltip on FF */\n  body#siem-app {\n    position: static;\n  }\n  /* end of dirty hack to fix draggables with tooltip on FF */\n  \n  div.app-wrapper {\n    background-color: rgba(0,0,0,0);\n  }\n\n  div.application {\n    background-color: rgba(0,0,0,0);\n  }\n\n  .euiPopover__panel.euiPopover__panel-isOpen {\n    z-index: 9900 !important;\n  }\n  .euiToolTip {\n    z-index: 9950 !important;\n  }\n\n  /* \n    overrides the default styling of euiComboBoxOptionsList because it's implemented\n    as a popover, so it's not selectable as a child of the styled component\n  */\n  .euiComboBoxOptionsList {\n    z-index: 9999;\n  }\n\n  /* overrides default styling in angular code that was not theme-friendly */\n  .euiPanel-loading-hide-border {\n    border: none;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
  SIDE EFFECT: the following `createGlobalStyle` overrides default styling in angular code that was not theme-friendly
  and `EuiPopover`, `EuiToolTip` global styles
*/
var AppGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject());
exports.AppGlobalStyle = AppGlobalStyle;
var DescriptionListStyled = (0, _styledComponents.default)(_eui.EuiDescriptionList).withConfig({
  displayName: "DescriptionListStyled",
  componentId: "sc-2s1ed3-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return "\n    dt {\n      font-size: ".concat(theme.eui.euiFontSizeXS, " !important;\n    }\n    dd {\n      width: fit-content;\n    }\n    dd > div {\n      width: fit-content;\n    }\n  ");
});
exports.DescriptionListStyled = DescriptionListStyled;
DescriptionListStyled.displayName = 'DescriptionListStyled';

var PageContainer = _styledComponents.default.div.withConfig({
  displayName: "PageContainer",
  componentId: "sc-2s1ed3-1"
})(["display:flex;flex-direction:column;align-items:stretch;background-color:", ";height:100%;padding:1rem;overflow:hidden;margin:0px;"], function (props) {
  return props.theme.eui.euiColorEmptyShade;
});

exports.PageContainer = PageContainer;
PageContainer.displayName = 'PageContainer';

var PageContent = _styledComponents.default.div.withConfig({
  displayName: "PageContent",
  componentId: "sc-2s1ed3-2"
})(["flex:1 1 auto;height:100%;position:relative;overflow-y:hidden;background-color:", ";margin-top:62px;"], function (props) {
  return props.theme.eui.euiColorEmptyShade;
});

exports.PageContent = PageContent;
PageContent.displayName = 'PageContent';
var FlexPage = (0, _styledComponents.default)(_eui.EuiPage).withConfig({
  displayName: "FlexPage",
  componentId: "sc-2s1ed3-3"
})(["flex:1 0 0;"]);
exports.FlexPage = FlexPage;
FlexPage.displayName = 'FlexPage';

var PageHeader = _styledComponents.default.div.withConfig({
  displayName: "PageHeader",
  componentId: "sc-2s1ed3-4"
})(["background-color:", ";display:flex;user-select:none;padding:1rem 1rem 0rem 1rem;width:100vw;position:fixed;"], function (props) {
  return props.theme.eui.euiColorEmptyShade;
});

exports.PageHeader = PageHeader;
PageHeader.displayName = 'PageHeader';

var FooterContainer = _styledComponents.default.div.withConfig({
  displayName: "FooterContainer",
  componentId: "sc-2s1ed3-5"
})(["flex:0;bottom:0;color:#666;left:0;position:fixed;text-align:left;user-select:none;width:100%;background-color:#f5f7fa;padding:16px;border-top:1px solid #d3dae6;"]);

exports.FooterContainer = FooterContainer;
FooterContainer.displayName = 'FooterContainer';

var PaneScrollContainer = _styledComponents.default.div.withConfig({
  displayName: "PaneScrollContainer",
  componentId: "sc-2s1ed3-6"
})(["height:100%;overflow-y:scroll;> div:last-child{margin-bottom:3rem;}"]);

exports.PaneScrollContainer = PaneScrollContainer;
PaneScrollContainer.displayName = 'PaneScrollContainer';

var Pane = _styledComponents.default.div.withConfig({
  displayName: "Pane",
  componentId: "sc-2s1ed3-7"
})(["height:100%;overflow:hidden;user-select:none;"]);

exports.Pane = Pane;
Pane.displayName = 'Pane';

var PaneHeader = _styledComponents.default.div.withConfig({
  displayName: "PaneHeader",
  componentId: "sc-2s1ed3-8"
})(["display:flex;"]);

exports.PaneHeader = PaneHeader;
PaneHeader.displayName = 'PaneHeader';

var Pane1FlexContent = _styledComponents.default.div.withConfig({
  displayName: "Pane1FlexContent",
  componentId: "sc-2s1ed3-9"
})(["display:flex;flex-direction:row;flex-wrap:wrap;height:100%;"]);

exports.Pane1FlexContent = Pane1FlexContent;
Pane1FlexContent.displayName = 'Pane1FlexContent';
var CountBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "CountBadge",
  componentId: "sc-2s1ed3-10"
})(["margin-left:5px;"]);
exports.CountBadge = CountBadge;
CountBadge.displayName = 'CountBadge';

var Spacer = _styledComponents.default.span.withConfig({
  displayName: "Spacer",
  componentId: "sc-2s1ed3-11"
})(["margin-left:5px;"]);

exports.Spacer = Spacer;
Spacer.displayName = 'Spacer';
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "sc-2s1ed3-12"
})(["vertical-align:top;"]);
exports.Badge = Badge;
Badge.displayName = 'Badge';
var MoreRowItems = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "MoreRowItems",
  componentId: "sc-2s1ed3-13"
})(["margin-left:5px;"]);
exports.MoreRowItems = MoreRowItems;
MoreRowItems.displayName = 'MoreRowItems';
var OverviewWrapper = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "OverviewWrapper",
  componentId: "sc-2s1ed3-14"
})(["position:relative;.euiButtonIcon{position:absolute;right:", ";top:6px;z-index:2;}"], function (props) {
  return props.theme.eui.euiSizeM;
});
exports.OverviewWrapper = OverviewWrapper;
OverviewWrapper.displayName = 'OverviewWrapper';