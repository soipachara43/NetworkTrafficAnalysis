"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelineReducer = exports.initialTimelineState = void 0;

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _actions = require("./actions");

var _helpers = require("./helpers");

var _types = require("./types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialTimelineState = {
  timelineById: _types.EMPTY_TIMELINE_BY_ID,
  autoSavedWarningMsg: {
    timelineId: null,
    newTimelineModel: null
  },
  showCallOutUnauthorizedMsg: false
};
/** The reducer for all timeline actions  */

exports.initialTimelineState = initialTimelineState;
var timelineReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialTimelineState).case(_actions.addTimeline, function (state, _ref) {
  var id = _ref.id,
      timeline = _ref.timeline;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.addTimelineToStore)({
      id: id,
      timeline: timeline,
      timelineById: state.timelineById
    })
  });
}).case(_actions.createTimeline, function (state, _ref2) {
  var id = _ref2.id,
      dataProviders = _ref2.dataProviders,
      dateRange = _ref2.dateRange,
      show = _ref2.show,
      columns = _ref2.columns,
      itemsPerPage = _ref2.itemsPerPage,
      kqlQuery = _ref2.kqlQuery,
      sort = _ref2.sort,
      showCheckboxes = _ref2.showCheckboxes,
      showRowRenderers = _ref2.showRowRenderers,
      filters = _ref2.filters;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.addNewTimeline)({
      columns: columns,
      dataProviders: dataProviders,
      dateRange: dateRange,
      filters: filters,
      id: id,
      itemsPerPage: itemsPerPage,
      kqlQuery: kqlQuery,
      sort: sort,
      show: show,
      showCheckboxes: showCheckboxes,
      showRowRenderers: showRowRenderers,
      timelineById: state.timelineById
    })
  });
}).case(_actions.upsertColumn, function (state, _ref3) {
  var column = _ref3.column,
      id = _ref3.id,
      index = _ref3.index;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.upsertTimelineColumn)({
      column: column,
      id: id,
      index: index,
      timelineById: state.timelineById
    })
  });
}).case(_actions.addHistory, function (state, _ref4) {
  var id = _ref4.id,
      historyId = _ref4.historyId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.addTimelineHistory)({
      id: id,
      historyId: historyId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.addNote, function (state, _ref5) {
  var id = _ref5.id,
      noteId = _ref5.noteId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.addTimelineNote)({
      id: id,
      noteId: noteId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.addNoteToEvent, function (state, _ref6) {
  var id = _ref6.id,
      noteId = _ref6.noteId,
      eventId = _ref6.eventId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.addTimelineNoteToEvent)({
      id: id,
      noteId: noteId,
      eventId: eventId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.addProvider, function (state, _ref7) {
  var id = _ref7.id,
      provider = _ref7.provider;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.addTimelineProvider)({
      id: id,
      provider: provider,
      timelineById: state.timelineById
    })
  });
}).case(_actions.applyKqlFilterQuery, function (state, _ref8) {
  var id = _ref8.id,
      filterQuery = _ref8.filterQuery;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.applyKqlFilterQueryDraft)({
      id: id,
      filterQuery: filterQuery,
      timelineById: state.timelineById
    })
  });
}).case(_actions.setKqlFilterQueryDraft, function (state, _ref9) {
  var id = _ref9.id,
      filterQueryDraft = _ref9.filterQueryDraft;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateKqlFilterQueryDraft)({
      id: id,
      filterQueryDraft: filterQueryDraft,
      timelineById: state.timelineById
    })
  });
}).case(_actions.showTimeline, function (state, _ref10) {
  var id = _ref10.id,
      show = _ref10.show;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineShowTimeline)({
      id: id,
      show: show,
      timelineById: state.timelineById
    })
  });
}).case(_actions.applyDeltaToColumnWidth, function (state, _ref11) {
  var id = _ref11.id,
      columnId = _ref11.columnId,
      delta = _ref11.delta;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.applyDeltaToTimelineColumnWidth)({
      id: id,
      columnId: columnId,
      delta: delta,
      timelineById: state.timelineById
    })
  });
}).case(_actions.applyDeltaToWidth, function (state, _ref12) {
  var id = _ref12.id,
      delta = _ref12.delta,
      bodyClientWidthPixels = _ref12.bodyClientWidthPixels,
      minWidthPixels = _ref12.minWidthPixels,
      maxWidthPercent = _ref12.maxWidthPercent;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.applyDeltaToCurrentWidth)({
      id: id,
      delta: delta,
      bodyClientWidthPixels: bodyClientWidthPixels,
      minWidthPixels: minWidthPixels,
      maxWidthPercent: maxWidthPercent,
      timelineById: state.timelineById
    })
  });
}).case(_actions.pinEvent, function (state, _ref13) {
  var id = _ref13.id,
      eventId = _ref13.eventId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.pinTimelineEvent)({
      id: id,
      eventId: eventId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.removeColumn, function (state, _ref14) {
  var id = _ref14.id,
      columnId = _ref14.columnId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.removeTimelineColumn)({
      id: id,
      columnId: columnId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.removeProvider, function (state, _ref15) {
  var id = _ref15.id,
      providerId = _ref15.providerId,
      andProviderId = _ref15.andProviderId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.removeTimelineProvider)({
      id: id,
      providerId: providerId,
      timelineById: state.timelineById,
      andProviderId: andProviderId
    })
  });
}).case(_actions.startTimelineSaving, function (state, _ref16) {
  var id = _ref16.id;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, _objectSpread({}, state.timelineById[id], {
      isSaving: true
    })))
  });
}).case(_actions.endTimelineSaving, function (state, _ref17) {
  var id = _ref17.id;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, _objectSpread({}, state.timelineById[id], {
      isSaving: false
    })))
  });
}).case(_actions.setEventsDeleted, function (state, _ref18) {
  var id = _ref18.id,
      eventIds = _ref18.eventIds,
      isDeleted = _ref18.isDeleted;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.setDeletedTimelineEvents)({
      id: id,
      eventIds: eventIds,
      timelineById: state.timelineById,
      isDeleted: isDeleted
    })
  });
}).case(_actions.clearEventsDeleted, function (state, _ref19) {
  var id = _ref19.id;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, _objectSpread({}, state.timelineById[id], {
      deletedEventIds: []
    })))
  });
}).case(_actions.setEventsLoading, function (state, _ref20) {
  var id = _ref20.id,
      eventIds = _ref20.eventIds,
      isLoading = _ref20.isLoading;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.setLoadingTimelineEvents)({
      id: id,
      eventIds: eventIds,
      timelineById: state.timelineById,
      isLoading: isLoading
    })
  });
}).case(_actions.clearEventsLoading, function (state, _ref21) {
  var id = _ref21.id;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, _objectSpread({}, state.timelineById[id], {
      loadingEventIds: []
    })))
  });
}).case(_actions.setSelected, function (state, _ref22) {
  var id = _ref22.id,
      eventIds = _ref22.eventIds,
      isSelected = _ref22.isSelected,
      isSelectAllChecked = _ref22.isSelectAllChecked;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.setSelectedTimelineEvents)({
      id: id,
      eventIds: eventIds,
      timelineById: state.timelineById,
      isSelected: isSelected,
      isSelectAllChecked: isSelectAllChecked
    })
  });
}).case(_actions.clearSelected, function (state, _ref23) {
  var id = _ref23.id;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, _objectSpread({}, state.timelineById[id], {
      selectedEventIds: {},
      isSelectAllChecked: false
    })))
  });
}).case(_actions.updateIsLoading, function (state, _ref24) {
  var id = _ref24.id,
      isLoading = _ref24.isLoading;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, _objectSpread({}, state.timelineById[id], {
      isLoading: isLoading
    })))
  });
}).case(_actions.updateTimeline, function (state, _ref25) {
  var id = _ref25.id,
      timeline = _ref25.timeline;
  return _objectSpread({}, state, {
    timelineById: _objectSpread({}, state.timelineById, _defineProperty({}, id, timeline))
  });
}).case(_actions.unPinEvent, function (state, _ref26) {
  var id = _ref26.id,
      eventId = _ref26.eventId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.unPinTimelineEvent)({
      id: id,
      eventId: eventId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateColumns, function (state, _ref27) {
  var id = _ref27.id,
      columns = _ref27.columns;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineColumns)({
      id: id,
      columns: columns,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateDescription, function (state, _ref28) {
  var id = _ref28.id,
      description = _ref28.description;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineDescription)({
      id: id,
      description: description,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateEventType, function (state, _ref29) {
  var id = _ref29.id,
      eventType = _ref29.eventType;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineEventType)({
      id: id,
      eventType: eventType,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateIsFavorite, function (state, _ref30) {
  var id = _ref30.id,
      isFavorite = _ref30.isFavorite;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineIsFavorite)({
      id: id,
      isFavorite: isFavorite,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateIsLive, function (state, _ref31) {
  var id = _ref31.id,
      isLive = _ref31.isLive;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineIsLive)({
      id: id,
      isLive: isLive,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateKqlMode, function (state, _ref32) {
  var id = _ref32.id,
      kqlMode = _ref32.kqlMode;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineKqlMode)({
      id: id,
      kqlMode: kqlMode,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateTitle, function (state, _ref33) {
  var id = _ref33.id,
      title = _ref33.title;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineTitle)({
      id: id,
      title: title,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateProviders, function (state, _ref34) {
  var id = _ref34.id,
      providers = _ref34.providers;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineProviders)({
      id: id,
      providers: providers,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateRange, function (state, _ref35) {
  var id = _ref35.id,
      start = _ref35.start,
      end = _ref35.end;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineRange)({
      id: id,
      start: start,
      end: end,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateSort, function (state, _ref36) {
  var id = _ref36.id,
      sort = _ref36.sort;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineSort)({
      id: id,
      sort: sort,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateDataProviderEnabled, function (state, _ref37) {
  var id = _ref37.id,
      enabled = _ref37.enabled,
      providerId = _ref37.providerId,
      andProviderId = _ref37.andProviderId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineProviderEnabled)({
      id: id,
      enabled: enabled,
      providerId: providerId,
      timelineById: state.timelineById,
      andProviderId: andProviderId
    })
  });
}).case(_actions.updateDataProviderExcluded, function (state, _ref38) {
  var id = _ref38.id,
      excluded = _ref38.excluded,
      providerId = _ref38.providerId,
      andProviderId = _ref38.andProviderId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineProviderExcluded)({
      id: id,
      excluded: excluded,
      providerId: providerId,
      timelineById: state.timelineById,
      andProviderId: andProviderId
    })
  });
}).case(_actions.dataProviderEdited, function (state, _ref39) {
  var andProviderId = _ref39.andProviderId,
      excluded = _ref39.excluded,
      field = _ref39.field,
      id = _ref39.id,
      operator = _ref39.operator,
      providerId = _ref39.providerId,
      value = _ref39.value;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineProviderProperties)({
      andProviderId: andProviderId,
      excluded: excluded,
      field: field,
      id: id,
      operator: operator,
      providerId: providerId,
      timelineById: state.timelineById,
      value: value
    })
  });
}).case(_actions.updateDataProviderKqlQuery, function (state, _ref40) {
  var id = _ref40.id,
      kqlQuery = _ref40.kqlQuery,
      providerId = _ref40.providerId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineProviderKqlQuery)({
      id: id,
      kqlQuery: kqlQuery,
      providerId: providerId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateItemsPerPage, function (state, _ref41) {
  var id = _ref41.id,
      itemsPerPage = _ref41.itemsPerPage;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelineItemsPerPage)({
      id: id,
      itemsPerPage: itemsPerPage,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updatePageIndex, function (state, _ref42) {
  var id = _ref42.id,
      activePage = _ref42.activePage;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelinePageIndex)({
      id: id,
      activePage: activePage,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateItemsPerPageOptions, function (state, _ref43) {
  var id = _ref43.id,
      itemsPerPageOptions = _ref43.itemsPerPageOptions;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateTimelinePerPageOptions)({
      id: id,
      itemsPerPageOptions: itemsPerPageOptions,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateHighlightedDropAndProviderId, function (state, _ref44) {
  var id = _ref44.id,
      providerId = _ref44.providerId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateHighlightedDropAndProvider)({
      id: id,
      providerId: providerId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.updateAutoSaveMsg, function (state, _ref45) {
  var timelineId = _ref45.timelineId,
      newTimelineModel = _ref45.newTimelineModel;
  return _objectSpread({}, state, {
    autoSavedWarningMsg: {
      timelineId: timelineId,
      newTimelineModel: newTimelineModel
    }
  });
}).case(_actions.showCallOutUnauthorizedMsg, function (state) {
  return _objectSpread({}, state, {
    showCallOutUnauthorizedMsg: true
  });
}).case(_actions.setSavedQueryId, function (state, _ref46) {
  var id = _ref46.id,
      savedQueryId = _ref46.savedQueryId;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateSavedQuery)({
      id: id,
      savedQueryId: savedQueryId,
      timelineById: state.timelineById
    })
  });
}).case(_actions.setFilters, function (state, _ref47) {
  var id = _ref47.id,
      filters = _ref47.filters;
  return _objectSpread({}, state, {
    timelineById: (0, _helpers.updateFilters)({
      id: id,
      filters: filters,
      timelineById: state.timelineById
    })
  });
}).build();
exports.timelineReducer = timelineReducer;