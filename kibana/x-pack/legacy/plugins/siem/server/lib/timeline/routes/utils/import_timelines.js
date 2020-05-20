"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBulkError = exports.isImportRegular = exports.createTimelines = exports.saveNotes = exports.savePinnedEvents = exports.saveTimelines = exports.getTupleDuplicateErrorsAndUniqueTimeline = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _fp = require("lodash/fp");

var _utils = require("../../../detection_engine/routes/utils");

var _saved_object = require("../../../pinned_event/saved_object");

var _saved_object2 = require("../../../note/saved_object");

var _saved_object3 = require("../../saved_object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const pinnedEventLib = new _saved_object.PinnedEvent();
const timelineLib = new _saved_object3.Timeline();
const noteLib = new _saved_object2.Note();

const getTupleDuplicateErrorsAndUniqueTimeline = (timelines, isOverwrite) => {
  const {
    errors,
    timelinesAcc
  } = timelines.reduce((acc, parsedTimeline) => {
    if (parsedTimeline instanceof Error) {
      acc.timelinesAcc.set(_uuid.default.v4(), parsedTimeline);
    } else {
      const {
        savedObjectId
      } = parsedTimeline;

      if (savedObjectId != null) {
        if (acc.timelinesAcc.has(savedObjectId) && !isOverwrite) {
          acc.errors.set(_uuid.default.v4(), (0, _utils.createBulkErrorObject)({
            id: savedObjectId,
            statusCode: 400,
            message: `More than one timeline with savedObjectId: "${savedObjectId}" found`
          }));
        }

        acc.timelinesAcc.set(savedObjectId, parsedTimeline);
      } else {
        acc.timelinesAcc.set(_uuid.default.v4(), parsedTimeline);
      }
    }

    return acc;
  }, // using map (preserves ordering)
  {
    errors: new Map(),
    timelinesAcc: new Map()
  });
  return [Array.from(errors.values()), Array.from(timelinesAcc.values())];
};

exports.getTupleDuplicateErrorsAndUniqueTimeline = getTupleDuplicateErrorsAndUniqueTimeline;

const saveTimelines = async (frameworkRequest, timeline, timelineSavedObjectId, timelineVersion) => {
  var _ref, _newTimelineRes$timel, _ref2, _newTimelineRes$timel2;

  const newTimelineRes = await timelineLib.persistTimeline(frameworkRequest, timelineSavedObjectId !== null && timelineSavedObjectId !== void 0 ? timelineSavedObjectId : null, timelineVersion !== null && timelineVersion !== void 0 ? timelineVersion : null, timeline);
  return {
    newTimelineSavedObjectId: (_ref = newTimelineRes === null || newTimelineRes === void 0 ? void 0 : (_newTimelineRes$timel = newTimelineRes.timeline) === null || _newTimelineRes$timel === void 0 ? void 0 : _newTimelineRes$timel.savedObjectId) !== null && _ref !== void 0 ? _ref : null,
    newTimelineVersion: (_ref2 = newTimelineRes === null || newTimelineRes === void 0 ? void 0 : (_newTimelineRes$timel2 = newTimelineRes.timeline) === null || _newTimelineRes$timel2 === void 0 ? void 0 : _newTimelineRes$timel2.version) !== null && _ref2 !== void 0 ? _ref2 : null
  };
};

exports.saveTimelines = saveTimelines;

const savePinnedEvents = (frameworkRequest, timelineSavedObjectId, pinnedEventIds) => {
  var _ref3;

  return (_ref3 = pinnedEventIds === null || pinnedEventIds === void 0 ? void 0 : pinnedEventIds.map(eventId => {
    return pinnedEventLib.persistPinnedEventOnTimeline(frameworkRequest, null, // pinnedEventSavedObjectId
    eventId, timelineSavedObjectId);
  })) !== null && _ref3 !== void 0 ? _ref3 : [];
};

exports.savePinnedEvents = savePinnedEvents;

const saveNotes = (frameworkRequest, timelineSavedObjectId, timelineVersion, existingNoteIds, newNotes) => {
  var _ref4;

  return Promise.all((_ref4 = newNotes === null || newNotes === void 0 ? void 0 : newNotes.map(note => {
    var _ref5;

    const newNote = {
      eventId: note.eventId,
      note: note.note,
      timelineId: timelineSavedObjectId
    };
    return noteLib.persistNote(frameworkRequest, (_ref5 = existingNoteIds === null || existingNoteIds === void 0 ? void 0 : existingNoteIds.find(nId => nId === note.noteId)) !== null && _ref5 !== void 0 ? _ref5 : null, timelineVersion !== null && timelineVersion !== void 0 ? timelineVersion : null, newNote);
  })) !== null && _ref4 !== void 0 ? _ref4 : []);
};

exports.saveNotes = saveNotes;

const createTimelines = async (frameworkRequest, timeline, timelineSavedObjectId, timelineVersion, pinnedEventIds, notes, existingNoteIds) => {
  const {
    newTimelineSavedObjectId,
    newTimelineVersion
  } = await saveTimelines(frameworkRequest, timeline, timelineSavedObjectId, timelineVersion);
  await Promise.all([savePinnedEvents(frameworkRequest, timelineSavedObjectId !== null && timelineSavedObjectId !== void 0 ? timelineSavedObjectId : newTimelineSavedObjectId, pinnedEventIds), saveNotes(frameworkRequest, timelineSavedObjectId !== null && timelineSavedObjectId !== void 0 ? timelineSavedObjectId : newTimelineSavedObjectId, newTimelineVersion, existingNoteIds, notes)]);
  return newTimelineSavedObjectId;
};

exports.createTimelines = createTimelines;

const isImportRegular = importTimelineResponse => {
  return !(0, _fp.has)('error', importTimelineResponse) && (0, _fp.has)('status_code', importTimelineResponse);
};

exports.isImportRegular = isImportRegular;

const isBulkError = importRuleResponse => {
  return (0, _fp.has)('error', importRuleResponse);
};

exports.isBulkError = isBulkError;