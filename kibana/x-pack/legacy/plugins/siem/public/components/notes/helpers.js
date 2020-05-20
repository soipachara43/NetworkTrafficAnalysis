"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAndAssociateNode = exports.createNote = exports.NotesCount = exports.search = void 0;

var _eui = require("@elastic/eui");

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("./translations"));

var _page = require("../page");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Defines the behavior of the search input that appears above the table of data
 */
var search = {
  box: {
    incremental: true,
    placeholder: i18n.SEARCH_PLACEHOLDER,
    schema: {
      fields: {
        user: 'string',
        note: 'string'
      }
    }
  }
};
exports.search = search;

var TitleText = _styledComponents.default.h3.withConfig({
  displayName: "TitleText",
  componentId: "sc-1q02pa1-0"
})(["margin:0 5px;cursor:default;user-select:none;"]);

TitleText.displayName = 'TitleText';
/** Displays a count of the existing notes */

var NotesCount = _react.default.memo(function (_ref) {
  var noteIds = _ref.noteIds;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    color: "text",
    size: "l",
    type: "editorComment"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement(TitleText, null, i18n.NOTES))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_page.CountBadge, {
    color: "hollow"
  }, noteIds.length)));
});

exports.NotesCount = NotesCount;
NotesCount.displayName = 'NotesCount';
/** Creates a new instance of a `note` */

var createNote = function createNote(_ref2) {
  var newNote = _ref2.newNote,
      getNewNoteId = _ref2.getNewNoteId;
  return {
    created: _moment.default.utc().toDate(),
    id: getNewNoteId(),
    lastEdit: null,
    note: newNote.trim(),
    saveObjectId: null,
    user: 'elastic',
    // TODO: get the logged-in Kibana user
    version: null
  };
};

exports.createNote = createNote;

var updateAndAssociateNode = function updateAndAssociateNode(_ref3) {
  var associateNote = _ref3.associateNote,
      getNewNoteId = _ref3.getNewNoteId,
      newNote = _ref3.newNote,
      updateNewNote = _ref3.updateNewNote,
      updateNote = _ref3.updateNote;
  var note = createNote({
    newNote: newNote,
    getNewNoteId: getNewNoteId
  });
  updateNote(note); // perform IO to store the newly-created note

  associateNote(note.id); // associate the note with the (opaque) thing

  updateNewNote(''); // clear the input
};

exports.updateAndAssociateNode = updateAndAssociateNode;