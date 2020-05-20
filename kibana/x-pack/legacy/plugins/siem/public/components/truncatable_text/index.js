"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TruncatableText = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Applies CSS styling to enable text to be truncated with an ellipsis.
 * Example: "Don't leave me hanging..."
 *
 * Note: Requires a parent container with a defined width or max-width.
 */
var TruncatableText = _styledComponents.default.span.withConfig({
  displayName: "TruncatableText",
  componentId: "sc-1le2zz1-0"
})(["&,& *{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;vertical-align:top;white-space:nowrap;}"]);

exports.TruncatableText = TruncatableText;
TruncatableText.displayName = 'TruncatableText';