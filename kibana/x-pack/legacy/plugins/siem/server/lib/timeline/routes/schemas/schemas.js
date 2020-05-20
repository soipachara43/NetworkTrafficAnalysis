"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.file_name = exports.exclude_export_details = exports.ids = exports.sort = exports.pinnedEventIds = exports.kqlQuery = exports.kqlMode = exports.globalNotes = exports.eventNotes = exports.favorite = exports.dateRange = exports.dataProviders = exports.columns = exports.version = exports.updatedBy = exports.updated = exports.title = exports.timelineId = exports.savedObjectId = exports.savedQueryId = exports.start = exports.note = exports.noteId = exports.filters = exports.eventType = exports.eventId = exports.end = exports.description = exports.createdBy = exports.created = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const allowEmptyString = _joi.default.string().allow([null, '']);

const columnHeaderType = allowEmptyString;

const created = _joi.default.number().allow(null);

exports.created = created;
const createdBy = allowEmptyString;
exports.createdBy = createdBy;
const description = allowEmptyString;
exports.description = description;

const end = _joi.default.number();

exports.end = end;
const eventId = allowEmptyString;
exports.eventId = eventId;
const eventType = allowEmptyString;
exports.eventType = eventType;

const filters = _joi.default.array().items(_joi.default.object({
  meta: _joi.default.object({
    alias: allowEmptyString,
    controlledBy: allowEmptyString,
    disabled: _joi.default.boolean().allow(null),
    field: allowEmptyString,
    formattedValue: allowEmptyString,
    index: allowEmptyString,
    key: allowEmptyString,
    negate: _joi.default.boolean().allow(null),
    params: allowEmptyString,
    type: allowEmptyString,
    value: allowEmptyString
  }),
  exists: allowEmptyString,
  match_all: allowEmptyString,
  missing: allowEmptyString,
  query: allowEmptyString,
  range: allowEmptyString,
  script: allowEmptyString
})).allow(null);

exports.filters = filters;
const name = allowEmptyString;
const noteId = allowEmptyString;
exports.noteId = noteId;
const note = allowEmptyString;
exports.note = note;

const start = _joi.default.number();

exports.start = start;
const savedQueryId = allowEmptyString;
exports.savedQueryId = savedQueryId;
const savedObjectId = allowEmptyString;
exports.savedObjectId = savedObjectId;
const timelineId = allowEmptyString;
exports.timelineId = timelineId;
const title = allowEmptyString;
exports.title = title;

const updated = _joi.default.number().allow(null);

exports.updated = updated;
const updatedBy = allowEmptyString;
exports.updatedBy = updatedBy;
const version = allowEmptyString;
exports.version = version;

const columns = _joi.default.array().items(_joi.default.object({
  aggregatable: _joi.default.boolean().allow(null),
  category: allowEmptyString,
  columnHeaderType,
  description,
  example: allowEmptyString,
  indexes: allowEmptyString,
  id: allowEmptyString,
  name,
  placeholder: allowEmptyString,
  searchable: _joi.default.boolean().allow(null),
  type: allowEmptyString
}).required());

exports.columns = columns;

const dataProviders = _joi.default.array().items(_joi.default.object({
  id: allowEmptyString,
  name: allowEmptyString,
  enabled: _joi.default.boolean().allow(null),
  excluded: _joi.default.boolean().allow(null),
  kqlQuery: allowEmptyString,
  queryMatch: _joi.default.object({
    field: allowEmptyString,
    displayField: allowEmptyString,
    value: allowEmptyString,
    displayValue: allowEmptyString,
    operator: allowEmptyString
  }),
  and: _joi.default.array().items(_joi.default.object({
    id: allowEmptyString,
    name,
    enabled: _joi.default.boolean().allow(null),
    excluded: _joi.default.boolean().allow(null),
    kqlQuery: allowEmptyString,
    queryMatch: _joi.default.object({
      field: allowEmptyString,
      displayField: allowEmptyString,
      value: allowEmptyString,
      displayValue: allowEmptyString,
      operator: allowEmptyString
    }).allow(null)
  })).allow(null)
})).allow(null);

exports.dataProviders = dataProviders;

const dateRange = _joi.default.object({
  start,
  end
});

exports.dateRange = dateRange;

const favorite = _joi.default.array().items(_joi.default.object({
  keySearch: allowEmptyString,
  fullName: allowEmptyString,
  userName: allowEmptyString,
  favoriteDate: _joi.default.number()
}).allow(null));

exports.favorite = favorite;

const noteItem = _joi.default.object({
  noteId,
  version,
  eventId,
  note,
  timelineId,
  created,
  createdBy,
  updated,
  updatedBy
});

const eventNotes = _joi.default.array().items(noteItem);

exports.eventNotes = eventNotes;

const globalNotes = _joi.default.array().items(noteItem);

exports.globalNotes = globalNotes;
const kqlMode = allowEmptyString;
exports.kqlMode = kqlMode;

const kqlQuery = _joi.default.object({
  filterQuery: _joi.default.object({
    kuery: _joi.default.object({
      kind: allowEmptyString,
      expression: allowEmptyString
    }).allow(null),
    serializedQuery: allowEmptyString
  }).allow(null)
});

exports.kqlQuery = kqlQuery;

const pinnedEventIds = _joi.default.array().items(allowEmptyString).allow(null);

exports.pinnedEventIds = pinnedEventIds;

const sort = _joi.default.object({
  columnId: allowEmptyString,
  sortDirection: allowEmptyString
});
/* eslint-disable @typescript-eslint/camelcase */


exports.sort = sort;

const ids = _joi.default.array().items(allowEmptyString);

exports.ids = ids;

const exclude_export_details = _joi.default.boolean();

exports.exclude_export_details = exclude_export_details;
const file_name = allowEmptyString;
exports.file_name = file_name;