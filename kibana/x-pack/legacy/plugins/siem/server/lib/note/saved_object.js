"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertSavedObjectToSavedNote = exports.Note = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _fp = require("lodash/fp");

var _uuid = _interopRequireDefault(require("uuid"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _constants = require("../../../common/constants");

var _types = require("./types");

var _saved_object_mappings = require("./saved_object_mappings");

var _saved_objects = require("../../saved_objects");

var _pick_saved_timeline = require("../timeline/pick_saved_timeline");

var _convert_saved_object_to_savedtimeline = require("../timeline/convert_saved_object_to_savedtimeline");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class Note {
  async deleteNote(request, noteIds) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    await Promise.all(noteIds.map(noteId => savedObjectsClient.delete(_saved_object_mappings.noteSavedObjectType, noteId)));
  }

  async deleteNoteByTimelineId(request, timelineId) {
    const options = {
      type: _saved_object_mappings.noteSavedObjectType,
      search: timelineId,
      searchFields: ['timelineId']
    };
    const notesToBeDeleted = await this.getAllSavedNote(request, options);
    const savedObjectsClient = request.context.core.savedObjects.client;
    await Promise.all(notesToBeDeleted.notes.map(note => savedObjectsClient.delete(_saved_object_mappings.noteSavedObjectType, note.noteId)));
  }

  async getNote(request, noteId) {
    return this.getSavedNote(request, noteId);
  }

  async getNotesByEventId(request, eventId) {
    const options = {
      type: _saved_object_mappings.noteSavedObjectType,
      search: eventId,
      searchFields: ['eventId']
    };
    const notesByEventId = await this.getAllSavedNote(request, options);
    return notesByEventId.notes;
  }

  async getNotesByTimelineId(request, timelineId) {
    const options = {
      type: _saved_object_mappings.noteSavedObjectType,
      search: timelineId,
      searchFields: ['timelineId']
    };
    const notesByTimelineId = await this.getAllSavedNote(request, options);
    return notesByTimelineId.notes;
  }

  async getAllNotes(request, pageInfo, search, sort) {
    const options = {
      type: _saved_object_mappings.noteSavedObjectType,
      perPage: pageInfo != null ? pageInfo.pageSize : undefined,
      page: pageInfo != null ? pageInfo.pageIndex : undefined,
      search: search != null ? search : undefined,
      searchFields: ['note'],
      sortField: sort != null ? sort.sortField : undefined,
      sortOrder: sort != null ? sort.sortOrder : undefined
    };
    return this.getAllSavedNote(request, options);
  }

  async persistNote(request, noteId, version, note) {
    try {
      const savedObjectsClient = request.context.core.savedObjects.client;

      if (noteId == null) {
        const timelineVersionSavedObject = note.timelineId == null ? await (async () => {
          const timelineResult = (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)((await savedObjectsClient.create(_saved_objects.timelineSavedObjectType, (0, _pick_saved_timeline.pickSavedTimeline)(null, {}, request.user))));
          note.timelineId = timelineResult.savedObjectId;
          return timelineResult.version;
        })() : null; // Create new note

        return {
          code: 200,
          message: 'success',
          note: convertSavedObjectToSavedNote((await savedObjectsClient.create(_saved_object_mappings.noteSavedObjectType, pickSavedNote(noteId, note, request.user))), timelineVersionSavedObject != null ? timelineVersionSavedObject : undefined)
        };
      } // Update new note


      const existingNote = await this.getSavedNote(request, noteId);
      return {
        code: 200,
        message: 'success',
        note: convertSavedObjectToSavedNote((await savedObjectsClient.update(_saved_object_mappings.noteSavedObjectType, noteId, pickSavedNote(noteId, note, request.user), {
          version: existingNote.version || undefined
        })))
      };
    } catch (err) {
      if ((0, _fp.getOr)(null, 'output.statusCode', err) === 403) {
        const noteToReturn = { ...note,
          noteId: _uuid.default.v1(),
          version: '',
          timelineId: '',
          timelineVersion: ''
        };
        return {
          code: 403,
          message: err.message,
          note: noteToReturn
        };
      }

      throw err;
    }
  }

  async getSavedNote(request, NoteId) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    const savedObject = await savedObjectsClient.get(_saved_object_mappings.noteSavedObjectType, NoteId);
    return convertSavedObjectToSavedNote(savedObject);
  }

  async getAllSavedNote(request, options) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    const savedObjects = await savedObjectsClient.find(options);
    return {
      totalCount: savedObjects.total,
      notes: savedObjects.saved_objects.map(savedObject => convertSavedObjectToSavedNote(savedObject))
    };
  }

}

exports.Note = Note;

const convertSavedObjectToSavedNote = (savedObject, timelineVersion) => (0, _pipeable.pipe)(_types.NoteSavedObjectRuntimeType.decode(savedObject), (0, _Either.map)(savedNote => ({
  noteId: savedNote.id,
  version: savedNote.version,
  timelineVersion,
  ...savedNote.attributes
})), (0, _Either.fold)(errors => {
  throw new Error((0, _PathReporter.failure)(errors).join('\n'));
}, _function.identity)); // we have to use any here because the SavedObjectAttributes interface is like below
// export interface SavedObjectAttributes {
//   [key: string]: SavedObjectAttributes | string | number | boolean | null;
// }
// then this interface does not allow types without index signature
// this is limiting us with our type for now so the easy way was to use any


exports.convertSavedObjectToSavedNote = convertSavedObjectToSavedNote;

const pickSavedNote = (noteId, savedNote, userInfo) => {
  if (noteId == null) {
    var _ref, _ref2;

    savedNote.created = new Date().valueOf();
    savedNote.createdBy = (_ref = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref !== void 0 ? _ref : _constants.UNAUTHENTICATED_USER;
    savedNote.updated = new Date().valueOf();
    savedNote.updatedBy = (_ref2 = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref2 !== void 0 ? _ref2 : _constants.UNAUTHENTICATED_USER;
  } else if (noteId != null) {
    var _ref3;

    savedNote.updated = new Date().valueOf();
    savedNote.updatedBy = (_ref3 = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref3 !== void 0 ? _ref3 : _constants.UNAUTHENTICATED_USER;
  }

  return savedNote;
};