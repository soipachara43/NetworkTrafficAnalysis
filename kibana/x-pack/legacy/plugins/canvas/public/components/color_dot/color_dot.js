"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorDot = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ColorDot = function ColorDot(_ref) {
  var value = _ref.value,
      children = _ref.children;
  var tc = (0, _tinycolor.default)(value);
  var style = {};

  if (tc.isValid()) {
    style = {
      background: value
    };
  }

  return _react.default.createElement("div", {
    className: "canvasColorDot"
  }, _react.default.createElement("div", {
    className: "canvasColorDot__background canvasCheckered"
  }), _react.default.createElement("div", {
    className: "canvasColorDot__foreground",
    style: style
  }, children));
};

exports.ColorDot = ColorDot;
ColorDot.propTypes = {
  value: _propTypes.default.string,
  children: _propTypes.default.node
};