"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteCards = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _add_note = require("../add_note");

var _note_card = require("../note_card");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AddNoteContainer = _styledComponents.default.div.withConfig({
  displayName: "AddNoteContainer",
  componentId: "sc-1bwcc0y-0"
})([""]);

AddNoteContainer.displayName = 'AddNoteContainer';

var NoteContainer = _styledComponents.default.div.withConfig({
  displayName: "NoteContainer",
  componentId: "sc-1bwcc0y-1"
})(["margin-top:5px;"]);

NoteContainer.displayName = 'NoteContainer';

var NoteCardsComp = _react.default.memo(function (_ref) {
  var children = _ref.children;
  return _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "note-cards",
    hasShadow: false,
    paddingSize: "none",
    style: {
      border: 'none'
    }
  }, children);
});

NoteCardsComp.displayName = 'NoteCardsComp';
var NotesContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "NotesContainer",
  componentId: "sc-1bwcc0y-2"
})(["padding:0 5px;margin-bottom:5px;"]);
NotesContainer.displayName = 'NotesContainer';

/** A view for entering and reviewing notes */
var NoteCards = _react.default.memo(function (_ref2) {
  var associateNote = _ref2.associateNote,
      getNotesByIds = _ref2.getNotesByIds,
      getNewNoteId = _ref2.getNewNoteId,
      noteIds = _ref2.noteIds,
      showAddNote = _ref2.showAddNote,
      toggleShowAddNote = _ref2.toggleShowAddNote,
      updateNote = _ref2.updateNote;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      newNote = _useState2[0],
      setNewNote = _useState2[1];

  var associateNoteAndToggleShow = (0, _react.useCallback)(function (noteId) {
    associateNote(noteId);
    toggleShowAddNote();
  }, [associateNote, toggleShowAddNote]);
  return _react.default.createElement(NoteCardsComp, null, noteIds.length ? _react.default.createElement(NotesContainer, {
    "data-test-subj": "notes",
    direction: "column",
    gutterSize: "none"
  }, getNotesByIds(noteIds).map(function (note) {
    return _react.default.createElement(NoteContainer, {
      "data-test-subj": "note-container",
      key: note.id
    }, _react.default.createElement(_note_card.NoteCard, {
      created: note.created,
      rawNote: note.note,
      user: note.user
    }));
  })) : null, showAddNote ? _react.default.createElement(AddNoteContainer, {
    "data-test-subj": "add-note-container"
  }, _react.default.createElement(_add_note.AddNote, {
    associateNote: associateNoteAndToggleShow,
    getNewNoteId: getNewNoteId,
    newNote: newNote,
    onCancelAddNote: toggleShowAddNote,
    updateNewNote: setNewNote,
    updateNote: updateNote
  })) : null);
});

exports.NoteCards = NoteCards;
NoteCards.displayName = 'NoteCards';