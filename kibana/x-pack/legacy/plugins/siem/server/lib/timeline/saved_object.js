"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelineWithReduxProperties = exports.convertStringToBase64 = exports.Timeline = void 0;

var _fp = require("lodash/fp");

var _constants = require("../../../common/constants");

var _saved_object = require("../note/saved_object");

var _saved_object2 = require("../pinned_event/saved_object");

var _convert_saved_object_to_savedtimeline = require("./convert_saved_object_to_savedtimeline");

var _pick_saved_timeline = require("./pick_saved_timeline");

var _saved_object_mappings = require("./saved_object_mappings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Timeline {
  constructor() {
    _defineProperty(this, "note", new _saved_object.Note());

    _defineProperty(this, "pinnedEvent", new _saved_object2.PinnedEvent());
  }

  async getTimeline(request, timelineId) {
    return this.getSavedTimeline(request, timelineId);
  }

  async getAllTimeline(request, onlyUserFavorite, pageInfo, search, sort) {
    const options = {
      type: _saved_object_mappings.timelineSavedObjectType,
      perPage: pageInfo != null ? pageInfo.pageSize : undefined,
      page: pageInfo != null ? pageInfo.pageIndex : undefined,
      search: search != null ? search : undefined,
      searchFields: onlyUserFavorite ? ['title', 'description', 'favorite.keySearch'] : ['title', 'description'],
      sortField: sort != null ? sort.sortField : undefined,
      sortOrder: sort != null ? sort.sortOrder : undefined
    };
    return this.getAllSavedTimeline(request, options);
  }

  async persistFavorite(request, timelineId) {
    var _ref, _request$user, _ref2, _request$user2;

    const userName = (_ref = (_request$user = request.user) === null || _request$user === void 0 ? void 0 : _request$user.username) !== null && _ref !== void 0 ? _ref : _constants.UNAUTHENTICATED_USER;
    const fullName = (_ref2 = (_request$user2 = request.user) === null || _request$user2 === void 0 ? void 0 : _request$user2.full_name) !== null && _ref2 !== void 0 ? _ref2 : '';

    try {
      let timeline = {};

      if (timelineId != null) {
        const {
          eventIdToNoteIds,
          notes,
          noteIds,
          pinnedEventIds,
          pinnedEventsSaveObject,
          savedObjectId,
          version,
          ...savedTimeline
        } = await this.getBasicSavedTimeline(request, timelineId);
        timelineId = savedObjectId; // eslint-disable-line no-param-reassign

        timeline = savedTimeline;
      }

      const userFavoriteTimeline = {
        keySearch: userName != null ? convertStringToBase64(userName) : null,
        favoriteDate: new Date().valueOf(),
        fullName,
        userName
      };

      if (timeline.favorite != null) {
        const alreadyExistsTimelineFavoriteByUser = timeline.favorite.findIndex(user => user.userName === userName);
        timeline.favorite = alreadyExistsTimelineFavoriteByUser > -1 ? [...timeline.favorite.slice(0, alreadyExistsTimelineFavoriteByUser), ...timeline.favorite.slice(alreadyExistsTimelineFavoriteByUser + 1)] : [...timeline.favorite, userFavoriteTimeline];
      } else if (timeline.favorite == null) {
        timeline.favorite = [userFavoriteTimeline];
      }

      const persistResponse = await this.persistTimeline(request, timelineId, null, timeline);
      return {
        savedObjectId: persistResponse.timeline.savedObjectId,
        version: persistResponse.timeline.version,
        favorite: persistResponse.timeline.favorite != null ? persistResponse.timeline.favorite.filter(fav => fav.userName === userName) : []
      };
    } catch (err) {
      if ((0, _fp.getOr)(null, 'output.statusCode', err) === 403) {
        return {
          savedObjectId: '',
          version: '',
          favorite: [],
          code: 403,
          message: err.message
        };
      }

      throw err;
    }
  }

  async persistTimeline(request, timelineId, version, timeline) {
    const savedObjectsClient = request.context.core.savedObjects.client;

    try {
      if (timelineId == null) {
        // Create new timeline
        const newTimeline = (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)((await savedObjectsClient.create(_saved_object_mappings.timelineSavedObjectType, (0, _pick_saved_timeline.pickSavedTimeline)(timelineId, timeline, request.user))));
        return {
          code: 200,
          message: 'success',
          timeline: newTimeline
        };
      } // Update Timeline


      await savedObjectsClient.update(_saved_object_mappings.timelineSavedObjectType, timelineId, (0, _pick_saved_timeline.pickSavedTimeline)(timelineId, timeline, request.user), {
        version: version || undefined
      });
      return {
        code: 200,
        message: 'success',
        timeline: await this.getSavedTimeline(request, timelineId)
      };
    } catch (err) {
      if (timelineId != null && savedObjectsClient.errors.isConflictError(err)) {
        return {
          code: 409,
          message: err.message,
          timeline: await this.getSavedTimeline(request, timelineId)
        };
      } else if ((0, _fp.getOr)(null, 'output.statusCode', err) === 403) {
        const timelineToReturn = { ...timeline,
          savedObjectId: '',
          version: ''
        };
        return {
          code: 403,
          message: err.message,
          timeline: timelineToReturn
        };
      }

      throw err;
    }
  }

  async deleteTimeline(request, timelineIds) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    await Promise.all(timelineIds.map(timelineId => Promise.all([savedObjectsClient.delete(_saved_object_mappings.timelineSavedObjectType, timelineId), this.note.deleteNoteByTimelineId(request, timelineId), this.pinnedEvent.deleteAllPinnedEventsOnTimeline(request, timelineId)])));
  }

  async getBasicSavedTimeline(request, timelineId) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    const savedObject = await savedObjectsClient.get(_saved_object_mappings.timelineSavedObjectType, timelineId);
    return (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)(savedObject);
  }

  async getSavedTimeline(request, timelineId) {
    var _ref3, _request$user3;

    const userName = (_ref3 = (_request$user3 = request.user) === null || _request$user3 === void 0 ? void 0 : _request$user3.username) !== null && _ref3 !== void 0 ? _ref3 : _constants.UNAUTHENTICATED_USER;
    const savedObjectsClient = request.context.core.savedObjects.client;
    const savedObject = await savedObjectsClient.get(_saved_object_mappings.timelineSavedObjectType, timelineId);
    const timelineSaveObject = (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)(savedObject);
    const timelineWithNotesAndPinnedEvents = await Promise.all([this.note.getNotesByTimelineId(request, timelineSaveObject.savedObjectId), this.pinnedEvent.getAllPinnedEventsByTimelineId(request, timelineSaveObject.savedObjectId), Promise.resolve(timelineSaveObject)]);
    const [notes, pinnedEvents, timeline] = timelineWithNotesAndPinnedEvents;
    return timelineWithReduxProperties(notes, pinnedEvents, timeline, userName);
  }

  async getAllSavedTimeline(request, options) {
    var _ref4, _request$user4;

    const userName = (_ref4 = (_request$user4 = request.user) === null || _request$user4 === void 0 ? void 0 : _request$user4.username) !== null && _ref4 !== void 0 ? _ref4 : _constants.UNAUTHENTICATED_USER;
    const savedObjectsClient = request.context.core.savedObjects.client;

    if (options.searchFields != null && options.searchFields.includes('favorite.keySearch')) {
      options.search = `${options.search != null ? options.search : ''} ${userName != null ? convertStringToBase64(userName) : null}`;
    }

    const savedObjects = await savedObjectsClient.find(options);
    const timelinesWithNotesAndPinnedEvents = await Promise.all(savedObjects.saved_objects.map(async savedObject => {
      const timelineSaveObject = (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)(savedObject);
      return Promise.all([this.note.getNotesByTimelineId(request, timelineSaveObject.savedObjectId), this.pinnedEvent.getAllPinnedEventsByTimelineId(request, timelineSaveObject.savedObjectId), Promise.resolve(timelineSaveObject)]);
    }));
    return {
      totalCount: savedObjects.total,
      timeline: timelinesWithNotesAndPinnedEvents.map(([notes, pinnedEvents, timeline]) => timelineWithReduxProperties(notes, pinnedEvents, timeline, userName))
    };
  }

}

exports.Timeline = Timeline;

const convertStringToBase64 = text => Buffer.from(text).toString('base64'); // we have to use any here because the SavedObjectAttributes interface is like below
// export interface SavedObjectAttributes {
//   [key: string]: SavedObjectAttributes | string | number | boolean | null;
// }
// then this interface does not allow types without index signature
// this is limiting us with our type for now so the easy way was to use any


exports.convertStringToBase64 = convertStringToBase64;

const timelineWithReduxProperties = (notes, pinnedEvents, timeline, userName) => ({ ...timeline,
  favorite: timeline.favorite != null && userName != null ? timeline.favorite.filter(fav => fav.userName === userName) : [],
  eventIdToNoteIds: notes.filter(note => note.eventId != null),
  noteIds: notes.filter(note => note.eventId == null && note.noteId != null).map(note => note.noteId),
  notes,
  pinnedEventIds: pinnedEvents.map(pinnedEvent => pinnedEvent.eventId),
  pinnedEventsSaveObject: pinnedEvents
});

exports.timelineWithReduxProperties = timelineWithReduxProperties;