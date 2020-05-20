"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyProperties = StickyProperties;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TooltipFieldName = _styledComponents.default.span.withConfig({
  displayName: "TooltipFieldName",
  componentId: "sc-1156jpp-0"
})(["font-family:", ";"], _variables.fontFamilyCode);

var PropertyLabel = _styledComponents.default.div.withConfig({
  displayName: "PropertyLabel",
  componentId: "sc-1156jpp-1"
})(["margin-bottom:", ";font-size:", ";color:", ";span{cursor:help;}"], (0, _variables.px)(_variables.units.half), _variables.fontSizes.small, _eui_theme_light.default.euiColorMediumShade);

PropertyLabel.displayName = 'PropertyLabel';
var propertyValueLineHeight = 1.2;

var PropertyValue = _styledComponents.default.div.withConfig({
  displayName: "PropertyValue",
  componentId: "sc-1156jpp-2"
})(["display:inline-block;line-height:", ";"], propertyValueLineHeight);

PropertyValue.displayName = 'PropertyValue';

var PropertyValueTruncated = _styledComponents.default.span.withConfig({
  displayName: "PropertyValueTruncated",
  componentId: "sc-1156jpp-3"
})(["display:inline-block;line-height:", ";", ";"], propertyValueLineHeight, (0, _variables.truncate)('100%'));

function getPropertyLabel(_ref) {
  var fieldName = _ref.fieldName,
      label = _ref.label;

  if (fieldName) {
    return _react.default.createElement(PropertyLabel, null, _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(TooltipFieldName, null, fieldName)
    }, _react.default.createElement("span", null, label)));
  }

  return _react.default.createElement(PropertyLabel, null, label);
}

function getPropertyValue(_ref2) {
  var val = _ref2.val,
      fieldName = _ref2.fieldName,
      _ref2$truncated = _ref2.truncated,
      truncated = _ref2$truncated === void 0 ? false : _ref2$truncated;

  if (truncated) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: String(val)
    }, _react.default.createElement(PropertyValueTruncated, null, String(val)));
  }

  return _react.default.createElement(PropertyValue, null, val);
}

function StickyProperties(_ref3) {
  var stickyProperties = _ref3.stickyProperties;

  /**
   * Note: the padding and margin styles here are strange because
   * EUI flex groups and items have a default "gutter" applied that
   * won't allow percentage widths to line up correctly, so we have
   * to turn the gutter off with gutterSize: none. When we do that,
   * the top/bottom spacing *also* collapses, so we have to add
   * padding between each item without adding it to the outside of
   * the flex group itself.
   *
   * Hopefully we can make EUI handle this better and remove all this.
   */
  var itemStyles = {
    padding: '1em 1em 1em 0'
  };
  var groupStyles = {
    marginTop: '-1em',
    marginBottom: '-1em'
  };
  return _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true,
    gutterSize: "none",
    style: groupStyles
  }, stickyProperties && stickyProperties.map(function (_ref4, i) {
    var _ref4$width = _ref4.width,
        width = _ref4$width === void 0 ? 0 : _ref4$width,
        prop = _objectWithoutProperties(_ref4, ["width"]);

    return _react.default.createElement(_eui.EuiFlexItem, {
      key: i,
      style: _objectSpread({
        minWidth: width
      }, itemStyles),
      grow: false
    }, getPropertyLabel(prop), getPropertyValue(prop));
  }));
}