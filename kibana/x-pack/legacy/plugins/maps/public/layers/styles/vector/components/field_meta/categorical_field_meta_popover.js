"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoricalFieldMetaPopover = CategoricalFieldMetaPopover;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _field_meta_popover = require("./field_meta_popover");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CategoricalFieldMetaPopover(props) {
  var onIsEnabledChange = function onIsEnabledChange(event) {
    props.onChange(_objectSpread({}, props.styleProperty.getFieldMetaOptions(), {
      isEnabled: event.target.checked
    }));
  };

  return _react.default.createElement(_field_meta_popover.FieldMetaPopover, null, _react.default.createElement(_eui.EuiFormRow, {
    display: "columnCompressedSwitch"
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.categoricalLabel', {
      defaultMessage: 'Get categories from indices'
    }),
    checked: props.styleProperty.getFieldMetaOptions().isEnabled,
    onChange: onIsEnabledChange,
    compressed: true
  })));
}