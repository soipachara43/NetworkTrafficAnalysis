"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExportTimelineByObjectIds = void 0;

var _saved_objects = require("../../../../saved_objects");

var _convert_saved_object_to_savedtimeline = require("../../convert_saved_object_to_savedtimeline");

var _saved_object = require("../../../pinned_event/saved_object");

var _saved_object2 = require("../../../note/saved_object");

var _utils = require("../../../detection_engine/routes/rules/utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getAllSavedPinnedEvents = pinnedEventsSavedObjects => {
  var _ref;

  return pinnedEventsSavedObjects != null ? ((_ref = pinnedEventsSavedObjects === null || pinnedEventsSavedObjects === void 0 ? void 0 : pinnedEventsSavedObjects.saved_objects) !== null && _ref !== void 0 ? _ref : []).map(savedObject => (0, _saved_object.convertSavedObjectToSavedPinnedEvent)(savedObject)) : [];
};

const getPinnedEventsByTimelineId = (savedObjectsClient, timelineId) => {
  const options = {
    type: _saved_objects.pinnedEventSavedObjectType,
    search: timelineId,
    searchFields: ['timelineId']
  };
  return savedObjectsClient.find(options);
};

const getAllSavedNote = noteSavedObjects => {
  return noteSavedObjects != null ? noteSavedObjects.saved_objects.map(savedObject => (0, _saved_object2.convertSavedObjectToSavedNote)(savedObject)) : [];
};

const getNotesByTimelineId = (savedObjectsClient, timelineId) => {
  const options = {
    type: _saved_objects.noteSavedObjectType,
    search: timelineId,
    searchFields: ['timelineId']
  };
  return savedObjectsClient.find(options);
};

const getGlobalEventNotesByTimelineId = currentNotes => {
  var _currentNotes$reduce;

  const initialNotes = {
    eventNotes: [],
    globalNotes: []
  };
  return (_currentNotes$reduce = currentNotes.reduce((acc, note) => {
    if (note.eventId == null) {
      return { ...acc,
        globalNotes: [...acc.globalNotes, note]
      };
    } else {
      return { ...acc,
        eventNotes: [...acc.eventNotes, note]
      };
    }
  }, initialNotes)) !== null && _currentNotes$reduce !== void 0 ? _currentNotes$reduce : initialNotes;
};

const getPinnedEventsIdsByTimelineId = currentPinnedEvents => {
  var _currentPinnedEvents$;

  return (_currentPinnedEvents$ = currentPinnedEvents.map(event => event.eventId)) !== null && _currentPinnedEvents$ !== void 0 ? _currentPinnedEvents$ : [];
};

const getTimelines = async (savedObjectsClient, timelineIds) => {
  const savedObjects = await Promise.resolve(savedObjectsClient.bulkGet(timelineIds.reduce((acc, timelineId) => [...acc, {
    id: timelineId,
    type: _saved_objects.timelineSavedObjectType
  }], [])));
  const timelineObjects = savedObjects != null ? savedObjects.saved_objects.map(savedObject => {
    return (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)(savedObject);
  }) : [];
  return timelineObjects;
};

const getTimelinesFromObjects = async (savedObjectsClient, request) => {
  const timelines = await getTimelines(savedObjectsClient, request.body.ids); // To Do for feature freeze
  // if (timelines.length !== request.body.ids.length) {
  //   //figure out which is missing to tell user
  // }

  const [notes, pinnedEventIds] = await Promise.all([Promise.all(request.body.ids.map(timelineId => getNotesByTimelineId(savedObjectsClient, timelineId))), Promise.all(request.body.ids.map(timelineId => getPinnedEventsByTimelineId(savedObjectsClient, timelineId)))]);
  const myNotes = notes.reduce((acc, note) => [...acc, ...getAllSavedNote(note)], []);
  const myPinnedEventIds = pinnedEventIds.reduce((acc, pinnedEventId) => [...acc, ...getAllSavedPinnedEvents(pinnedEventId)], []);
  const myResponse = request.body.ids.reduce((acc, timelineId) => {
    const myTimeline = timelines.find(t => t.savedObjectId === timelineId);

    if (myTimeline != null) {
      const timelineNotes = myNotes.filter(n => n.timelineId === timelineId);
      const timelinePinnedEventIds = myPinnedEventIds.filter(p => p.timelineId === timelineId);
      return [...acc, { ...myTimeline,
        ...getGlobalEventNotesByTimelineId(timelineNotes),
        pinnedEventIds: getPinnedEventsIdsByTimelineId(timelinePinnedEventIds)
      }];
    }

    return acc;
  }, []);
  return myResponse !== null && myResponse !== void 0 ? myResponse : [];
};

const getExportTimelineByObjectIds = async ({
  client,
  request
}) => {
  const timeline = await getTimelinesFromObjects(client, request);
  return (0, _utils.transformDataToNdjson)(timeline);
};

exports.getExportTimelineByObjectIds = getExportTimelineByObjectIds;