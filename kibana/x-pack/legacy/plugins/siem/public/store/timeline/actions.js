"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEventType = exports.clearEventsDeleted = exports.setEventsDeleted = exports.clearEventsLoading = exports.setEventsLoading = exports.clearSelected = exports.setSelected = exports.setFilters = exports.setSavedQueryId = exports.showCallOutUnauthorizedMsg = exports.updateAutoSaveMsg = exports.updateSort = exports.updateRange = exports.updateProviders = exports.updatePageIndex = exports.updateTitle = exports.updateItemsPerPageOptions = exports.updateItemsPerPage = exports.updateIsLive = exports.updateIsFavorite = exports.applyKqlFilterQuery = exports.setKqlFilterQueryDraft = exports.updateKqlMode = exports.updateDescription = exports.updateHighlightedDropAndProviderId = exports.updateDataProviderKqlQuery = exports.dataProviderEdited = exports.updateDataProviderExcluded = exports.updateDataProviderEnabled = exports.updateColumns = exports.updateIsLoading = exports.endTimelineSaving = exports.startTimelineSaving = exports.addTimeline = exports.updateTimeline = exports.unPinEvent = exports.showTimeline = exports.removeProvider = exports.removeColumn = exports.pinEvent = exports.createTimeline = exports.applyDeltaToColumnWidth = exports.applyDeltaToWidth = exports.addProvider = exports.upsertColumn = exports.addNoteToEvent = exports.addNote = exports.addHistory = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/siem/local/timeline');
var addHistory = actionCreator('ADD_HISTORY');
exports.addHistory = addHistory;
var addNote = actionCreator('ADD_NOTE');
exports.addNote = addNote;
var addNoteToEvent = actionCreator('ADD_NOTE_TO_EVENT');
exports.addNoteToEvent = addNoteToEvent;
var upsertColumn = actionCreator('UPSERT_COLUMN');
exports.upsertColumn = upsertColumn;
var addProvider = actionCreator('ADD_PROVIDER');
exports.addProvider = addProvider;
var applyDeltaToWidth = actionCreator('APPLY_DELTA_TO_WIDTH');
exports.applyDeltaToWidth = applyDeltaToWidth;
var applyDeltaToColumnWidth = actionCreator('APPLY_DELTA_TO_COLUMN_WIDTH');
exports.applyDeltaToColumnWidth = applyDeltaToColumnWidth;
var createTimeline = actionCreator('CREATE_TIMELINE');
exports.createTimeline = createTimeline;
var pinEvent = actionCreator('PIN_EVENT');
exports.pinEvent = pinEvent;
var removeColumn = actionCreator('REMOVE_COLUMN');
exports.removeColumn = removeColumn;
var removeProvider = actionCreator('REMOVE_PROVIDER');
exports.removeProvider = removeProvider;
var showTimeline = actionCreator('SHOW_TIMELINE');
exports.showTimeline = showTimeline;
var unPinEvent = actionCreator('UN_PIN_EVENT');
exports.unPinEvent = unPinEvent;
var updateTimeline = actionCreator('UPDATE_TIMELINE');
exports.updateTimeline = updateTimeline;
var addTimeline = actionCreator('ADD_TIMELINE');
exports.addTimeline = addTimeline;
var startTimelineSaving = actionCreator('START_TIMELINE_SAVING');
exports.startTimelineSaving = startTimelineSaving;
var endTimelineSaving = actionCreator('END_TIMELINE_SAVING');
exports.endTimelineSaving = endTimelineSaving;
var updateIsLoading = actionCreator('UPDATE_LOADING');
exports.updateIsLoading = updateIsLoading;
var updateColumns = actionCreator('UPDATE_COLUMNS');
exports.updateColumns = updateColumns;
var updateDataProviderEnabled = actionCreator('TOGGLE_PROVIDER_ENABLED');
exports.updateDataProviderEnabled = updateDataProviderEnabled;
var updateDataProviderExcluded = actionCreator('TOGGLE_PROVIDER_EXCLUDED');
exports.updateDataProviderExcluded = updateDataProviderExcluded;
var dataProviderEdited = actionCreator('DATA_PROVIDER_EDITED');
exports.dataProviderEdited = dataProviderEdited;
var updateDataProviderKqlQuery = actionCreator('PROVIDER_EDIT_KQL_QUERY');
exports.updateDataProviderKqlQuery = updateDataProviderKqlQuery;
var updateHighlightedDropAndProviderId = actionCreator('UPDATE_DROP_AND_PROVIDER');
exports.updateHighlightedDropAndProviderId = updateHighlightedDropAndProviderId;
var updateDescription = actionCreator('UPDATE_DESCRIPTION');
exports.updateDescription = updateDescription;
var updateKqlMode = actionCreator('UPDATE_KQL_MODE');
exports.updateKqlMode = updateKqlMode;
var setKqlFilterQueryDraft = actionCreator('SET_KQL_FILTER_QUERY_DRAFT');
exports.setKqlFilterQueryDraft = setKqlFilterQueryDraft;
var applyKqlFilterQuery = actionCreator('APPLY_KQL_FILTER_QUERY');
exports.applyKqlFilterQuery = applyKqlFilterQuery;
var updateIsFavorite = actionCreator('UPDATE_IS_FAVORITE');
exports.updateIsFavorite = updateIsFavorite;
var updateIsLive = actionCreator('UPDATE_IS_LIVE');
exports.updateIsLive = updateIsLive;
var updateItemsPerPage = actionCreator('UPDATE_ITEMS_PER_PAGE');
exports.updateItemsPerPage = updateItemsPerPage;
var updateItemsPerPageOptions = actionCreator('UPDATE_ITEMS_PER_PAGE_OPTIONS');
exports.updateItemsPerPageOptions = updateItemsPerPageOptions;
var updateTitle = actionCreator('UPDATE_TITLE');
exports.updateTitle = updateTitle;
var updatePageIndex = actionCreator('UPDATE_PAGE_INDEX');
exports.updatePageIndex = updatePageIndex;
var updateProviders = actionCreator('UPDATE_PROVIDERS');
exports.updateProviders = updateProviders;
var updateRange = actionCreator('UPDATE_RANGE');
exports.updateRange = updateRange;
var updateSort = actionCreator('UPDATE_SORT');
exports.updateSort = updateSort;
var updateAutoSaveMsg = actionCreator('UPDATE_AUTO_SAVE');
exports.updateAutoSaveMsg = updateAutoSaveMsg;
var showCallOutUnauthorizedMsg = actionCreator('SHOW_CALL_OUT_UNAUTHORIZED_MSG');
exports.showCallOutUnauthorizedMsg = showCallOutUnauthorizedMsg;
var setSavedQueryId = actionCreator('SET_TIMELINE_SAVED_QUERY');
exports.setSavedQueryId = setSavedQueryId;
var setFilters = actionCreator('SET_TIMELINE_FILTERS');
exports.setFilters = setFilters;
var setSelected = actionCreator('SET_TIMELINE_SELECTED');
exports.setSelected = setSelected;
var clearSelected = actionCreator('CLEAR_TIMELINE_SELECTED');
exports.clearSelected = clearSelected;
var setEventsLoading = actionCreator('SET_TIMELINE_EVENTS_LOADING');
exports.setEventsLoading = setEventsLoading;
var clearEventsLoading = actionCreator('CLEAR_TIMELINE_EVENTS_LOADING');
exports.clearEventsLoading = clearEventsLoading;
var setEventsDeleted = actionCreator('SET_TIMELINE_EVENTS_DELETED');
exports.setEventsDeleted = setEventsDeleted;
var clearEventsDeleted = actionCreator('CLEAR_TIMELINE_EVENTS_DELETED');
exports.clearEventsDeleted = clearEventsDeleted;
var updateEventType = actionCreator('UPDATE_EVENT_TYPE');
exports.updateEventType = updateEventType;