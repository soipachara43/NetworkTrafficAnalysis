"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionalFlexGroup = void 0;

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConditionalFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "ConditionalFlexGroup",
  componentId: "sc-1sqisyf-0"
})(["@media only screen and (min-width:1441px){flex-direction:row !important;}"]);
exports.ConditionalFlexGroup = ConditionalFlexGroup;
ConditionalFlexGroup.displayName = 'ConditionalFlexGroup';