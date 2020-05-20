"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressInline = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Wrapper = _styledComponents.default.dl.withConfig({
  displayName: "Wrapper",
  componentId: "jh4phm-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["align-items:center;display:inline-flex;& > * + *{margin-left:", ";}.siemProgressInline__bar{width:100px;}"], theme.eui.euiSizeS);
});

Wrapper.displayName = 'Wrapper';

var ProgressInline = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      current = _ref2.current,
      max = _ref2.max,
      unit = _ref2.unit;
  return _react.default.createElement(Wrapper, {
    className: "siemProgressInline"
  }, _react.default.createElement("dt", {
    className: "siemProgressInline__title"
  }, children), _react.default.createElement("dd", {
    className: "siemProgressInline__bar"
  }, _react.default.createElement(_eui.EuiProgress, {
    color: "secondary",
    max: max,
    value: current
  })), _react.default.createElement("dd", {
    className: "siemProgressInline__ratio"
  }, current.toLocaleString(), '/', max.toLocaleString(), " ", unit));
});

exports.ProgressInline = ProgressInline;
ProgressInline.displayName = 'ProgressInline';