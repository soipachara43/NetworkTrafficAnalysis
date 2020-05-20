"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkIcon = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Link = (0, _styledComponents.default)(function (_ref) {
  var iconSide = _ref.iconSide,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["iconSide", "children"]);

  return _react.default.createElement(_eui.EuiLink, rest, children);
}).withConfig({
  displayName: "Link",
  componentId: "sc-1bmsy2l-0"
})(["", ""], function (_ref2) {
  var iconSide = _ref2.iconSide,
      theme = _ref2.theme;
  return (0, _styledComponents.css)(["align-items:center;display:inline-flex;vertical-align:top;white-space:nowrap;", " ", ""], iconSide === 'left' && (0, _styledComponents.css)([".euiIcon{margin-right:", ";}"], theme.eui.euiSizeXS), iconSide === 'right' && (0, _styledComponents.css)(["flex-direction:row-reverse;.euiIcon{margin-left:", ";}"], theme.eui.euiSizeXS));
});
Link.displayName = 'Link';

var LinkIcon = _react.default.memo(function (_ref3) {
  var children = _ref3.children,
      color = _ref3.color,
      disabled = _ref3.disabled,
      href = _ref3.href,
      _ref3$iconSide = _ref3.iconSide,
      iconSide = _ref3$iconSide === void 0 ? 'left' : _ref3$iconSide,
      _ref3$iconSize = _ref3.iconSize,
      iconSize = _ref3$iconSize === void 0 ? 's' : _ref3$iconSize,
      iconType = _ref3.iconType,
      onClick = _ref3.onClick,
      ariaLabel = _ref3.ariaLabel;
  return _react.default.createElement(Link, {
    className: "siemLinkIcon",
    color: color,
    disabled: disabled,
    href: href,
    iconSide: iconSide,
    onClick: onClick,
    "aria-label": ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : children
  }, _react.default.createElement(_eui.EuiIcon, {
    size: iconSize,
    type: iconType
  }), _react.default.createElement("span", {
    className: "siemLinkIcon__label"
  }, children));
});

exports.LinkIcon = LinkIcon;
LinkIcon.displayName = 'LinkIcon';