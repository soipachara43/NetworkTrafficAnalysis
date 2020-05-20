"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickSavedPinnedEvent = exports.convertSavedObjectToSavedPinnedEvent = exports.PinnedEvent = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _fp = require("lodash/fp");

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _constants = require("../../../common/constants");

var _types = require("./types");

var _saved_objects = require("../../saved_objects");

var _pick_saved_timeline = require("../timeline/pick_saved_timeline");

var _convert_saved_object_to_savedtimeline = require("../timeline/convert_saved_object_to_savedtimeline");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class PinnedEvent {
  async deletePinnedEventOnTimeline(request, pinnedEventIds) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    await Promise.all(pinnedEventIds.map(pinnedEventId => savedObjectsClient.delete(_saved_objects.pinnedEventSavedObjectType, pinnedEventId)));
  }

  async deleteAllPinnedEventsOnTimeline(request, timelineId) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    const options = {
      type: _saved_objects.pinnedEventSavedObjectType,
      search: timelineId,
      searchFields: ['timelineId']
    };
    const pinnedEventToBeDeleted = await this.getAllSavedPinnedEvents(request, options);
    await Promise.all(pinnedEventToBeDeleted.map(pinnedEvent => savedObjectsClient.delete(_saved_objects.pinnedEventSavedObjectType, pinnedEvent.pinnedEventId)));
  }

  async getPinnedEvent(request, pinnedEventId) {
    return this.getSavedPinnedEvent(request, pinnedEventId);
  }

  async getAllPinnedEventsByTimelineId(request, timelineId) {
    const options = {
      type: _saved_objects.pinnedEventSavedObjectType,
      search: timelineId,
      searchFields: ['timelineId']
    };
    return this.getAllSavedPinnedEvents(request, options);
  }

  async getAllPinnedEvents(request, pageInfo, search, sort) {
    const options = {
      type: _saved_objects.pinnedEventSavedObjectType,
      perPage: pageInfo != null ? pageInfo.pageSize : undefined,
      page: pageInfo != null ? pageInfo.pageIndex : undefined,
      search: search != null ? search : undefined,
      searchFields: ['timelineId', 'eventId'],
      sortField: sort != null ? sort.sortField : undefined,
      sortOrder: sort != null ? sort.sortOrder : undefined
    };
    return this.getAllSavedPinnedEvents(request, options);
  }

  async persistPinnedEventOnTimeline(request, pinnedEventId, // pinned event saved object id
  eventId, timelineId) {
    const savedObjectsClient = request.context.core.savedObjects.client;

    try {
      if (pinnedEventId == null) {
        const timelineVersionSavedObject = timelineId == null ? await (async () => {
          const timelineResult = (0, _convert_saved_object_to_savedtimeline.convertSavedObjectToSavedTimeline)((await savedObjectsClient.create(_saved_objects.timelineSavedObjectType, (0, _pick_saved_timeline.pickSavedTimeline)(null, {}, request.user || null))));
          timelineId = timelineResult.savedObjectId; // eslint-disable-line no-param-reassign

          return timelineResult.version;
        })() : null;

        if (timelineId != null) {
          const allPinnedEventId = await this.getAllPinnedEventsByTimelineId(request, timelineId);
          const isPinnedAlreadyExisting = allPinnedEventId.filter(pinnedEvent => pinnedEvent.eventId === eventId);

          if (isPinnedAlreadyExisting.length === 0) {
            const savedPinnedEvent = {
              eventId,
              timelineId
            }; // create Pinned Event on Timeline

            return convertSavedObjectToSavedPinnedEvent((await savedObjectsClient.create(_saved_objects.pinnedEventSavedObjectType, pickSavedPinnedEvent(pinnedEventId, savedPinnedEvent, request.user || null))), timelineVersionSavedObject != null ? timelineVersionSavedObject : undefined);
          }

          return isPinnedAlreadyExisting[0];
        }

        throw new Error('You can NOT pinned event without a timelineID');
      } // Delete Pinned Event on Timeline


      await this.deletePinnedEventOnTimeline(request, [pinnedEventId]);
      return null;
    } catch (err) {
      if ((0, _fp.getOr)(null, 'output.statusCode', err) === 404) {
        /*
         * Why we are doing that, because if it is not found for sure that it will be unpinned
         * There is no need to bring back this error since we can assume that it is unpinned
         */
        return null;
      }

      if ((0, _fp.getOr)(null, 'output.statusCode', err) === 403) {
        return pinnedEventId != null ? {
          code: 403,
          message: err.message,
          pinnedEventId: eventId,
          timelineId: '',
          timelineVersion: ''
        } : null;
      }

      throw err;
    }
  }

  async getSavedPinnedEvent(request, pinnedEventId) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    const savedObject = await savedObjectsClient.get(_saved_objects.pinnedEventSavedObjectType, pinnedEventId);
    return convertSavedObjectToSavedPinnedEvent(savedObject);
  }

  async getAllSavedPinnedEvents(request, options) {
    const savedObjectsClient = request.context.core.savedObjects.client;
    const savedObjects = await savedObjectsClient.find(options);
    return savedObjects.saved_objects.map(savedObject => convertSavedObjectToSavedPinnedEvent(savedObject));
  }

}

exports.PinnedEvent = PinnedEvent;

const convertSavedObjectToSavedPinnedEvent = (savedObject, timelineVersion) => (0, _pipeable.pipe)(_types.PinnedEventSavedObjectRuntimeType.decode(savedObject), (0, _Either.map)(savedPinnedEvent => ({
  pinnedEventId: savedPinnedEvent.id,
  version: savedPinnedEvent.version,
  timelineVersion,
  ...savedPinnedEvent.attributes
})), (0, _Either.fold)(errors => {
  throw new Error((0, _PathReporter.failure)(errors).join('\n'));
}, _function.identity)); // we have to use any here because the SavedObjectAttributes interface is like below
// export interface SavedObjectAttributes {
//   [key: string]: SavedObjectAttributes | string | number | boolean | null;
// }
// then this interface does not allow types without index signature
// this is limiting us with our type for now so the easy way was to use any


exports.convertSavedObjectToSavedPinnedEvent = convertSavedObjectToSavedPinnedEvent;

const pickSavedPinnedEvent = (pinnedEventId, savedPinnedEvent, userInfo) => {
  const dateNow = new Date().valueOf();

  if (pinnedEventId == null) {
    var _ref, _ref2;

    savedPinnedEvent.created = dateNow;
    savedPinnedEvent.createdBy = (_ref = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref !== void 0 ? _ref : _constants.UNAUTHENTICATED_USER;
    savedPinnedEvent.updated = dateNow;
    savedPinnedEvent.updatedBy = (_ref2 = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref2 !== void 0 ? _ref2 : _constants.UNAUTHENTICATED_USER;
  } else if (pinnedEventId != null) {
    var _ref3;

    savedPinnedEvent.updated = dateNow;
    savedPinnedEvent.updatedBy = (_ref3 = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) !== null && _ref3 !== void 0 ? _ref3 : _constants.UNAUTHENTICATED_USER;
  }

  return savedPinnedEvent;
};

exports.pickSavedPinnedEvent = pickSavedPinnedEvent;