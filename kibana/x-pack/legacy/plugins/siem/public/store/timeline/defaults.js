"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelineDefaults = void 0;

var _types = require("../../graphql/types");

var _constants = require("../../components/timeline/body/constants");

var _default_headers = require("../../components/timeline/body/column_headers/default_headers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var timelineDefaults = {
  columns: _default_headers.defaultHeaders,
  dataProviders: [],
  deletedEventIds: [],
  description: '',
  eventType: 'all',
  eventIdToNoteIds: {},
  highlightedDropAndProviderId: '',
  historyIds: [],
  filters: [],
  isFavorite: false,
  isLive: false,
  isSelectAllChecked: false,
  isLoading: false,
  isSaving: false,
  itemsPerPage: 25,
  itemsPerPageOptions: [10, 25, 50, 100],
  kqlMode: 'filter',
  kqlQuery: {
    filterQuery: null,
    filterQueryDraft: null
  },
  loadingEventIds: [],
  title: '',
  noteIds: [],
  pinnedEventIds: {},
  pinnedEventsSaveObject: {},
  dateRange: {
    start: 0,
    end: 0
  },
  savedObjectId: null,
  selectedEventIds: {},
  show: false,
  showCheckboxes: false,
  showRowRenderers: true,
  sort: {
    columnId: '@timestamp',
    sortDirection: _types.Direction.desc
  },
  width: _constants.DEFAULT_TIMELINE_WIDTH,
  version: null
};
exports.timelineDefaults = timelineDefaults;