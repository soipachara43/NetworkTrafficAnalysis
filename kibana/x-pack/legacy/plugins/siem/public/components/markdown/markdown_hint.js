"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownHint = exports.MarkdownHintComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Heading = _styledComponents.default.span.withConfig({
  displayName: "Heading",
  componentId: "xilab6-0"
})(["margin-right:5px;"]);

Heading.displayName = 'Heading';

var Bold = _styledComponents.default.span.withConfig({
  displayName: "Bold",
  componentId: "xilab6-1"
})(["font-weight:bold;margin-right:5px;"]);

Bold.displayName = 'Bold';
var MarkdownHintContainer = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "MarkdownHintContainer",
  componentId: "xilab6-2"
})(["visibility:", ";"], function (_ref) {
  var visibility = _ref.visibility;
  return visibility;
});
MarkdownHintContainer.displayName = 'MarkdownHintContainer';

var ImageUrl = _styledComponents.default.span.withConfig({
  displayName: "ImageUrl",
  componentId: "xilab6-3"
})(["margin-left:5px;"]);

ImageUrl.displayName = 'ImageUrl';

var Italic = _styledComponents.default.span.withConfig({
  displayName: "Italic",
  componentId: "xilab6-4"
})(["font-style:italic;margin-right:5px;"]);

Italic.displayName = 'Italic';

var Strikethrough = _styledComponents.default.span.withConfig({
  displayName: "Strikethrough",
  componentId: "xilab6-5"
})(["text-decoration:line-through;"]);

Strikethrough.displayName = 'Strikethrough';

var Code = _styledComponents.default.span.withConfig({
  displayName: "Code",
  componentId: "xilab6-6"
})(["font-family:monospace;margin-right:5px;"]);

Code.displayName = 'Code';

var TrailingWhitespace = _styledComponents.default.span.withConfig({
  displayName: "TrailingWhitespace",
  componentId: "xilab6-7"
})(["margin-right:5px;"]);

TrailingWhitespace.displayName = 'TrailingWhitespace';

var MarkdownHintComponent = function MarkdownHintComponent(_ref2) {
  var show = _ref2.show;
  return _react.default.createElement(MarkdownHintContainer, {
    color: "subdued",
    "data-test-subj": "markdown-hint",
    size: "xs",
    visibility: show ? 'inline' : 'hidden'
  }, _react.default.createElement(Heading, {
    "data-test-subj": "heading-hint"
  }, i18n.MARKDOWN_HINT_HEADING), _react.default.createElement(Bold, {
    "data-test-subj": "bold-hint"
  }, i18n.MARKDOWN_HINT_BOLD), _react.default.createElement(Italic, {
    "data-test-subj": "italic-hint"
  }, i18n.MARKDOWN_HINT_ITALICS), _react.default.createElement(Code, {
    "data-test-subj": "code-hint"
  }, i18n.MARKDOWN_HINT_CODE), _react.default.createElement(TrailingWhitespace, null, i18n.MARKDOWN_HINT_URL), _react.default.createElement(TrailingWhitespace, null, i18n.MARKDOWN_HINT_BULLET), _react.default.createElement(Code, {
    "data-test-subj": "preformatted-hint"
  }, i18n.MARKDOWN_HINT_PREFORMATTED), _react.default.createElement(TrailingWhitespace, null, i18n.MARKDOWN_HINT_QUOTE), '~~', _react.default.createElement(Strikethrough, {
    "data-test-subj": "strikethrough-hint"
  }, i18n.MARKDOWN_HINT_STRIKETHROUGH), '~~', _react.default.createElement(ImageUrl, null, i18n.MARKDOWN_HINT_IMAGE_URL));
};

exports.MarkdownHintComponent = MarkdownHintComponent;
MarkdownHintComponent.displayName = 'MarkdownHintComponent';

var MarkdownHint = _react.default.memo(MarkdownHintComponent);

exports.MarkdownHint = MarkdownHint;
MarkdownHint.displayName = 'MarkdownHint';