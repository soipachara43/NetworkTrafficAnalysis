"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _hex_to_rgb = require("../../../common/lib/hex_to_rgb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Loading = function Loading(_ref) {
  var _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? false : _ref$animated,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? '' : _ref$text,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? '#000000' : _ref$backgroundColor;

  if (animated) {
    return _react.default.createElement("div", {
      className: "canvasLoading"
    }, text && _react.default.createElement("span", null, text, "\xA0"), _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "m"
    }));
  }

  var rgb = (0, _hex_to_rgb.hexToRgb)(backgroundColor);
  var color = 'text';

  if (rgb && (0, _eui.isColorDark)(rgb[0], rgb[1], rgb[2])) {
    color = 'ghost';
  }

  return _react.default.createElement("div", {
    className: "canvasLoading"
  }, text && _react.default.createElement("span", null, text, "\xA0"), _react.default.createElement(_eui.EuiIcon, {
    color: color,
    type: "clock"
  }));
};

exports.Loading = Loading;
Loading.propTypes = {
  animated: _propTypes.default.bool,
  backgroundColor: _propTypes.default.string,
  text: _propTypes.default.string
};
Loading.defaultProps = {
  animated: false,
  backgroundColor: '#000000',
  text: ''
};