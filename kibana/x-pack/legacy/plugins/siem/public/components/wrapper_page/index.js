"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperPage = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _helpers = require("../../lib/helpers");

var _index = require("../page/index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Wrapper",
  componentId: "sc-1taaeav-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["padding:", " ", " ", " ", ";&.siemWrapperPage--restrictWidthDefault,&.siemWrapperPage--restrictWidthCustom{box-sizing:content-box;margin:0 auto;}&.siemWrapperPage--restrictWidthDefault{max-width:1000px;}"], theme.eui.paddingSizes.l, _helpers.gutterTimeline, theme.eui.paddingSizes.l, theme.eui.paddingSizes.l);
});

Wrapper.displayName = 'Wrapper';

var WrapperPageComponent = function WrapperPageComponent(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      restrictWidth = _ref2.restrictWidth,
      style = _ref2.style;
  var classes = (0, _classnames.default)(className, {
    siemWrapperPage: true,
    'siemWrapperPage--restrictWidthDefault': restrictWidth && typeof restrictWidth === 'boolean' && restrictWidth === true,
    'siemWrapperPage--restrictWidthCustom': restrictWidth && typeof restrictWidth !== 'boolean'
  });
  var customStyle;

  if (restrictWidth && typeof restrictWidth !== 'boolean') {
    var value = typeof restrictWidth === 'number' ? "".concat(restrictWidth, "px") : restrictWidth;
    customStyle = _objectSpread({}, style, {
      maxWidth: value
    });
  }

  return _react.default.createElement(Wrapper, {
    className: classes,
    style: customStyle || style
  }, children, _react.default.createElement(_index.AppGlobalStyle, null));
};

var WrapperPage = _react.default.memo(WrapperPageComponent);

exports.WrapperPage = WrapperPage;