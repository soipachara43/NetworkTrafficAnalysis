"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorsSelector = exports.notesByIdsSelector = exports.selectNotesByIdSelector = exports.getNotes = void 0;

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reselect = require("reselect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var selectNotesById = function selectNotesById(state) {
  return state.app.notesById;
};

var getErrors = function getErrors(state) {
  return state.app.errors;
};

var getNotes = (0, _memoizeOne.default)(function (notesById, noteIds) {
  return (0, _fp.keys)(notesById).reduce(function (acc, noteId) {
    if (noteIds.includes(noteId)) {
      var note = notesById[noteId];
      return [].concat(_toConsumableArray(acc), [note]);
    }

    return acc;
  }, []);
});
exports.getNotes = getNotes;
var selectNotesByIdSelector = (0, _reselect.createSelector)(selectNotesById, function (notesById) {
  return notesById;
});
exports.selectNotesByIdSelector = selectNotesByIdSelector;

var notesByIdsSelector = function notesByIdsSelector() {
  return (0, _reselect.createSelector)(selectNotesById, function (notesById) {
    return notesById;
  });
};

exports.notesByIdsSelector = notesByIdsSelector;

var errorsSelector = function errorsSelector() {
  return (0, _reselect.createSelector)(getErrors, function (errors) {
    return {
      errors: errors
    };
  });
};

exports.errorsSelector = errorsSelector;