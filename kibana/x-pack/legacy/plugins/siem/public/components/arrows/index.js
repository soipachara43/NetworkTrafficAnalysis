"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowHead = exports.ArrowBody = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Renders the body (non-pointy part) of an arrow */
var ArrowBody = _styledComponents.default.span.withConfig({
  displayName: "ArrowBody",
  componentId: "vsjaxd-0"
})(["background-color:", ";height:", ";width:25px;"], function (props) {
  return props.theme.eui.euiColorLightShade;
}, function (_ref) {
  var height = _ref.height;
  return "".concat(height, "px");
});

exports.ArrowBody = ArrowBody;
ArrowBody.displayName = 'ArrowBody';

/** Renders the head of an arrow */
var ArrowHead = _react.default.memo(function (_ref2) {
  var direction = _ref2.direction;
  return _react.default.createElement(_eui.EuiIcon, {
    color: "subdued",
    "data-test-subj": "arrow-icon",
    size: "s",
    type: direction
  });
});

exports.ArrowHead = ArrowHead;
ArrowHead.displayName = 'ArrowHead';