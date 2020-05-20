"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddNote = exports.CancelButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _markdown_hint = require("../../markdown/markdown_hint");

var _helpers = require("../helpers");

var i18n = _interopRequireWildcard(require("../translations"));

var _new_note = require("./new_note");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AddNotesContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "AddNotesContainer",
  componentId: "aksa2t-0"
})(["margin-bottom:5px;user-select:none;"]);
AddNotesContainer.displayName = 'AddNotesContainer';
var ButtonsContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "ButtonsContainer",
  componentId: "aksa2t-1"
})(["margin-top:5px;"]);
ButtonsContainer.displayName = 'ButtonsContainer';

var CancelButton = _react.default.memo(function (_ref) {
  var onCancelAddNote = _ref.onCancelAddNote;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "cancel",
    onClick: onCancelAddNote
  }, i18n.CANCEL);
});

exports.CancelButton = CancelButton;
CancelButton.displayName = 'CancelButton';
/** Displays an input for entering a new note, with an adjacent "Add" button */

var AddNote = _react.default.memo(function (_ref2) {
  var associateNote = _ref2.associateNote,
      getNewNoteId = _ref2.getNewNoteId,
      newNote = _ref2.newNote,
      onCancelAddNote = _ref2.onCancelAddNote,
      updateNewNote = _ref2.updateNewNote,
      updateNote = _ref2.updateNote;
  var handleClick = (0, _react.useCallback)(function () {
    return (0, _helpers.updateAndAssociateNode)({
      associateNote: associateNote,
      getNewNoteId: getNewNoteId,
      newNote: newNote,
      updateNewNote: updateNewNote,
      updateNote: updateNote
    });
  }, [associateNote, getNewNoteId, newNote, updateNewNote, updateNote]);
  return _react.default.createElement(AddNotesContainer, {
    alignItems: "flexEnd",
    direction: "column",
    gutterSize: "none"
  }, _react.default.createElement(_new_note.NewNote, {
    note: newNote,
    noteInputHeight: 200,
    updateNewNote: updateNewNote
  }), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_markdown_hint.MarkdownHint, {
    show: newNote.trim().length > 0
  })), _react.default.createElement(ButtonsContainer, {
    gutterSize: "none"
  }, onCancelAddNote != null ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(CancelButton, {
    onCancelAddNote: onCancelAddNote
  })) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "add-note",
    isDisabled: newNote.trim().length === 0,
    fill: true,
    onClick: handleClick
  }, i18n.ADD_NOTE))));
});

exports.AddNote = AddNote;
AddNote.displayName = 'AddNote';