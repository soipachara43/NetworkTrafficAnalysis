"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistTimelineNoteMutation = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation PersistTimelineNoteMutation($noteId: ID, $version: String, $note: NoteInput!) {\n    persistNote(noteId: $noteId, version: $version, note: $note) {\n      code\n      message\n      note {\n        eventId\n        note\n        timelineId\n        timelineVersion\n        noteId\n        created\n        createdBy\n        updated\n        updatedBy\n        version\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var persistTimelineNoteMutation = (0, _graphqlTag.default)(_templateObject());
exports.persistTimelineNoteMutation = persistTimelineNoteMutation;