"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkRoutesLoading = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroup",
  componentId: "sc-11inhh0-0"
})(["min-height:200px;"]);
FlexGroup.displayName = 'FlexGroup';

var NetworkRoutesLoading = function NetworkRoutesLoading() {
  return _react.default.createElement(FlexGroup, {
    justifyContent: "center",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  })));
};

exports.NetworkRoutesLoading = NetworkRoutesLoading;
NetworkRoutesLoading.displayName = 'NetworkRoutesLoading';