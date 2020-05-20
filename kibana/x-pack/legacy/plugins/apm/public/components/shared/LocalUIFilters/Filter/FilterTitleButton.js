"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterTitleButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Button = (0, _styledComponents.default)(_eui.EuiButtonEmpty).attrs(function () {
  return {
    contentProps: {
      className: 'alignLeft'
    },
    color: 'text'
  };
}).withConfig({
  displayName: "Button",
  componentId: "oltwer-0"
})(["width:100%;.alignLeft{justify-content:flex-start;padding-left:0;}"]);

var FilterTitleButton = function FilterTitleButton(props) {
  return _react.default.createElement(Button, props, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    textTransform: "uppercase"
  }, _react.default.createElement("h4", null, props.children)));
};

exports.FilterTitleButton = FilterTitleButton;