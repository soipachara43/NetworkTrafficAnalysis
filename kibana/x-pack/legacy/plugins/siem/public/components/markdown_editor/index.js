"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownEditor = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _markdown = require("../markdown");

var i18n = _interopRequireWildcard(require("./translations"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TextArea = (0, _styledComponents.default)(_eui.EuiTextArea).withConfig({
  displayName: "TextArea",
  componentId: "g8aevb-0"
})(["width:100%;"]);
var Container = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "Container",
  componentId: "g8aevb-1"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["padding:0;background:", ";position:relative;.markdown-tabs-header{position:absolute;top:", ";right:", ";z-index:", ";}.euiTab{padding:10px;}.markdown-tabs{width:100%;}.markdown-tabs-footer{height:41px;padding:0 ", ";.euiLink{font-size:", ";}}.euiFormRow__labelWrapper{position:absolute;top:-", ";}.euiFormErrorText{padding:0 ", ";}"], theme.eui.euiColorLightestShade, theme.eui.euiSizeS, theme.eui.euiSizeS, theme.eui.euiZContentMenu, theme.eui.euiSizeM, theme.eui.euiSizeM, theme.eui.euiSizeL, theme.eui.euiSizeM);
});
var MarkdownContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "MarkdownContainer",
  componentId: "g8aevb-2"
})(["min-height:150px;overflow:auto;"]);

/** An input for entering a new case description  */
var MarkdownEditor = _react.default.memo(function (_ref2) {
  var bottomRightContent = _ref2.bottomRightContent,
      topRightContent = _ref2.topRightContent,
      content = _ref2.content,
      _ref2$isDisabled = _ref2.isDisabled,
      isDisabled = _ref2$isDisabled === void 0 ? false : _ref2$isDisabled,
      onChange = _ref2.onChange,
      placeholder = _ref2.placeholder,
      onCursorPositionUpdate = _ref2.onCursorPositionUpdate;
  var handleOnChange = (0, _react.useCallback)(function (evt) {
    onChange(evt.target.value);
  }, [onChange]);

  var setCursorPosition = function setCursorPosition(e) {
    if (onCursorPositionUpdate) {
      var _selectionStart, _selectionEnd;

      onCursorPositionUpdate({
        start: (_selectionStart = e.target.selectionStart) !== null && _selectionStart !== void 0 ? _selectionStart : 0,
        end: (_selectionEnd = e.target.selectionEnd) !== null && _selectionEnd !== void 0 ? _selectionEnd : 0
      });
    }

    return false;
  };

  var tabs = (0, _react.useMemo)(function () {
    return [{
      id: 'comment',
      name: i18n.MARKDOWN,
      content: _react.default.createElement(TextArea, {
        onChange: handleOnChange,
        onBlur: setCursorPosition,
        "aria-label": "markdown-editor-comment",
        fullWidth: true,
        disabled: isDisabled,
        placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : '',
        spellCheck: false,
        value: content
      })
    }, {
      id: 'preview',
      name: i18n.PREVIEW,
      content: _react.default.createElement(MarkdownContainer, {
        "data-test-subj": "markdown-container",
        paddingSize: "s"
      }, _react.default.createElement(_markdown.Markdown, {
        raw: content
      }))
    }];
  }, [content, isDisabled, placeholder]);
  return _react.default.createElement(Container, null, topRightContent && _react.default.createElement("div", {
    className: "markdown-tabs-header"
  }, topRightContent), _react.default.createElement(_eui.EuiTabbedContent, {
    className: "markdown-tabs",
    "data-test-subj": "markdown-tabs",
    size: "s",
    tabs: tabs,
    initialSelectedTab: tabs[0]
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    className: "markdown-tabs-footer",
    alignItems: "center",
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLink, {
    href: _constants.MARKDOWN_HELP_LINK,
    external: true,
    target: "_blank"
  }, i18n.MARKDOWN_SYNTAX_HELP)), bottomRightContent && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, bottomRightContent)));
});

exports.MarkdownEditor = MarkdownEditor;
MarkdownEditor.displayName = 'MarkdownEditor';