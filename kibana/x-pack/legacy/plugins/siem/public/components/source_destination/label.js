"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Label = _styledComponents.default.div.withConfig({
  displayName: "Label",
  componentId: "sc-15zbfan-0"
})(["font-weight:bold;margin-top:2px;"]);

exports.Label = Label;