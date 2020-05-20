"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectableText = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SelectableText = _styledComponents.default.span.withConfig({
  displayName: "SelectableText",
  componentId: "sc-16ax1jx-0"
})(["user-select:text;"]);

exports.SelectableText = SelectableText;
SelectableText.displayName = 'SelectableText';