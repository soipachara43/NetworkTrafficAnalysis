"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = void 0;

var _react = _interopRequireDefault(require("react"));

var _scheduler = require("../../../../lib/helpers/scheduler");

var _styles = require("../../styles");

var _stateful_event = require("./stateful_event");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EventsComponent = function EventsComponent(_ref) {
  var actionsColumnWidth = _ref.actionsColumnWidth,
      addNoteToEvent = _ref.addNoteToEvent,
      browserFields = _ref.browserFields,
      columnHeaders = _ref.columnHeaders,
      columnRenderers = _ref.columnRenderers,
      containerElementRef = _ref.containerElementRef,
      data = _ref.data,
      eventIdToNoteIds = _ref.eventIdToNoteIds,
      getNotesByIds = _ref.getNotesByIds,
      id = _ref.id,
      _ref$isEventViewer = _ref.isEventViewer,
      isEventViewer = _ref$isEventViewer === void 0 ? false : _ref$isEventViewer,
      loadingEventIds = _ref.loadingEventIds,
      onColumnResized = _ref.onColumnResized,
      onPinEvent = _ref.onPinEvent,
      onRowSelected = _ref.onRowSelected,
      onUpdateColumns = _ref.onUpdateColumns,
      onUnPinEvent = _ref.onUnPinEvent,
      pinnedEventIds = _ref.pinnedEventIds,
      rowRenderers = _ref.rowRenderers,
      selectedEventIds = _ref.selectedEventIds,
      showCheckboxes = _ref.showCheckboxes,
      toggleColumn = _ref.toggleColumn,
      updateNote = _ref.updateNote;
  return _react.default.createElement(_styles.EventsTbody, {
    "data-test-subj": "events"
  }, data.map(function (event, i) {
    return _react.default.createElement(_stateful_event.StatefulEvent, {
      containerElementRef: containerElementRef,
      actionsColumnWidth: actionsColumnWidth,
      addNoteToEvent: addNoteToEvent,
      browserFields: browserFields,
      columnHeaders: columnHeaders,
      columnRenderers: columnRenderers,
      event: event,
      eventIdToNoteIds: eventIdToNoteIds,
      getNotesByIds: getNotesByIds,
      isEventPinned: (0, _helpers.eventIsPinned)({
        eventId: event._id,
        pinnedEventIds: pinnedEventIds
      }),
      isEventViewer: isEventViewer,
      key: "".concat(event._id, "_").concat(event._index),
      loadingEventIds: loadingEventIds,
      maxDelay: (0, _scheduler.maxDelay)(i),
      onColumnResized: onColumnResized,
      onPinEvent: onPinEvent,
      onRowSelected: onRowSelected,
      onUnPinEvent: onUnPinEvent,
      onUpdateColumns: onUpdateColumns,
      rowRenderers: rowRenderers,
      selectedEventIds: selectedEventIds,
      showCheckboxes: showCheckboxes,
      timelineId: id,
      toggleColumn: toggleColumn,
      updateNote: updateNote
    });
  }));
};

var Events = _react.default.memo(EventsComponent);

exports.Events = Events;