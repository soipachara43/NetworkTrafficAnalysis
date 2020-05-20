"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteSavedObjectToReturnRuntimeType = exports.NoteSavedObjectRuntimeType = exports.SavedNoteRuntimeType = void 0;

var runtimeTypes = _interopRequireWildcard(require("io-ts"));

var _framework = require("../framework");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/no-empty-interface */

/*
 *  Note Types
 */
const SavedNoteRuntimeType = runtimeTypes.intersection([runtimeTypes.type({
  timelineId: (0, _framework.unionWithNullType)(runtimeTypes.string)
}), runtimeTypes.partial({
  eventId: (0, _framework.unionWithNullType)(runtimeTypes.string),
  note: (0, _framework.unionWithNullType)(runtimeTypes.string),
  created: (0, _framework.unionWithNullType)(runtimeTypes.number),
  createdBy: (0, _framework.unionWithNullType)(runtimeTypes.string),
  updated: (0, _framework.unionWithNullType)(runtimeTypes.number),
  updatedBy: (0, _framework.unionWithNullType)(runtimeTypes.string)
})]);
exports.SavedNoteRuntimeType = SavedNoteRuntimeType;

/**
 * Note Saved object type with metadata
 */
const NoteSavedObjectRuntimeType = runtimeTypes.intersection([runtimeTypes.type({
  id: runtimeTypes.string,
  attributes: SavedNoteRuntimeType,
  version: runtimeTypes.string
}), runtimeTypes.partial({
  noteId: runtimeTypes.string,
  timelineVersion: runtimeTypes.union([runtimeTypes.string, runtimeTypes.null, runtimeTypes.undefined])
})]);
exports.NoteSavedObjectRuntimeType = NoteSavedObjectRuntimeType;
const NoteSavedObjectToReturnRuntimeType = runtimeTypes.intersection([SavedNoteRuntimeType, runtimeTypes.type({
  noteId: runtimeTypes.string,
  version: runtimeTypes.string
}), runtimeTypes.partial({
  timelineVersion: runtimeTypes.union([runtimeTypes.string, runtimeTypes.null, runtimeTypes.undefined])
})]);
exports.NoteSavedObjectToReturnRuntimeType = NoteSavedObjectToReturnRuntimeType;