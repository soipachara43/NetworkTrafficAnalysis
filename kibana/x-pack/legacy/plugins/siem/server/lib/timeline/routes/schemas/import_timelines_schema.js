"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importTimelinesSchema = exports.importTimelinesPayloadSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _schemas = require("./schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const importTimelinesPayloadSchema = _joi.default.object({
  file: _joi.default.object().required()
});

exports.importTimelinesPayloadSchema = importTimelinesPayloadSchema;

const importTimelinesSchema = _joi.default.object({
  columns: _schemas.columns,
  created: _schemas.created,
  createdBy: _schemas.createdBy,
  dataProviders: _schemas.dataProviders,
  dateRange: _schemas.dateRange,
  description: _schemas.description,
  eventNotes: _schemas.eventNotes,
  eventType: _schemas.eventType,
  filters: _schemas.filters,
  favorite: _schemas.favorite,
  globalNotes: _schemas.globalNotes,
  kqlMode: _schemas.kqlMode,
  kqlQuery: _schemas.kqlQuery,
  savedObjectId: _schemas.savedObjectId,
  savedQueryId: _schemas.savedQueryId,
  sort: _schemas.sort,
  title: _schemas.title,
  updated: _schemas.updated,
  updatedBy: _schemas.updatedBy,
  version: _schemas.version,
  pinnedEventIds: _schemas.pinnedEventIds
});

exports.importTimelinesSchema = importTimelinesSchema;