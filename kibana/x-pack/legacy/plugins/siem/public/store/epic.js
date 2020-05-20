"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRootEpic = void 0;

var _reduxObservable = require("redux-observable");

var _epic = require("./timeline/epic");

var _epic_favorite = require("./timeline/epic_favorite");

var _epic_note = require("./timeline/epic_note");

var _epic_pinned_event = require("./timeline/epic_pinned_event");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createRootEpic = function createRootEpic() {
  return (0, _reduxObservable.combineEpics)((0, _epic.createTimelineEpic)(), (0, _epic_favorite.createTimelineFavoriteEpic)(), (0, _epic_note.createTimelineNoteEpic)(), (0, _epic_pinned_event.createTimelinePinnedEventEpic)());
};

exports.createRootEpic = createRootEpic;