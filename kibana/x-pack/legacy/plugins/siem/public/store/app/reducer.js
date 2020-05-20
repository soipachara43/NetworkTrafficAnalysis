"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appReducer = exports.updateNotesById = exports.initialAppState = void 0;

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _actions = require("./actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialAppState = {
  notesById: {},
  errors: []
};
exports.initialAppState = initialAppState;

var updateNotesById = function updateNotesById(_ref) {
  var note = _ref.note,
      notesById = _ref.notesById;
  return _objectSpread({}, notesById, _defineProperty({}, note.id, note));
};

exports.updateNotesById = updateNotesById;
var appReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialAppState).case(_actions.addNotes, function (state, _ref2) {
  var notes = _ref2.notes;
  return _objectSpread({}, state, {
    notesById: notes.reduce(function (acc, note) {
      return _objectSpread({}, acc, _defineProperty({}, note.id, note));
    }, {})
  });
}).case(_actions.updateNote, function (state, _ref3) {
  var note = _ref3.note;
  return _objectSpread({}, state, {
    notesById: updateNotesById({
      note: note,
      notesById: state.notesById
    })
  });
}).case(_actions.addError, function (state, _ref4) {
  var id = _ref4.id,
      title = _ref4.title,
      message = _ref4.message;
  return _objectSpread({}, state, {
    errors: state.errors.concat({
      id: id,
      title: title,
      message: message
    })
  });
}).case(_actions.removeError, function (state, _ref5) {
  var id = _ref5.id;
  return _objectSpread({}, state, {
    errors: state.errors.filter(function (error) {
      return error.id !== id;
    })
  });
}).build();
exports.appReducer = appReducer;