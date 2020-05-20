"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Embeddable = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Panel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "Panel",
  componentId: "haiede-0"
})(["overflow:hidden;"]);
Panel.displayName = 'Panel';

var Embeddable = _react.default.memo(function (_ref) {
  var children = _ref.children;
  return _react.default.createElement("section", {
    className: "siemEmbeddable"
  }, _react.default.createElement(Panel, {
    paddingSize: "none"
  }, children));
});

exports.Embeddable = Embeddable;
Embeddable.displayName = 'Embeddable';