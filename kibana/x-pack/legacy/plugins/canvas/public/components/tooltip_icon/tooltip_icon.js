"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipIcon = exports.IconType = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var IconType;
exports.IconType = IconType;

(function (IconType) {
  IconType["error"] = "error";
  IconType["warning"] = "warning";
  IconType["info"] = "info";
})(IconType || (exports.IconType = IconType = {}));

var TooltipIcon = function TooltipIcon(_ref) {
  var _icons;

  var _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? IconType.info : _ref$icon,
      rest = _objectWithoutProperties(_ref, ["icon"]);

  var icons = (_icons = {}, _defineProperty(_icons, IconType.error, {
    type: 'alert',
    color: 'danger'
  }), _defineProperty(_icons, IconType.warning, {
    type: 'alert',
    color: 'warning'
  }), _defineProperty(_icons, IconType.info, {
    type: 'iInCircle',
    color: 'default'
  }), _icons);
  return _react.default.createElement(_eui.EuiIconTip, _extends({}, rest, {
    type: icons[icon].type,
    color: icons[icon].color
  }));
};

exports.TooltipIcon = TooltipIcon;
TooltipIcon.propTypes = {
  icon: _propTypes.default.string
};