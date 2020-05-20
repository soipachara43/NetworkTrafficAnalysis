"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulBody = exports.emptyColumnHeaders = void 0;

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _store = require("../../../store");

var _actions = require("../../../store/actions");

var _defaults = require("../../../store/timeline/defaults");

var _timeline_context = require("../timeline_context");

var _helpers = require("./column_headers/helpers");

var _helpers2 = require("./helpers");

var _index = require("./index");

var _renderers = require("./renderers");

var _plain_row_renderer = require("./renderers/plain_row_renderer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyColumnHeaders = [];
exports.emptyColumnHeaders = emptyColumnHeaders;

var StatefulBodyComponent = _react.default.memo(function (_ref) {
  var addNoteToEvent = _ref.addNoteToEvent,
      applyDeltaToColumnWidth = _ref.applyDeltaToColumnWidth,
      browserFields = _ref.browserFields,
      columnHeaders = _ref.columnHeaders,
      data = _ref.data,
      eventIdToNoteIds = _ref.eventIdToNoteIds,
      height = _ref.height,
      id = _ref.id,
      _ref$isEventViewer = _ref.isEventViewer,
      isEventViewer = _ref$isEventViewer === void 0 ? false : _ref$isEventViewer,
      isSelectAllChecked = _ref.isSelectAllChecked,
      loadingEventIds = _ref.loadingEventIds,
      notesById = _ref.notesById,
      pinEvent = _ref.pinEvent,
      pinnedEventIds = _ref.pinnedEventIds,
      removeColumn = _ref.removeColumn,
      selectedEventIds = _ref.selectedEventIds,
      setSelected = _ref.setSelected,
      clearSelected = _ref.clearSelected,
      showCheckboxes = _ref.showCheckboxes,
      showRowRenderers = _ref.showRowRenderers,
      sort = _ref.sort,
      toggleColumn = _ref.toggleColumn,
      unPinEvent = _ref.unPinEvent,
      updateColumns = _ref.updateColumns,
      updateNote = _ref.updateNote,
      updateSort = _ref.updateSort;
  var timelineTypeContext = (0, _timeline_context.useTimelineTypeContext)();
  var getNotesByIds = (0, _react.useCallback)(function (noteIds) {
    return _store.appSelectors.getNotes(notesById, noteIds);
  }, [notesById]);
  var onAddNoteToEvent = (0, _react.useCallback)(function (_ref2) {
    var eventId = _ref2.eventId,
        noteId = _ref2.noteId;
    return addNoteToEvent({
      id: id,
      eventId: eventId,
      noteId: noteId
    });
  }, [id]);
  var onRowSelected = (0, _react.useCallback)(function (_ref3) {
    var _timelineTypeContext$;

    var eventIds = _ref3.eventIds,
        isSelected = _ref3.isSelected;
    setSelected({
      id: id,
      eventIds: (0, _helpers2.getEventIdToDataMapping)(data, eventIds, (_timelineTypeContext$ = timelineTypeContext.queryFields) !== null && _timelineTypeContext$ !== void 0 ? _timelineTypeContext$ : []),
      isSelected: isSelected,
      isSelectAllChecked: isSelected && Object.keys(selectedEventIds).length + 1 === data.length
    });
  }, [setSelected, id, data, selectedEventIds, timelineTypeContext.queryFields]);
  var onSelectAll = (0, _react.useCallback)(function (_ref4) {
    var _timelineTypeContext$2;

    var isSelected = _ref4.isSelected;
    return isSelected ? setSelected({
      id: id,
      eventIds: (0, _helpers2.getEventIdToDataMapping)(data, data.map(function (event) {
        return event._id;
      }), (_timelineTypeContext$2 = timelineTypeContext.queryFields) !== null && _timelineTypeContext$2 !== void 0 ? _timelineTypeContext$2 : []),
      isSelected: isSelected,
      isSelectAllChecked: isSelected
    }) : clearSelected({
      id: id
    });
  }, [setSelected, clearSelected, id, data, timelineTypeContext.queryFields]);
  var onColumnSorted = (0, _react.useCallback)(function (sorted) {
    updateSort({
      id: id,
      sort: sorted
    });
  }, [id]);
  var onColumnRemoved = (0, _react.useCallback)(function (columnId) {
    return removeColumn({
      id: id,
      columnId: columnId
    });
  }, [id]);
  var onColumnResized = (0, _react.useCallback)(function (_ref5) {
    var columnId = _ref5.columnId,
        delta = _ref5.delta;
    return applyDeltaToColumnWidth({
      id: id,
      columnId: columnId,
      delta: delta
    });
  }, [id]);
  var onPinEvent = (0, _react.useCallback)(function (eventId) {
    return pinEvent({
      id: id,
      eventId: eventId
    });
  }, [id]);
  var onUnPinEvent = (0, _react.useCallback)(function (eventId) {
    return unPinEvent({
      id: id,
      eventId: eventId
    });
  }, [id]);
  var onUpdateNote = (0, _react.useCallback)(function (note) {
    return updateNote({
      note: note
    });
  }, []);
  var onUpdateColumns = (0, _react.useCallback)(function (columns) {
    return updateColumns({
      id: id,
      columns: columns
    });
  }, [id]); // Sync to timelineTypeContext.selectAll so parent components can select all events

  (0, _react.useEffect)(function () {
    if (timelineTypeContext.selectAll) {
      onSelectAll({
        isSelected: true
      });
    }
  }, [timelineTypeContext.selectAll]); // onSelectAll dependency not necessary

  return _react.default.createElement(_index.Body, {
    addNoteToEvent: onAddNoteToEvent,
    browserFields: browserFields,
    columnHeaders: columnHeaders || emptyColumnHeaders,
    columnRenderers: _renderers.columnRenderers,
    data: data,
    eventIdToNoteIds: eventIdToNoteIds,
    getNotesByIds: getNotesByIds,
    height: height,
    id: id,
    isEventViewer: isEventViewer,
    isSelectAllChecked: isSelectAllChecked,
    loadingEventIds: loadingEventIds,
    onColumnRemoved: onColumnRemoved,
    onColumnResized: onColumnResized,
    onColumnSorted: onColumnSorted,
    onRowSelected: onRowSelected,
    onSelectAll: onSelectAll,
    onFilterChange: _fp.noop // TODO: this is the callback for column filters, which is out scope for this phase of delivery
    ,
    onPinEvent: onPinEvent,
    onUnPinEvent: onUnPinEvent,
    onUpdateColumns: onUpdateColumns,
    pinnedEventIds: pinnedEventIds,
    rowRenderers: showRowRenderers ? _renderers.rowRenderers : [_plain_row_renderer.plainRowRenderer],
    selectedEventIds: selectedEventIds,
    showCheckboxes: showCheckboxes,
    sort: sort,
    toggleColumn: toggleColumn,
    updateNote: onUpdateNote
  });
}, function (prevProps, nextProps) {
  return (0, _fastDeepEqual.default)(prevProps.browserFields, nextProps.browserFields) && (0, _fastDeepEqual.default)(prevProps.columnHeaders, nextProps.columnHeaders) && (0, _fastDeepEqual.default)(prevProps.data, nextProps.data) && prevProps.eventIdToNoteIds === nextProps.eventIdToNoteIds && (0, _fastDeepEqual.default)(prevProps.notesById, nextProps.notesById) && prevProps.height === nextProps.height && prevProps.id === nextProps.id && prevProps.isEventViewer === nextProps.isEventViewer && prevProps.isSelectAllChecked === nextProps.isSelectAllChecked && prevProps.loadingEventIds === nextProps.loadingEventIds && prevProps.pinnedEventIds === nextProps.pinnedEventIds && prevProps.selectedEventIds === nextProps.selectedEventIds && prevProps.showCheckboxes === nextProps.showCheckboxes && prevProps.showRowRenderers === nextProps.showRowRenderers && prevProps.sort === nextProps.sort;
});

StatefulBodyComponent.displayName = 'StatefulBodyComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var memoizedColumnHeaders = (0, _memoizeOne.default)(_helpers.getColumnHeaders);

  var getTimeline = _store.timelineSelectors.getTimelineByIdSelector();

  var getNotesByIds = _store.appSelectors.notesByIdsSelector();

  var mapStateToProps = function mapStateToProps(state, _ref6) {
    var _getTimeline;

    var browserFields = _ref6.browserFields,
        id = _ref6.id;
    var timeline = (_getTimeline = getTimeline(state, id)) !== null && _getTimeline !== void 0 ? _getTimeline : _defaults.timelineDefaults;
    var columns = timeline.columns,
        eventIdToNoteIds = timeline.eventIdToNoteIds,
        eventType = timeline.eventType,
        isSelectAllChecked = timeline.isSelectAllChecked,
        loadingEventIds = timeline.loadingEventIds,
        pinnedEventIds = timeline.pinnedEventIds,
        selectedEventIds = timeline.selectedEventIds,
        showCheckboxes = timeline.showCheckboxes,
        showRowRenderers = timeline.showRowRenderers;
    return {
      columnHeaders: memoizedColumnHeaders(columns, browserFields),
      eventIdToNoteIds: eventIdToNoteIds,
      eventType: eventType,
      isSelectAllChecked: isSelectAllChecked,
      loadingEventIds: loadingEventIds,
      notesById: getNotesByIds(state),
      id: id,
      pinnedEventIds: pinnedEventIds,
      selectedEventIds: selectedEventIds,
      showCheckboxes: showCheckboxes,
      showRowRenderers: showRowRenderers
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  addNoteToEvent: _actions.timelineActions.addNoteToEvent,
  applyDeltaToColumnWidth: _actions.timelineActions.applyDeltaToColumnWidth,
  clearSelected: _actions.timelineActions.clearSelected,
  pinEvent: _actions.timelineActions.pinEvent,
  removeColumn: _actions.timelineActions.removeColumn,
  removeProvider: _actions.timelineActions.removeProvider,
  setSelected: _actions.timelineActions.setSelected,
  unPinEvent: _actions.timelineActions.unPinEvent,
  updateColumns: _actions.timelineActions.updateColumns,
  updateNote: _actions.appActions.updateNote,
  updateSort: _actions.timelineActions.updateSort
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var StatefulBody = connector(StatefulBodyComponent);
exports.StatefulBody = StatefulBody;