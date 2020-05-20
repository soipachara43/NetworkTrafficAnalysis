"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrdinalFieldMetaPopover = OrdinalFieldMetaPopover;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _vector_style_defaults = require("../../vector_style_defaults");

var _field_meta_popover = require("./field_meta_popover");

var _constants = require("../../../../../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getIsEnableToggleLabel(styleName) {
  switch (styleName) {
    case _constants.VECTOR_STYLES.FILL_COLOR:
    case _constants.VECTOR_STYLES.LINE_COLOR:
      return _i18n.i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.colorLabel', {
        defaultMessage: 'Calculate color ramp range from indices'
      });

    case _constants.VECTOR_STYLES.LINE_WIDTH:
      return _i18n.i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.widthLabel', {
        defaultMessage: 'Calculate border width range from indices'
      });

    case _constants.VECTOR_STYLES.ICON_SIZE:
      return _i18n.i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.sizeLabel', {
        defaultMessage: 'Calculate symbol size range from indices'
      });

    default:
      return _i18n.i18n.translate('xpack.maps.styles.fieldMetaOptions.isEnabled.defaultLabel', {
        defaultMessage: 'Calculate symbolization range from indices'
      });
  }
}

function OrdinalFieldMetaPopover(props) {
  var onIsEnabledChange = function onIsEnabledChange(event) {
    props.onChange(_objectSpread({}, props.styleProperty.getFieldMetaOptions(), {
      isEnabled: event.target.checked
    }));
  };

  var onSigmaChange = function onSigmaChange(event) {
    props.onChange(_objectSpread({}, props.styleProperty.getFieldMetaOptions(), {
      sigma: parseInt(event.currentTarget.value, 10)
    }));
  };

  return _react.default.createElement(_field_meta_popover.FieldMetaPopover, null, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    display: "columnCompressedSwitch"
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: getIsEnableToggleLabel(props.styleProperty.getStyleName()),
    checked: props.styleProperty.getFieldMetaOptions().isEnabled,
    onChange: onIsEnabledChange,
    compressed: true
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.maps.styles.fieldMetaOptions.sigmaLabel', {
      defaultMessage: 'Sigma'
    }),
    display: "columnCompressed"
  }, _react.default.createElement(_eui.EuiRange, {
    min: 1,
    max: 5,
    step: 0.25,
    value: _lodash.default.get(props.styleProperty.getFieldMetaOptions(), 'sigma', _vector_style_defaults.DEFAULT_SIGMA),
    onChange: onSigmaChange,
    disabled: !props.styleProperty.getFieldMetaOptions().isEnabled,
    showTicks: true,
    tickInterval: 1,
    compressed: true
  }))));
}