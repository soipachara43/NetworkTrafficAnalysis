"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementCard = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _tag_list = require("../tag_list/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var tagType = 'badge';

var ElementCard = function ElementCard(_ref) {
  var title = _ref.title,
      description = _ref.description,
      image = _ref.image,
      _ref$tags = _ref.tags,
      tags = _ref$tags === void 0 ? [] : _ref$tags,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ["title", "description", "image", "tags", "onClick"]);

  return _react.default.createElement(_eui.EuiCard, _extends({
    className: image ? 'canvasElementCard' : 'canvasElementCard canvasElementCard--hasIcon',
    textAlign: "left",
    title: title,
    description: description,
    footer: _react.default.createElement(_tag_list.TagList, {
      tags: tags,
      tagType: tagType
    }),
    image: image,
    icon: image ? undefined : _react.default.createElement(_eui.EuiIcon, {
      type: "canvasApp",
      size: "xxl"
    }),
    onClick: onClick
  }, rest));
};

exports.ElementCard = ElementCard;
ElementCard.propTypes = {
  title: _propTypes.default.string.isRequired,
  description: _propTypes.default.string.isRequired,
  image: _propTypes.default.string,
  onClick: _propTypes.default.func
};