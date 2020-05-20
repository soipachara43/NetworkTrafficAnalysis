"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithCopyToClipboard = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _clipboard = require("./clipboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WithCopyToClipboardContainer = _styledComponents.default.div.withConfig({
  displayName: "WithCopyToClipboardContainer",
  componentId: "vc1vpg-0"
})(["align-items:center;display:flex;flex-direction:row;user-select:text;"]);

WithCopyToClipboardContainer.displayName = 'WithCopyToClipboardContainer';
/**
 * Renders `children` with an adjacent icon that when clicked, copies `text` to
 * the clipboard and displays a confirmation toast
 */

var WithCopyToClipboard = _react.default.memo(function (_ref) {
  var text = _ref.text,
      titleSummary = _ref.titleSummary,
      children = _ref.children;
  return _react.default.createElement(WithCopyToClipboardContainer, null, _react.default.createElement(_react.default.Fragment, null, children), _react.default.createElement(_clipboard.Clipboard, {
    content: text,
    titleSummary: titleSummary,
    toastLifeTimeMs: 800
  }));
});

exports.WithCopyToClipboard = WithCopyToClipboard;
WithCopyToClipboard.displayName = 'WithCopyToClipboard';