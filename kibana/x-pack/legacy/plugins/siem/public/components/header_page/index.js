"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _link_icon = require("../link_icon");

var _subtitle = require("../subtitle");

var _title = require("./title");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Header = _styledComponents.default.header.attrs({
  className: 'siemHeaderPage'
}).withConfig({
  displayName: "Header",
  componentId: "woq8y5-0"
})(["", ""], function (_ref) {
  var border = _ref.border,
      theme = _ref.theme;
  return (0, _styledComponents.css)(["margin-bottom:", ";", ""], theme.eui.euiSizeL, border && (0, _styledComponents.css)(["border-bottom:", ";padding-bottom:", ";.euiProgress{top:", ";}"], theme.eui.euiBorderThin, theme.eui.paddingSizes.l, theme.eui.paddingSizes.l));
});

Header.displayName = 'Header';
var FlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "FlexItem",
  componentId: "woq8y5-1"
})(["display:block;"]);
FlexItem.displayName = 'FlexItem';

var LinkBack = _styledComponents.default.div.attrs({
  className: 'siemHeaderPage__linkBack'
}).withConfig({
  displayName: "LinkBack",
  componentId: "woq8y5-2"
})(["", ""], function (_ref2) {
  var theme = _ref2.theme;
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";margin-bottom:", ";"], theme.eui.euiFontSizeXS, theme.eui.euiLineHeight, theme.eui.euiSizeS);
});

LinkBack.displayName = 'LinkBack';
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "woq8y5-3"
})(["letter-spacing:0;"]);
Badge.displayName = 'Badge';

var HeaderPageComponent = function HeaderPageComponent(_ref3) {
  var backOptions = _ref3.backOptions,
      badgeOptions = _ref3.badgeOptions,
      border = _ref3.border,
      children = _ref3.children,
      draggableArguments = _ref3.draggableArguments,
      isLoading = _ref3.isLoading,
      subtitle = _ref3.subtitle,
      subtitle2 = _ref3.subtitle2,
      title = _ref3.title,
      titleNode = _ref3.titleNode,
      rest = _objectWithoutProperties(_ref3, ["backOptions", "badgeOptions", "border", "children", "draggableArguments", "isLoading", "subtitle", "subtitle2", "title", "titleNode"]);

  return _react.default.createElement(Header, _extends({
    border: border
  }, rest), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(FlexItem, null, backOptions && _react.default.createElement(LinkBack, null, _react.default.createElement(_link_icon.LinkIcon, {
    href: backOptions.href,
    iconType: "arrowLeft"
  }, backOptions.text)), titleNode || _react.default.createElement(_title.Title, {
    draggableArguments: draggableArguments,
    title: title,
    badgeOptions: badgeOptions
  }), subtitle && _react.default.createElement(_subtitle.Subtitle, {
    "data-test-subj": "header-page-subtitle",
    items: subtitle
  }), subtitle2 && _react.default.createElement(_subtitle.Subtitle, {
    "data-test-subj": "header-page-subtitle-2",
    items: subtitle2
  }), border && isLoading && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent"
  })), children && _react.default.createElement(FlexItem, {
    "data-test-subj": "header-page-supplements",
    grow: false
  }, children)));
};

var HeaderPage = _react.default.memo(HeaderPageComponent);

exports.HeaderPage = HeaderPage;