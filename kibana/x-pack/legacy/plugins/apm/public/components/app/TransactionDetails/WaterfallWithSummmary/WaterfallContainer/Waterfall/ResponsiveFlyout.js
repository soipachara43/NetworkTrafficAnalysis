"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveFlyout = void 0;

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ResponsiveFlyout = (0, _styledComponents.default)(_eui.EuiFlyout).withConfig({
  displayName: "ResponsiveFlyout",
  componentId: "sc-1gn3o9a-0"
})(["width:100%;@media (min-width:800px){width:90%;}@media (min-width:1000px){width:80%;}@media (min-width:1400px){width:70%;}@media (min-width:2000px){width:60%;}"]);
exports.ResponsiveFlyout = ResponsiveFlyout;