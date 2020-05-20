"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BorderStyle", {
  enumerable: true,
  get: function get() {
    return _types.BorderStyle;
  }
});
exports.BorderForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _color_picker_popover = require("../../../components/color_picker_popover");

var _types = require("../../../../types");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var strings = _i18n.ArgTypesStrings.ContainerStyle;

var BorderForm = function BorderForm(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? '' : _ref$radius,
      onChange = _ref.onChange,
      colors = _ref.colors;

  var _value$split = value.split(' '),
      _value$split2 = _slicedToArray(_value$split, 3),
      _value$split2$ = _value$split2[0],
      borderWidth = _value$split2$ === void 0 ? '' : _value$split2$,
      _value$split2$2 = _value$split2[1],
      borderStyle = _value$split2$2 === void 0 ? '' : _value$split2$2,
      _value$split2$3 = _value$split2[2],
      borderColor = _value$split2$3 === void 0 ? '' : _value$split2$3;

  var borderStyleVal = (0, _types.isBorderStyle)(borderStyle) ? borderStyle : _types.BorderStyle.NONE;
  var borderWidthVal = borderWidth ? borderWidth.replace('px', '') : '';
  var radiusVal = typeof radius === 'string' ? radius.replace('px', '') : radius;

  var namedChange = function namedChange(name) {
    return function (val) {
      if (name === 'borderWidth') {
        return onChange('border', "".concat(val, "px ").concat(borderStyle, " ").concat(borderColor));
      }

      if (name === 'borderStyle') {
        if (val === '') {
          return onChange('border', "0px");
        }

        return onChange('border', "".concat(borderWidth, " ").concat(val, " ").concat(borderColor));
      }

      if (name === 'borderRadius') {
        if (val === '') {
          return onChange('borderRadius', "0px");
        }

        return onChange('borderRadius', "".concat(val, "px"));
      }

      onChange(name, val);
    };
  };

  var borderColorChange = function borderColorChange(color) {
    return onChange('border', "".concat(borderWidth, " ").concat(borderStyle, " ").concat(color));
  };

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getThicknessLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    compressed: true,
    value: Number(borderWidthVal),
    onChange: function onChange(e) {
      return namedChange('borderWidth')(Number(e.target.value));
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getStyleLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    compressed: true,
    valueOfSelected: borderStyleVal || 'none',
    options: Object.values(_types.BorderStyle).map(function (style) {
      return {
        value: style,
        inputDisplay: _react.default.createElement("div", {
          style: {
            height: 16,
            border: "4px ".concat(style)
          }
        })
      };
    }),
    onChange: namedChange('borderStyle')
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getRadiusLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    compressed: true,
    value: Number(radiusVal),
    onChange: function onChange(e) {
      return namedChange('borderRadius')(e.target.value);
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiFormRow, {
    display: "rowCompressed",
    label: strings.getColorLabel(),
    style: {
      fontSize: 0
    }
  }, _react.default.createElement(_color_picker_popover.ColorPickerPopover, {
    value: borderColor,
    onChange: borderColorChange,
    colors: colors,
    anchorPosition: "upCenter",
    ariaLabel: strings.getBorderTitle()
  }))));
};

exports.BorderForm = BorderForm;
BorderForm.propTypes = {
  value: _propTypes.default.string,
  radius: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func.isRequired,
  colors: _propTypes.default.array.isRequired
};