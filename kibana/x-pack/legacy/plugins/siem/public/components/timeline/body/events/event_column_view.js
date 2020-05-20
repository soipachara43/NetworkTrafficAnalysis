"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventColumnView = exports.getNewNoteId = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _styles = require("../../styles");

var _actions = require("../actions");

var _data_driven_columns = require("../data_driven_columns");

var _helpers = require("../helpers");

var _timeline_context = require("../../timeline_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getNewNoteId = function getNewNoteId() {
  return _uuid.default.v4();
};

exports.getNewNoteId = getNewNoteId;
var emptyNotes = [];

var EventColumnView = _react.default.memo(function (_ref) {
  var id = _ref.id,
      actionsColumnWidth = _ref.actionsColumnWidth,
      associateNote = _ref.associateNote,
      columnHeaders = _ref.columnHeaders,
      columnRenderers = _ref.columnRenderers,
      data = _ref.data,
      ecsData = _ref.ecsData,
      eventIdToNoteIds = _ref.eventIdToNoteIds,
      expanded = _ref.expanded,
      getNotesByIds = _ref.getNotesByIds,
      _ref$isEventPinned = _ref.isEventPinned,
      isEventPinned = _ref$isEventPinned === void 0 ? false : _ref$isEventPinned,
      _ref$isEventViewer = _ref.isEventViewer,
      isEventViewer = _ref$isEventViewer === void 0 ? false : _ref$isEventViewer,
      loading = _ref.loading,
      loadingEventIds = _ref.loadingEventIds,
      onColumnResized = _ref.onColumnResized,
      onEventToggled = _ref.onEventToggled,
      onPinEvent = _ref.onPinEvent,
      onRowSelected = _ref.onRowSelected,
      onUnPinEvent = _ref.onUnPinEvent,
      selectedEventIds = _ref.selectedEventIds,
      showCheckboxes = _ref.showCheckboxes,
      showNotes = _ref.showNotes,
      timelineId = _ref.timelineId,
      toggleShowNotes = _ref.toggleShowNotes,
      updateNote = _ref.updateNote;
  var timelineTypeContext = (0, _timeline_context.useTimelineTypeContext)();
  var additionalActions = (0, _react.useMemo)(function () {
    var _ref2, _timelineTypeContext$;

    return (_ref2 = (_timelineTypeContext$ = timelineTypeContext.timelineActions) === null || _timelineTypeContext$ === void 0 ? void 0 : _timelineTypeContext$.map(function (action) {
      return _react.default.createElement(_styles.EventsTdContent, {
        key: action.id,
        textAlign: "center"
      }, action.getAction({
        eventId: id,
        ecsData: ecsData
      }));
    })) !== null && _ref2 !== void 0 ? _ref2 : [];
  }, [ecsData, timelineTypeContext.timelineActions]);
  return _react.default.createElement(_styles.EventsTrData, {
    "data-test-subj": "event-column-view"
  }, _react.default.createElement(_actions.Actions, {
    actionsColumnWidth: actionsColumnWidth,
    additionalActions: additionalActions,
    associateNote: associateNote,
    checked: Object.keys(selectedEventIds).includes(id),
    onRowSelected: onRowSelected,
    expanded: expanded,
    "data-test-subj": "actions",
    eventId: id,
    eventIsPinned: isEventPinned,
    getNotesByIds: getNotesByIds,
    isEventViewer: isEventViewer,
    loading: loading,
    loadingEventIds: loadingEventIds,
    noteIds: eventIdToNoteIds[id] || emptyNotes,
    onEventToggled: onEventToggled,
    onPinClicked: (0, _helpers.getPinOnClick)({
      allowUnpinning: !(0, _helpers.eventHasNotes)(eventIdToNoteIds[id]),
      eventId: id,
      onPinEvent: onPinEvent,
      onUnPinEvent: onUnPinEvent,
      isEventPinned: isEventPinned
    }),
    showCheckboxes: showCheckboxes,
    showNotes: showNotes,
    toggleShowNotes: toggleShowNotes,
    updateNote: updateNote
  }), _react.default.createElement(_data_driven_columns.DataDrivenColumns, {
    _id: id,
    columnHeaders: columnHeaders,
    columnRenderers: columnRenderers,
    data: data,
    ecsData: ecsData,
    onColumnResized: onColumnResized,
    timelineId: timelineId
  }));
}, function (prevProps, nextProps) {
  return prevProps.id === nextProps.id && prevProps.actionsColumnWidth === nextProps.actionsColumnWidth && prevProps.columnHeaders === nextProps.columnHeaders && prevProps.columnRenderers === nextProps.columnRenderers && prevProps.data === nextProps.data && prevProps.eventIdToNoteIds === nextProps.eventIdToNoteIds && prevProps.expanded === nextProps.expanded && prevProps.loading === nextProps.loading && prevProps.loadingEventIds === nextProps.loadingEventIds && prevProps.isEventPinned === nextProps.isEventPinned && prevProps.onRowSelected === nextProps.onRowSelected && prevProps.selectedEventIds === nextProps.selectedEventIds && prevProps.showCheckboxes === nextProps.showCheckboxes && prevProps.showNotes === nextProps.showNotes && prevProps.timelineId === nextProps.timelineId;
});

exports.EventColumnView = EventColumnView;
EventColumnView.displayName = 'EventColumnView';