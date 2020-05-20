"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Tag = function Tag(_ref) {
  var name = _ref.name,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#666666' : _ref$color,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'health' : _ref$type,
      rest = _objectWithoutProperties(_ref, ["name", "color", "type"]);

  switch (type) {
    case 'health':
      return _react.default.createElement(_eui.EuiHealth, _extends({
        color: color
      }, rest), name);

    case 'badge':
      return _react.default.createElement(_eui.EuiBadge, _extends({
        color: color
      }, rest), name);
  }
};

exports.Tag = Tag;
Tag.propTypes = {
  name: _propTypes.default.string.isRequired,
  color: _propTypes.default.string,
  type: _propTypes.default.string
};