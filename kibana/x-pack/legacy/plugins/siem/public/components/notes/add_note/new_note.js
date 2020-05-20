"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewNote = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _markdown = require("../../markdown");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NewNoteTabs = (0, _styledComponents.default)(_eui.EuiTabbedContent).withConfig({
  displayName: "NewNoteTabs",
  componentId: "pd4xte-0"
})(["width:100%;"]);
NewNoteTabs.displayName = 'NewNoteTabs';
var MarkdownContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "MarkdownContainer",
  componentId: "pd4xte-1"
})(["height:", "px;overflow:auto;"], function (_ref) {
  var height = _ref.height;
  return height;
});
MarkdownContainer.displayName = 'MarkdownContainer';
var TextArea = (0, _styledComponents.default)(_eui.EuiTextArea).withConfig({
  displayName: "TextArea",
  componentId: "pd4xte-2"
})(["min-height:", ";width:100%;"], function (_ref2) {
  var height = _ref2.height;
  return "".concat(height, "px");
});
TextArea.displayName = 'TextArea';
/** An input for entering a new note  */

var NewNote = _react.default.memo(function (_ref3) {
  var note = _ref3.note,
      noteInputHeight = _ref3.noteInputHeight,
      updateNewNote = _ref3.updateNewNote;
  var tabs = [{
    id: 'note',
    name: i18n.NOTE,
    content: _react.default.createElement(TextArea, {
      autoFocus: true,
      "aria-label": i18n.NOTE,
      "data-test-subj": "add-a-note",
      fullWidth: true,
      height: noteInputHeight,
      onChange: function onChange(e) {
        return updateNewNote(e.target.value);
      },
      placeholder: i18n.ADD_A_NOTE,
      spellCheck: true,
      value: note
    })
  }, {
    id: 'preview',
    name: i18n.PREVIEW_MARKDOWN,
    content: _react.default.createElement(MarkdownContainer, {
      "data-test-subj": "markdown-container",
      height: noteInputHeight,
      paddingSize: "s"
    }, _react.default.createElement(_markdown.Markdown, {
      raw: note
    }))
  }];
  return _react.default.createElement(NewNoteTabs, {
    "data-test-subj": "new-note-tabs",
    tabs: tabs,
    initialSelectedTab: tabs[0]
  });
});

exports.NewNote = NewNote;
NewNote.displayName = 'NewNote';