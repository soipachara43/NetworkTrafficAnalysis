"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("../styles");

var _column_headers = require("./column_headers");

var _helpers = require("./column_headers/helpers");

var _events = require("./events");

var _timeline_context = require("../timeline_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Renders the timeline body */
var Body = _react.default.memo(function (_ref) {
  var addNoteToEvent = _ref.addNoteToEvent,
      browserFields = _ref.browserFields,
      columnHeaders = _ref.columnHeaders,
      columnRenderers = _ref.columnRenderers,
      data = _ref.data,
      eventIdToNoteIds = _ref.eventIdToNoteIds,
      getNotesByIds = _ref.getNotesByIds,
      height = _ref.height,
      id = _ref.id,
      _ref$isEventViewer = _ref.isEventViewer,
      isEventViewer = _ref$isEventViewer === void 0 ? false : _ref$isEventViewer,
      isSelectAllChecked = _ref.isSelectAllChecked,
      loadingEventIds = _ref.loadingEventIds,
      onColumnRemoved = _ref.onColumnRemoved,
      onColumnResized = _ref.onColumnResized,
      onColumnSorted = _ref.onColumnSorted,
      onRowSelected = _ref.onRowSelected,
      onSelectAll = _ref.onSelectAll,
      onFilterChange = _ref.onFilterChange,
      onPinEvent = _ref.onPinEvent,
      onUpdateColumns = _ref.onUpdateColumns,
      onUnPinEvent = _ref.onUnPinEvent,
      pinnedEventIds = _ref.pinnedEventIds,
      rowRenderers = _ref.rowRenderers,
      selectedEventIds = _ref.selectedEventIds,
      showCheckboxes = _ref.showCheckboxes,
      sort = _ref.sort,
      toggleColumn = _ref.toggleColumn,
      updateNote = _ref.updateNote;
  var containerElementRef = (0, _react.useRef)(null);
  var timelineTypeContext = (0, _timeline_context.useTimelineTypeContext)();
  var additionalActionWidth = (0, _react.useMemo)(function () {
    var _ref2, _timelineTypeContext$;

    return (_ref2 = (_timelineTypeContext$ = timelineTypeContext.timelineActions) === null || _timelineTypeContext$ === void 0 ? void 0 : _timelineTypeContext$.reduce(function (acc, v) {
      return acc + v.width;
    }, 0)) !== null && _ref2 !== void 0 ? _ref2 : 0;
  }, [timelineTypeContext.timelineActions]);
  var actionsColumnWidth = (0, _react.useMemo)(function () {
    return (0, _helpers.getActionsColumnWidth)(isEventViewer, showCheckboxes, additionalActionWidth);
  }, [isEventViewer, showCheckboxes, additionalActionWidth]);
  var columnWidths = (0, _react.useMemo)(function () {
    return columnHeaders.reduce(function (totalWidth, header) {
      return totalWidth + header.width;
    }, actionsColumnWidth);
  }, [actionsColumnWidth, columnHeaders]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_styles.TimelineBody, {
    "data-test-subj": "timeline-body",
    bodyHeight: height,
    ref: containerElementRef
  }, _react.default.createElement(_styles.EventsTable, {
    "data-test-subj": "events-table",
    columnWidths: columnWidths
  }, _react.default.createElement(_column_headers.ColumnHeaders, {
    actionsColumnWidth: actionsColumnWidth,
    browserFields: browserFields,
    columnHeaders: columnHeaders,
    isEventViewer: isEventViewer,
    isSelectAllChecked: isSelectAllChecked,
    onColumnRemoved: onColumnRemoved,
    onColumnResized: onColumnResized,
    onColumnSorted: onColumnSorted,
    onFilterChange: onFilterChange,
    onSelectAll: onSelectAll,
    onUpdateColumns: onUpdateColumns,
    showEventsSelect: false,
    showSelectAllCheckbox: showCheckboxes,
    sort: sort,
    timelineId: id,
    toggleColumn: toggleColumn
  }), _react.default.createElement(_events.Events, {
    containerElementRef: containerElementRef.current,
    actionsColumnWidth: actionsColumnWidth,
    addNoteToEvent: addNoteToEvent,
    browserFields: browserFields,
    columnHeaders: columnHeaders,
    columnRenderers: columnRenderers,
    data: data,
    eventIdToNoteIds: eventIdToNoteIds,
    getNotesByIds: getNotesByIds,
    id: id,
    isEventViewer: isEventViewer,
    loadingEventIds: loadingEventIds,
    onColumnResized: onColumnResized,
    onPinEvent: onPinEvent,
    onRowSelected: onRowSelected,
    onUpdateColumns: onUpdateColumns,
    onUnPinEvent: onUnPinEvent,
    pinnedEventIds: pinnedEventIds,
    rowRenderers: rowRenderers,
    selectedEventIds: selectedEventIds,
    showCheckboxes: showCheckboxes,
    toggleColumn: toggleColumn,
    updateNote: updateNote
  }))), _react.default.createElement(_styles.TimelineBodyGlobalStyle, null));
});

exports.Body = Body;
Body.displayName = 'Body';