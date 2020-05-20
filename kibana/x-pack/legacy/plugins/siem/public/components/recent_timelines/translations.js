"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_ALL_TIMELINES = exports.UNTITLED_TIMELINE = exports.PINNED_EVENTS = exports.OPEN_AS_DUPLICATE = exports.NOTES = exports.NO_TIMELINES = exports.LAST_UPDATED = exports.NO_FAVORITE_TIMELINES = exports.FAVORITES = exports.ERROR_RETRIEVING_USER_DETAILS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ERROR_RETRIEVING_USER_DETAILS = _i18n.i18n.translate('xpack.siem.recentTimelines.errorRetrievingUserDetailsMessage', {
  defaultMessage: 'Recent Timelines: An error occurred while retrieving user details'
});

exports.ERROR_RETRIEVING_USER_DETAILS = ERROR_RETRIEVING_USER_DETAILS;

var FAVORITES = _i18n.i18n.translate('xpack.siem.recentTimelines.favoritesButtonLabel', {
  defaultMessage: 'Favorites'
});

exports.FAVORITES = FAVORITES;

var NO_FAVORITE_TIMELINES = _i18n.i18n.translate('xpack.siem.recentTimelines.noFavoriteTimelinesMessage', {
  defaultMessage: "You haven't favorited any timelines yet. Get out there and start threat hunting!"
});

exports.NO_FAVORITE_TIMELINES = NO_FAVORITE_TIMELINES;

var LAST_UPDATED = _i18n.i18n.translate('xpack.siem.recentTimelines.lastUpdatedButtonLabel', {
  defaultMessage: 'Last updated'
});

exports.LAST_UPDATED = LAST_UPDATED;

var NO_TIMELINES = _i18n.i18n.translate('xpack.siem.recentTimelines.noTimelinesMessage', {
  defaultMessage: "You haven't created any timelines yet. Get out there and start threat hunting!"
});

exports.NO_TIMELINES = NO_TIMELINES;

var NOTES = _i18n.i18n.translate('xpack.siem.recentTimelines.notesTooltip', {
  defaultMessage: 'Notes'
});

exports.NOTES = NOTES;

var OPEN_AS_DUPLICATE = _i18n.i18n.translate('xpack.siem.recentTimelines.openAsDuplicateTooltip', {
  defaultMessage: 'Open as a duplicate timeline'
});

exports.OPEN_AS_DUPLICATE = OPEN_AS_DUPLICATE;

var PINNED_EVENTS = _i18n.i18n.translate('xpack.siem.recentTimelines.pinnedEventsTooltip', {
  defaultMessage: 'Pinned events'
});

exports.PINNED_EVENTS = PINNED_EVENTS;

var UNTITLED_TIMELINE = _i18n.i18n.translate('xpack.siem.recentTimelines.untitledTimelineLabel', {
  defaultMessage: 'Untitled timeline'
});

exports.UNTITLED_TIMELINE = UNTITLED_TIMELINE;

var VIEW_ALL_TIMELINES = _i18n.i18n.translate('xpack.siem.recentTimelines.viewAllTimelinesLink', {
  defaultMessage: 'View all timelines'
});

exports.VIEW_ALL_TIMELINES = VIEW_ALL_TIMELINES;