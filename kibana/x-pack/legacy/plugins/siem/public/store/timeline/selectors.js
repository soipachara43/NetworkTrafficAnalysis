"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFilterQueryDraftValidSelector = exports.getKqlFilterKuerySelector = exports.getKqlFilterQueryDraftSelector = exports.getKqlFilterQuerySelector = exports.getEventsByIdSelector = exports.getTimelineByIdSelector = exports.getTimelines = exports.getShowCallOutUnauthorizedMsg = exports.timelineByIdSelector = exports.autoSaveMsgSelector = exports.selectTimeline = void 0;

var _reselect = require("reselect");

var _keury = require("../../lib/keury");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectTimelineById = function selectTimelineById(state) {
  return state.timeline.timelineById;
};

var selectAutoSaveMsg = function selectAutoSaveMsg(state) {
  return state.timeline.autoSavedWarningMsg;
};

var selectCallOutUnauthorizedMsg = function selectCallOutUnauthorizedMsg(state) {
  return state.timeline.showCallOutUnauthorizedMsg;
};

var selectTimeline = function selectTimeline(state, timelineId) {
  return state.timeline.timelineById[timelineId];
};

exports.selectTimeline = selectTimeline;
var autoSaveMsgSelector = (0, _reselect.createSelector)(selectAutoSaveMsg, function (autoSaveMsg) {
  return autoSaveMsg;
});
exports.autoSaveMsgSelector = autoSaveMsgSelector;
var timelineByIdSelector = (0, _reselect.createSelector)(selectTimelineById, function (timelineById) {
  return timelineById;
});
exports.timelineByIdSelector = timelineByIdSelector;

var getShowCallOutUnauthorizedMsg = function getShowCallOutUnauthorizedMsg() {
  return (0, _reselect.createSelector)(selectCallOutUnauthorizedMsg, function (showCallOutUnauthorizedMsg) {
    return showCallOutUnauthorizedMsg;
  });
};

exports.getShowCallOutUnauthorizedMsg = getShowCallOutUnauthorizedMsg;

var getTimelines = function getTimelines() {
  return timelineByIdSelector;
};

exports.getTimelines = getTimelines;

var getTimelineByIdSelector = function getTimelineByIdSelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline;
  });
};

exports.getTimelineByIdSelector = getTimelineByIdSelector;

var getEventsByIdSelector = function getEventsByIdSelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline;
  });
};

exports.getEventsByIdSelector = getEventsByIdSelector;

var getKqlFilterQuerySelector = function getKqlFilterQuerySelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline && timeline.kqlQuery && timeline.kqlQuery.filterQuery && timeline.kqlQuery.filterQuery.kuery ? timeline.kqlQuery.filterQuery.kuery.expression : null;
  });
};

exports.getKqlFilterQuerySelector = getKqlFilterQuerySelector;

var getKqlFilterQueryDraftSelector = function getKqlFilterQueryDraftSelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline && timeline.kqlQuery ? timeline.kqlQuery.filterQueryDraft : null;
  });
};

exports.getKqlFilterQueryDraftSelector = getKqlFilterQueryDraftSelector;

var getKqlFilterKuerySelector = function getKqlFilterKuerySelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline && timeline.kqlQuery && timeline.kqlQuery.filterQuery && timeline.kqlQuery.filterQuery.kuery ? timeline.kqlQuery.filterQuery.kuery : null;
  });
};

exports.getKqlFilterKuerySelector = getKqlFilterKuerySelector;

var isFilterQueryDraftValidSelector = function isFilterQueryDraftValidSelector() {
  return (0, _reselect.createSelector)(selectTimeline, function (timeline) {
    return timeline && timeline.kqlQuery && (0, _keury.isFromKueryExpressionValid)(timeline.kqlQuery.filterQueryDraft);
  });
};

exports.isFilterQueryDraftValidSelector = isFilterQueryDraftValidSelector;