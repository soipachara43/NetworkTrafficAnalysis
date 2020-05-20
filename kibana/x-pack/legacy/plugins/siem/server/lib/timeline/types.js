"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllTimelineSavedObjectRuntimeType = exports.TimelineSavedToReturnObjectRuntimeType = exports.TimelineSavedObjectRuntimeType = exports.SavedTimelineRuntimeType = void 0;

var runtimeTypes = _interopRequireWildcard(require("io-ts"));

var _framework = require("../framework");

var _types = require("../note/types");

var _types2 = require("../pinned_event/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/no-empty-interface */

/*
 *  ColumnHeader Types
 */
const SavedColumnHeaderRuntimeType = runtimeTypes.partial({
  aggregatable: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  category: (0, _framework.unionWithNullType)(runtimeTypes.string),
  columnHeaderType: (0, _framework.unionWithNullType)(runtimeTypes.string),
  description: (0, _framework.unionWithNullType)(runtimeTypes.string),
  example: (0, _framework.unionWithNullType)(runtimeTypes.string),
  indexes: (0, _framework.unionWithNullType)(runtimeTypes.array(runtimeTypes.string)),
  id: (0, _framework.unionWithNullType)(runtimeTypes.string),
  name: (0, _framework.unionWithNullType)(runtimeTypes.string),
  placeholder: (0, _framework.unionWithNullType)(runtimeTypes.string),
  searchable: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  type: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
/*
 *  DataProvider Types
 */

const SavedDataProviderQueryMatchBasicRuntimeType = runtimeTypes.partial({
  field: (0, _framework.unionWithNullType)(runtimeTypes.string),
  displayField: (0, _framework.unionWithNullType)(runtimeTypes.string),
  value: (0, _framework.unionWithNullType)(runtimeTypes.string),
  displayValue: (0, _framework.unionWithNullType)(runtimeTypes.string),
  operator: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
const SavedDataProviderQueryMatchRuntimeType = runtimeTypes.partial({
  id: (0, _framework.unionWithNullType)(runtimeTypes.string),
  name: (0, _framework.unionWithNullType)(runtimeTypes.string),
  enabled: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  excluded: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  kqlQuery: (0, _framework.unionWithNullType)(runtimeTypes.string),
  queryMatch: (0, _framework.unionWithNullType)(SavedDataProviderQueryMatchBasicRuntimeType)
});
const SavedDataProviderRuntimeType = runtimeTypes.partial({
  id: (0, _framework.unionWithNullType)(runtimeTypes.string),
  name: (0, _framework.unionWithNullType)(runtimeTypes.string),
  enabled: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  excluded: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  kqlQuery: (0, _framework.unionWithNullType)(runtimeTypes.string),
  queryMatch: (0, _framework.unionWithNullType)(SavedDataProviderQueryMatchBasicRuntimeType),
  and: (0, _framework.unionWithNullType)(runtimeTypes.array(SavedDataProviderQueryMatchRuntimeType))
});
/*
 *  Filters Types
 */

const SavedFilterMetaRuntimeType = runtimeTypes.partial({
  alias: (0, _framework.unionWithNullType)(runtimeTypes.string),
  controlledBy: (0, _framework.unionWithNullType)(runtimeTypes.string),
  disabled: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  field: (0, _framework.unionWithNullType)(runtimeTypes.string),
  formattedValue: (0, _framework.unionWithNullType)(runtimeTypes.string),
  index: (0, _framework.unionWithNullType)(runtimeTypes.string),
  key: (0, _framework.unionWithNullType)(runtimeTypes.string),
  negate: (0, _framework.unionWithNullType)(runtimeTypes.boolean),
  params: (0, _framework.unionWithNullType)(runtimeTypes.string),
  type: (0, _framework.unionWithNullType)(runtimeTypes.string),
  value: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
const SavedFilterRuntimeType = runtimeTypes.partial({
  exists: (0, _framework.unionWithNullType)(runtimeTypes.string),
  meta: (0, _framework.unionWithNullType)(SavedFilterMetaRuntimeType),
  match_all: (0, _framework.unionWithNullType)(runtimeTypes.string),
  missing: (0, _framework.unionWithNullType)(runtimeTypes.string),
  query: (0, _framework.unionWithNullType)(runtimeTypes.string),
  range: (0, _framework.unionWithNullType)(runtimeTypes.string),
  script: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
/*
 *  kqlQuery -> filterQuery Types
 */

const SavedKueryFilterQueryRuntimeType = runtimeTypes.partial({
  kind: (0, _framework.unionWithNullType)(runtimeTypes.string),
  expression: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
const SavedSerializedFilterQueryQueryRuntimeType = runtimeTypes.partial({
  kuery: (0, _framework.unionWithNullType)(SavedKueryFilterQueryRuntimeType),
  serializedQuery: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
const SavedFilterQueryQueryRuntimeType = runtimeTypes.partial({
  filterQuery: (0, _framework.unionWithNullType)(SavedSerializedFilterQueryQueryRuntimeType)
});
/*
 *  DatePicker Range Types
 */

const SavedDateRangePickerRuntimeType = runtimeTypes.partial({
  start: (0, _framework.unionWithNullType)(runtimeTypes.number),
  end: (0, _framework.unionWithNullType)(runtimeTypes.number)
});
/*
 *  Favorite Types
 */

const SavedFavoriteRuntimeType = runtimeTypes.partial({
  keySearch: (0, _framework.unionWithNullType)(runtimeTypes.string),
  favoriteDate: (0, _framework.unionWithNullType)(runtimeTypes.number),
  fullName: (0, _framework.unionWithNullType)(runtimeTypes.string),
  userName: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
/*
 *  Sort Types
 */

const SavedSortRuntimeType = runtimeTypes.partial({
  columnId: (0, _framework.unionWithNullType)(runtimeTypes.string),
  sortDirection: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
/*
 *  Timeline Types
 */

const SavedTimelineRuntimeType = runtimeTypes.partial({
  columns: (0, _framework.unionWithNullType)(runtimeTypes.array(SavedColumnHeaderRuntimeType)),
  dataProviders: (0, _framework.unionWithNullType)(runtimeTypes.array(SavedDataProviderRuntimeType)),
  description: (0, _framework.unionWithNullType)(runtimeTypes.string),
  eventType: (0, _framework.unionWithNullType)(runtimeTypes.string),
  favorite: (0, _framework.unionWithNullType)(runtimeTypes.array(SavedFavoriteRuntimeType)),
  filters: (0, _framework.unionWithNullType)(runtimeTypes.array(SavedFilterRuntimeType)),
  kqlMode: (0, _framework.unionWithNullType)(runtimeTypes.string),
  kqlQuery: (0, _framework.unionWithNullType)(SavedFilterQueryQueryRuntimeType),
  title: (0, _framework.unionWithNullType)(runtimeTypes.string),
  dateRange: (0, _framework.unionWithNullType)(SavedDateRangePickerRuntimeType),
  savedQueryId: (0, _framework.unionWithNullType)(runtimeTypes.string),
  sort: (0, _framework.unionWithNullType)(SavedSortRuntimeType),
  created: (0, _framework.unionWithNullType)(runtimeTypes.number),
  createdBy: (0, _framework.unionWithNullType)(runtimeTypes.string),
  updated: (0, _framework.unionWithNullType)(runtimeTypes.number),
  updatedBy: (0, _framework.unionWithNullType)(runtimeTypes.string)
});
exports.SavedTimelineRuntimeType = SavedTimelineRuntimeType;

/**
 * Timeline Saved object type with metadata
 */
const TimelineSavedObjectRuntimeType = runtimeTypes.intersection([runtimeTypes.type({
  id: runtimeTypes.string,
  attributes: SavedTimelineRuntimeType,
  version: runtimeTypes.string
}), runtimeTypes.partial({
  savedObjectId: runtimeTypes.string
})]);
exports.TimelineSavedObjectRuntimeType = TimelineSavedObjectRuntimeType;
const TimelineSavedToReturnObjectRuntimeType = runtimeTypes.intersection([SavedTimelineRuntimeType, runtimeTypes.type({
  savedObjectId: runtimeTypes.string,
  version: runtimeTypes.string
}), runtimeTypes.partial({
  eventIdToNoteIds: runtimeTypes.array(_types.NoteSavedObjectToReturnRuntimeType),
  noteIds: runtimeTypes.array(runtimeTypes.string),
  notes: runtimeTypes.array(_types.NoteSavedObjectToReturnRuntimeType),
  pinnedEventIds: runtimeTypes.array(runtimeTypes.string),
  pinnedEventsSaveObject: runtimeTypes.array(_types2.PinnedEventToReturnSavedObjectRuntimeType)
})]);
exports.TimelineSavedToReturnObjectRuntimeType = TimelineSavedToReturnObjectRuntimeType;

/**
 * All Timeline Saved object type with metadata
 */
const AllTimelineSavedObjectRuntimeType = runtimeTypes.type({
  total: runtimeTypes.number,
  data: TimelineSavedToReturnObjectRuntimeType
});
exports.AllTimelineSavedObjectRuntimeType = AllTimelineSavedObjectRuntimeType;