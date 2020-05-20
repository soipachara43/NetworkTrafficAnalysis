"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullHeightFlexItem = exports.FullHeightFlexGroup = void 0;

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FullHeightFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FullHeightFlexGroup",
  componentId: "sc-7v1lms-0"
})(["height:100%;"]);
exports.FullHeightFlexGroup = FullHeightFlexGroup;
FullHeightFlexGroup.displayName = 'FullHeightFlexGroup';
var FullHeightFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "FullHeightFlexItem",
  componentId: "sc-7v1lms-1"
})(["height:100%;"]);
exports.FullHeightFlexItem = FullHeightFlexItem;
FullHeightFlexItem.displayName = 'FullHeightFlexItem';