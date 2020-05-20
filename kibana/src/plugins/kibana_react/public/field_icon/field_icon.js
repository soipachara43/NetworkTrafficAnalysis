"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldIcon = FieldIcon;
exports.typeToEuiIconMap = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// defaultIcon => a unknown datatype
var defaultIcon = {
  iconType: 'questionInCircle',
  color: 'gray'
};
var typeToEuiIconMap = {
  boolean: {
    iconType: 'tokenBoolean'
  },
  // icon for an index pattern mapping conflict in discover
  conflict: {
    iconType: 'alert',
    color: 'euiVisColor9'
  },
  date: {
    iconType: 'tokenDate'
  },
  geo_point: {
    iconType: 'tokenGeo'
  },
  geo_shape: {
    iconType: 'tokenGeo'
  },
  ip: {
    iconType: 'tokenIP'
  },
  // is a plugin's data type https://www.elastic.co/guide/en/elasticsearch/plugins/current/mapper-murmur3-usage.html
  murmur3: {
    iconType: 'tokenFile'
  },
  number: {
    iconType: 'tokenNumber'
  },
  _source: {
    iconType: 'editorCodeBlock',
    color: 'gray'
  },
  string: {
    iconType: 'tokenString'
  },
  nested: {
    iconType: 'tokenNested'
  }
};
/**
 * Field token icon used across the app
 */

exports.typeToEuiIconMap = typeToEuiIconMap;

function FieldIcon(_ref) {
  var type = _ref.type,
      label = _ref.label,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 's' : _ref$size,
      scripted = _ref.scripted,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ["type", "label", "size", "scripted", "className"]);

  var token = typeToEuiIconMap[type] || defaultIcon;
  return _react.default.createElement(_eui.EuiToken, _extends({}, token, {
    className: (0, _classnames.default)('kbnFieldIcon', className),
    "aria-label": label || type,
    title: label || type,
    size: size,
    fill: scripted ? 'dark' : undefined
  }, rest));
}