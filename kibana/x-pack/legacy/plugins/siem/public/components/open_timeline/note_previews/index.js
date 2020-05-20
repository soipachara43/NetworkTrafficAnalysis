"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotePreviews = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _note_preview = require("./note_preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotePreviewsContainer = _styledComponents.default.section.withConfig({
  displayName: "NotePreviewsContainer",
  componentId: "sc-2w116k-0"
})(["padding:", ";"], function (props) {
  return "".concat(props.theme.eui.euiSizeS, " 0 ").concat(props.theme.eui.euiSizeS, " ").concat(props.theme.eui.euiSizeXXL);
});

NotePreviewsContainer.displayName = 'NotePreviewsContainer';
/**
 * Renders a preview of a note in the All / Open Timelines table
 */

var NotePreviews = _react.default.memo(function (_ref) {
  var notes = _ref.notes;

  if (notes == null || notes.length === 0) {
    return null;
  }

  var uniqueNotes = (0, _fp.uniqBy)('savedObjectId', notes);
  return _react.default.createElement(NotePreviewsContainer, {
    "data-test-subj": "note-previews-container"
  }, uniqueNotes.map(function (_ref2) {
    var note = _ref2.note,
        savedObjectId = _ref2.savedObjectId,
        updated = _ref2.updated,
        updatedBy = _ref2.updatedBy;
    return savedObjectId != null ? _react.default.createElement(_note_preview.NotePreview, {
      "data-test-subj": "note-preview-".concat(savedObjectId),
      key: savedObjectId,
      note: note,
      updated: updated,
      updatedBy: updatedBy
    }) : null;
  }));
});

exports.NotePreviews = NotePreviews;
NotePreviews.displayName = 'NotePreviews';