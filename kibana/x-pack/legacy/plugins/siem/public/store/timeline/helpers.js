"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFilters = exports.updateSavedQuery = exports.updateHighlightedDropAndProvider = exports.unPinTimelineEvent = exports.setSelectedTimelineEvents = exports.setLoadingTimelineEvents = exports.setDeletedTimelineEvents = exports.removeTimelineProvider = exports.updateTimelinePerPageOptions = exports.updateTimelinePageIndex = exports.updateTimelineItemsPerPage = exports.updateTimelineProviderKqlQuery = exports.updateTimelineProviderProperties = exports.updateTimelineProviderExcluded = exports.updateTimelineProviderEnabled = exports.updateTimelineSort = exports.updateTimelineRange = exports.updateTimelineProviders = exports.updateTimelineIsLive = exports.updateTimelineIsFavorite = exports.updateTimelineEventType = exports.updateTimelineTitle = exports.updateTimelineDescription = exports.updateTimelineColumns = exports.updateKqlFilterQueryDraft = exports.updateTimelineKqlMode = exports.applyKqlFilterQueryDraft = exports.addTimelineProvider = exports.applyDeltaToTimelineColumnWidth = exports.removeTimelineColumn = exports.upsertTimelineColumn = exports.applyDeltaToCurrentWidth = exports.updateTimelineShowTimeline = exports.pinTimelineEvent = exports.addNewTimeline = exports.addTimelineToStore = exports.addTimelineNoteToEvent = exports.addTimelineNote = exports.addTimelineHistory = exports.initialTimelineState = exports.isNotNull = void 0;

var _fp = require("lodash/fp");

var _helpers = require("../../components/timeline/body/column_headers/helpers");

var _defaults = require("./defaults");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EMPTY_TIMELINE_BY_ID = {}; // stable reference

var isNotNull = function isNotNull(value) {
  return value !== null;
};

exports.isNotNull = isNotNull;
var initialTimelineState = {
  timelineById: EMPTY_TIMELINE_BY_ID,
  autoSavedWarningMsg: {
    timelineId: null,
    newTimelineModel: null
  },
  showCallOutUnauthorizedMsg: false
};
exports.initialTimelineState = initialTimelineState;

var addTimelineHistory = function addTimelineHistory(_ref) {
  var id = _ref.id,
      historyId = _ref.historyId,
      timelineById = _ref.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    historyIds: (0, _fp.uniq)([].concat(_toConsumableArray(timeline.historyIds), [historyId]))
  })));
};

exports.addTimelineHistory = addTimelineHistory;

var addTimelineNote = function addTimelineNote(_ref2) {
  var id = _ref2.id,
      noteId = _ref2.noteId,
      timelineById = _ref2.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    noteIds: [].concat(_toConsumableArray(timeline.noteIds), [noteId])
  })));
};

exports.addTimelineNote = addTimelineNote;

var addTimelineNoteToEvent = function addTimelineNoteToEvent(_ref3) {
  var id = _ref3.id,
      noteId = _ref3.noteId,
      eventId = _ref3.eventId,
      timelineById = _ref3.timelineById;
  var timeline = timelineById[id];
  var existingNoteIds = (0, _fp.getOr)([], "eventIdToNoteIds.".concat(eventId), timeline);
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    eventIdToNoteIds: _objectSpread({}, timeline.eventIdToNoteIds, {}, _defineProperty({}, eventId, (0, _fp.uniq)([].concat(_toConsumableArray(existingNoteIds), [noteId]))))
  })));
};

exports.addTimelineNoteToEvent = addTimelineNoteToEvent;

/**
 * Add a saved object timeline to the store
 * and default the value to what need to be if values are null
 */
var addTimelineToStore = function addTimelineToStore(_ref4) {
  var id = _ref4.id,
      timeline = _ref4.timeline,
      timelineById = _ref4.timelineById;
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    isLoading: timelineById[id].isLoading
  })));
};

exports.addTimelineToStore = addTimelineToStore;

/** Adds a new `Timeline` to the provided collection of `TimelineById` */
var addNewTimeline = function addNewTimeline(_ref5) {
  var columns = _ref5.columns,
      _ref5$dataProviders = _ref5.dataProviders,
      dataProviders = _ref5$dataProviders === void 0 ? [] : _ref5$dataProviders,
      _ref5$dateRange = _ref5.dateRange,
      dateRange = _ref5$dateRange === void 0 ? {
    start: 0,
    end: 0
  } : _ref5$dateRange,
      _ref5$filters = _ref5.filters,
      filters = _ref5$filters === void 0 ? _defaults.timelineDefaults.filters : _ref5$filters,
      id = _ref5.id,
      _ref5$itemsPerPage = _ref5.itemsPerPage,
      itemsPerPage = _ref5$itemsPerPage === void 0 ? _defaults.timelineDefaults.itemsPerPage : _ref5$itemsPerPage,
      _ref5$kqlQuery = _ref5.kqlQuery,
      kqlQuery = _ref5$kqlQuery === void 0 ? {
    filterQuery: null,
    filterQueryDraft: null
  } : _ref5$kqlQuery,
      _ref5$sort = _ref5.sort,
      sort = _ref5$sort === void 0 ? _defaults.timelineDefaults.sort : _ref5$sort,
      _ref5$show = _ref5.show,
      show = _ref5$show === void 0 ? false : _ref5$show,
      _ref5$showCheckboxes = _ref5.showCheckboxes,
      showCheckboxes = _ref5$showCheckboxes === void 0 ? false : _ref5$showCheckboxes,
      _ref5$showRowRenderer = _ref5.showRowRenderers,
      showRowRenderers = _ref5$showRowRenderer === void 0 ? true : _ref5$showRowRenderer,
      timelineById = _ref5.timelineById;
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({
    id: id
  }, _defaults.timelineDefaults, {
    columns: columns,
    dataProviders: dataProviders,
    dateRange: dateRange,
    filters: filters,
    itemsPerPage: itemsPerPage,
    kqlQuery: kqlQuery,
    sort: sort,
    show: show,
    savedObjectId: null,
    version: null,
    isSaving: false,
    isLoading: false,
    showCheckboxes: showCheckboxes,
    showRowRenderers: showRowRenderers
  })));
};

exports.addNewTimeline = addNewTimeline;

var pinTimelineEvent = function pinTimelineEvent(_ref6) {
  var id = _ref6.id,
      eventId = _ref6.eventId,
      timelineById = _ref6.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    pinnedEventIds: _objectSpread({}, timeline.pinnedEventIds, {}, _defineProperty({}, eventId, true))
  })));
};

exports.pinTimelineEvent = pinTimelineEvent;

var updateTimelineShowTimeline = function updateTimelineShowTimeline(_ref7) {
  var id = _ref7.id,
      show = _ref7.show,
      timelineById = _ref7.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    show: show
  })));
};

exports.updateTimelineShowTimeline = updateTimelineShowTimeline;

var applyDeltaToCurrentWidth = function applyDeltaToCurrentWidth(_ref8) {
  var id = _ref8.id,
      delta = _ref8.delta,
      bodyClientWidthPixels = _ref8.bodyClientWidthPixels,
      minWidthPixels = _ref8.minWidthPixels,
      maxWidthPercent = _ref8.maxWidthPercent,
      timelineById = _ref8.timelineById;
  var timeline = timelineById[id];
  var requestedWidth = timeline.width + delta * -1; // raw change in width

  var maxWidthPixels = maxWidthPercent / 100 * bodyClientWidthPixels;
  var clampedWidth = Math.min(requestedWidth, maxWidthPixels);
  var width = Math.max(minWidthPixels, clampedWidth); // if the clamped width is smaller than the min, use the min

  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    width: width
  })));
};

exports.applyDeltaToCurrentWidth = applyDeltaToCurrentWidth;

var queryMatchCustomizer = function queryMatchCustomizer(dp1, dp2) {
  if (dp1.field === dp2.field && dp1.value === dp2.value && dp1.operator === dp2.operator) {
    return true;
  }

  return false;
};

var addAndToProviderInTimeline = function addAndToProviderInTimeline(id, provider, timeline, timelineById) {
  var alreadyExistsProviderIndex = timeline.dataProviders.findIndex(function (p) {
    return p.id === timeline.highlightedDropAndProviderId;
  });
  var newProvider = timeline.dataProviders[alreadyExistsProviderIndex];
  var alreadyExistsAndProviderIndex = newProvider.and.findIndex(function (p) {
    return p.id === provider.id;
  });

  var and = provider.and,
      andProvider = _objectWithoutProperties(provider, ["and"]);

  if ((0, _fp.isEqualWith)(queryMatchCustomizer, newProvider.queryMatch, andProvider.queryMatch) || alreadyExistsAndProviderIndex === -1 && newProvider.and.filter(function (itemAndProvider) {
    return (0, _fp.isEqualWith)(queryMatchCustomizer, itemAndProvider.queryMatch, andProvider.queryMatch);
  }).length > 0) {
    return timelineById;
  }

  var dataProviders = [].concat(_toConsumableArray(timeline.dataProviders.slice(0, alreadyExistsProviderIndex)), [_objectSpread({}, timeline.dataProviders[alreadyExistsProviderIndex], {
    and: alreadyExistsAndProviderIndex > -1 ? [].concat(_toConsumableArray(newProvider.and.slice(0, alreadyExistsAndProviderIndex)), [andProvider], _toConsumableArray(newProvider.and.slice(alreadyExistsAndProviderIndex + 1))) : [].concat(_toConsumableArray(newProvider.and), [andProvider])
  })], _toConsumableArray(timeline.dataProviders.slice(alreadyExistsProviderIndex + 1)));
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: dataProviders
  })));
};

var addProviderToTimeline = function addProviderToTimeline(id, provider, timeline, timelineById) {
  var alreadyExistsAtIndex = timeline.dataProviders.findIndex(function (p) {
    return p.id === provider.id;
  });

  if (alreadyExistsAtIndex > -1 && !(0, _fp.isEmpty)(timeline.dataProviders[alreadyExistsAtIndex].and)) {
    provider.id = "".concat(provider.id, "-").concat(timeline.dataProviders.filter(function (p) {
      return p.id === provider.id;
    }).length);
  }

  var dataProviders = alreadyExistsAtIndex > -1 && (0, _fp.isEmpty)(timeline.dataProviders[alreadyExistsAtIndex].and) ? [].concat(_toConsumableArray(timeline.dataProviders.slice(0, alreadyExistsAtIndex)), [provider], _toConsumableArray(timeline.dataProviders.slice(alreadyExistsAtIndex + 1))) : [].concat(_toConsumableArray(timeline.dataProviders), [provider]);
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: dataProviders
  })));
};

/**
 * Adds or updates a column. When updating a column, it will be moved to the
 * new index
 */
var upsertTimelineColumn = function upsertTimelineColumn(_ref9) {
  var column = _ref9.column,
      id = _ref9.id,
      index = _ref9.index,
      timelineById = _ref9.timelineById;
  var timeline = timelineById[id];
  var alreadyExistsAtIndex = timeline.columns.findIndex(function (c) {
    return c.id === column.id;
  });

  if (alreadyExistsAtIndex !== -1) {
    // remove the existing entry and add the new one at the specified index
    var reordered = timeline.columns.filter(function (c) {
      return c.id !== column.id;
    });
    reordered.splice(index, 0, column); // ⚠️ mutation

    return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
      columns: reordered
    })));
  } // add the new entry at the specified index


  var columns = _toConsumableArray(timeline.columns);

  columns.splice(index, 0, column); // ⚠️ mutation

  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    columns: columns
  })));
};

exports.upsertTimelineColumn = upsertTimelineColumn;

var removeTimelineColumn = function removeTimelineColumn(_ref10) {
  var id = _ref10.id,
      columnId = _ref10.columnId,
      timelineById = _ref10.timelineById;
  var timeline = timelineById[id];
  var columns = timeline.columns.filter(function (c) {
    return c.id !== columnId;
  });
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    columns: columns
  })));
};

exports.removeTimelineColumn = removeTimelineColumn;

var applyDeltaToTimelineColumnWidth = function applyDeltaToTimelineColumnWidth(_ref11) {
  var id = _ref11.id,
      columnId = _ref11.columnId,
      delta = _ref11.delta,
      timelineById = _ref11.timelineById;
  var timeline = timelineById[id];
  var columnIndex = timeline.columns.findIndex(function (c) {
    return c.id === columnId;
  });

  if (columnIndex === -1) {
    // the column was not found
    return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline)));
  }

  var minWidthPixels = (0, _helpers.getColumnWidthFromType)(timeline.columns[columnIndex].type);
  var requestedWidth = timeline.columns[columnIndex].width + delta; // raw change in width

  var width = Math.max(minWidthPixels, requestedWidth); // if the requested width is smaller than the min, use the min

  var columnWithNewWidth = _objectSpread({}, timeline.columns[columnIndex], {
    width: width
  });

  var columns = [].concat(_toConsumableArray(timeline.columns.slice(0, columnIndex)), [columnWithNewWidth], _toConsumableArray(timeline.columns.slice(columnIndex + 1)));
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    columns: columns
  })));
};

exports.applyDeltaToTimelineColumnWidth = applyDeltaToTimelineColumnWidth;

var addTimelineProvider = function addTimelineProvider(_ref12) {
  var id = _ref12.id,
      provider = _ref12.provider,
      timelineById = _ref12.timelineById;
  var timeline = timelineById[id];

  if (timeline.highlightedDropAndProviderId !== '') {
    return addAndToProviderInTimeline(id, provider, timeline, timelineById);
  } else {
    return addProviderToTimeline(id, provider, timeline, timelineById);
  }
};

exports.addTimelineProvider = addTimelineProvider;

var applyKqlFilterQueryDraft = function applyKqlFilterQueryDraft(_ref13) {
  var id = _ref13.id,
      filterQuery = _ref13.filterQuery,
      timelineById = _ref13.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    kqlQuery: _objectSpread({}, timeline.kqlQuery, {
      filterQuery: filterQuery
    })
  })));
};

exports.applyKqlFilterQueryDraft = applyKqlFilterQueryDraft;

var updateTimelineKqlMode = function updateTimelineKqlMode(_ref14) {
  var id = _ref14.id,
      kqlMode = _ref14.kqlMode,
      timelineById = _ref14.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    kqlMode: kqlMode
  })));
};

exports.updateTimelineKqlMode = updateTimelineKqlMode;

var updateKqlFilterQueryDraft = function updateKqlFilterQueryDraft(_ref15) {
  var id = _ref15.id,
      filterQueryDraft = _ref15.filterQueryDraft,
      timelineById = _ref15.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    kqlQuery: _objectSpread({}, timeline.kqlQuery, {
      filterQueryDraft: filterQueryDraft
    })
  })));
};

exports.updateKqlFilterQueryDraft = updateKqlFilterQueryDraft;

var updateTimelineColumns = function updateTimelineColumns(_ref16) {
  var id = _ref16.id,
      columns = _ref16.columns,
      timelineById = _ref16.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    columns: columns
  })));
};

exports.updateTimelineColumns = updateTimelineColumns;

var updateTimelineDescription = function updateTimelineDescription(_ref17) {
  var id = _ref17.id,
      description = _ref17.description,
      timelineById = _ref17.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    description: description.endsWith(' ') ? "".concat(description.trim(), " ") : description.trim()
  })));
};

exports.updateTimelineDescription = updateTimelineDescription;

var updateTimelineTitle = function updateTimelineTitle(_ref18) {
  var id = _ref18.id,
      title = _ref18.title,
      timelineById = _ref18.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    title: title.endsWith(' ') ? "".concat(title.trim(), " ") : title.trim()
  })));
};

exports.updateTimelineTitle = updateTimelineTitle;

var updateTimelineEventType = function updateTimelineEventType(_ref19) {
  var id = _ref19.id,
      eventType = _ref19.eventType,
      timelineById = _ref19.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    eventType: eventType
  })));
};

exports.updateTimelineEventType = updateTimelineEventType;

var updateTimelineIsFavorite = function updateTimelineIsFavorite(_ref20) {
  var id = _ref20.id,
      isFavorite = _ref20.isFavorite,
      timelineById = _ref20.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    isFavorite: isFavorite
  })));
};

exports.updateTimelineIsFavorite = updateTimelineIsFavorite;

var updateTimelineIsLive = function updateTimelineIsLive(_ref21) {
  var id = _ref21.id,
      isLive = _ref21.isLive,
      timelineById = _ref21.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    isLive: isLive
  })));
};

exports.updateTimelineIsLive = updateTimelineIsLive;

var updateTimelineProviders = function updateTimelineProviders(_ref22) {
  var id = _ref22.id,
      providers = _ref22.providers,
      timelineById = _ref22.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: providers
  })));
};

exports.updateTimelineProviders = updateTimelineProviders;

var updateTimelineRange = function updateTimelineRange(_ref23) {
  var id = _ref23.id,
      start = _ref23.start,
      end = _ref23.end,
      timelineById = _ref23.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dateRange: {
      start: start,
      end: end
    }
  })));
};

exports.updateTimelineRange = updateTimelineRange;

var updateTimelineSort = function updateTimelineSort(_ref24) {
  var id = _ref24.id,
      sort = _ref24.sort,
      timelineById = _ref24.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    sort: sort
  })));
};

exports.updateTimelineSort = updateTimelineSort;

var updateEnabledAndProvider = function updateEnabledAndProvider(andProviderId, enabled, providerId, timeline) {
  return timeline.dataProviders.map(function (provider) {
    return provider.id === providerId ? _objectSpread({}, provider, {
      and: provider.and.map(function (andProvider) {
        return andProvider.id === andProviderId ? _objectSpread({}, andProvider, {
          enabled: enabled
        }) : andProvider;
      })
    }) : provider;
  });
};

var updateEnabledProvider = function updateEnabledProvider(enabled, providerId, timeline) {
  return timeline.dataProviders.map(function (provider) {
    return provider.id === providerId ? _objectSpread({}, provider, {
      enabled: enabled
    }) : provider;
  });
};

var updateTimelineProviderEnabled = function updateTimelineProviderEnabled(_ref25) {
  var id = _ref25.id,
      providerId = _ref25.providerId,
      enabled = _ref25.enabled,
      timelineById = _ref25.timelineById,
      andProviderId = _ref25.andProviderId;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: andProviderId ? updateEnabledAndProvider(andProviderId, enabled, providerId, timeline) : updateEnabledProvider(enabled, providerId, timeline)
  })));
};

exports.updateTimelineProviderEnabled = updateTimelineProviderEnabled;

var updateExcludedAndProvider = function updateExcludedAndProvider(andProviderId, excluded, providerId, timeline) {
  return timeline.dataProviders.map(function (provider) {
    return provider.id === providerId ? _objectSpread({}, provider, {
      and: provider.and.map(function (andProvider) {
        return andProvider.id === andProviderId ? _objectSpread({}, andProvider, {
          excluded: excluded
        }) : andProvider;
      })
    }) : provider;
  });
};

var updateExcludedProvider = function updateExcludedProvider(excluded, providerId, timeline) {
  return timeline.dataProviders.map(function (provider) {
    return provider.id === providerId ? _objectSpread({}, provider, {
      excluded: excluded
    }) : provider;
  });
};

var updateTimelineProviderExcluded = function updateTimelineProviderExcluded(_ref26) {
  var id = _ref26.id,
      providerId = _ref26.providerId,
      excluded = _ref26.excluded,
      timelineById = _ref26.timelineById,
      andProviderId = _ref26.andProviderId;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: andProviderId ? updateExcludedAndProvider(andProviderId, excluded, providerId, timeline) : updateExcludedProvider(excluded, providerId, timeline)
  })));
};

exports.updateTimelineProviderExcluded = updateTimelineProviderExcluded;

var updateProviderProperties = function updateProviderProperties(_ref27) {
  var excluded = _ref27.excluded,
      field = _ref27.field,
      operator = _ref27.operator,
      providerId = _ref27.providerId,
      timeline = _ref27.timeline,
      value = _ref27.value;
  return timeline.dataProviders.map(function (provider) {
    return provider.id === providerId ? _objectSpread({}, provider, {
      excluded: excluded,
      queryMatch: _objectSpread({}, provider.queryMatch, {
        field: field,
        displayField: field,
        value: value,
        displayValue: value,
        operator: operator
      })
    }) : provider;
  });
};

var updateAndProviderProperties = function updateAndProviderProperties(_ref28) {
  var andProviderId = _ref28.andProviderId,
      excluded = _ref28.excluded,
      field = _ref28.field,
      operator = _ref28.operator,
      providerId = _ref28.providerId,
      timeline = _ref28.timeline,
      value = _ref28.value;
  return timeline.dataProviders.map(function (provider) {
    return provider.id === providerId ? _objectSpread({}, provider, {
      and: provider.and.map(function (andProvider) {
        return andProvider.id === andProviderId ? _objectSpread({}, andProvider, {
          excluded: excluded,
          queryMatch: _objectSpread({}, andProvider.queryMatch, {
            field: field,
            displayField: field,
            value: value,
            displayValue: value,
            operator: operator
          })
        }) : andProvider;
      })
    }) : provider;
  });
};

var updateTimelineProviderProperties = function updateTimelineProviderProperties(_ref29) {
  var andProviderId = _ref29.andProviderId,
      excluded = _ref29.excluded,
      field = _ref29.field,
      id = _ref29.id,
      operator = _ref29.operator,
      providerId = _ref29.providerId,
      timelineById = _ref29.timelineById,
      value = _ref29.value;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: andProviderId ? updateAndProviderProperties({
      andProviderId: andProviderId,
      excluded: excluded,
      field: field,
      operator: operator,
      providerId: providerId,
      timeline: timeline,
      value: value
    }) : updateProviderProperties({
      excluded: excluded,
      field: field,
      operator: operator,
      providerId: providerId,
      timeline: timeline,
      value: value
    })
  })));
};

exports.updateTimelineProviderProperties = updateTimelineProviderProperties;

var updateTimelineProviderKqlQuery = function updateTimelineProviderKqlQuery(_ref30) {
  var id = _ref30.id,
      providerId = _ref30.providerId,
      kqlQuery = _ref30.kqlQuery,
      timelineById = _ref30.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: timeline.dataProviders.map(function (provider) {
      return provider.id === providerId ? _objectSpread({}, provider, {}, {
        kqlQuery: kqlQuery
      }) : provider;
    })
  })));
};

exports.updateTimelineProviderKqlQuery = updateTimelineProviderKqlQuery;

var updateTimelineItemsPerPage = function updateTimelineItemsPerPage(_ref31) {
  var id = _ref31.id,
      itemsPerPage = _ref31.itemsPerPage,
      timelineById = _ref31.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    itemsPerPage: itemsPerPage
  })));
};

exports.updateTimelineItemsPerPage = updateTimelineItemsPerPage;

var updateTimelinePageIndex = function updateTimelinePageIndex(_ref32) {
  var id = _ref32.id,
      activePage = _ref32.activePage,
      timelineById = _ref32.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    activePage: activePage
  })));
};

exports.updateTimelinePageIndex = updateTimelinePageIndex;

var updateTimelinePerPageOptions = function updateTimelinePerPageOptions(_ref33) {
  var id = _ref33.id,
      itemsPerPageOptions = _ref33.itemsPerPageOptions,
      timelineById = _ref33.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    itemsPerPageOptions: itemsPerPageOptions
  })));
};

exports.updateTimelinePerPageOptions = updateTimelinePerPageOptions;

var removeAndProvider = function removeAndProvider(andProviderId, providerId, timeline) {
  var providerIndex = timeline.dataProviders.findIndex(function (p) {
    return p.id === providerId;
  });
  var providerAndIndex = timeline.dataProviders[providerIndex].and.findIndex(function (p) {
    return p.id === andProviderId;
  });
  return [].concat(_toConsumableArray(timeline.dataProviders.slice(0, providerIndex)), [_objectSpread({}, timeline.dataProviders[providerIndex], {
    and: [].concat(_toConsumableArray(timeline.dataProviders[providerIndex].and.slice(0, providerAndIndex)), _toConsumableArray(timeline.dataProviders[providerIndex].and.slice(providerAndIndex + 1)))
  })], _toConsumableArray(timeline.dataProviders.slice(providerIndex + 1)));
};

var removeProvider = function removeProvider(providerId, timeline) {
  var providerIndex = timeline.dataProviders.findIndex(function (p) {
    return p.id === providerId;
  });
  return [].concat(_toConsumableArray(timeline.dataProviders.slice(0, providerIndex)), _toConsumableArray(timeline.dataProviders[providerIndex].and.length ? [_objectSpread({}, timeline.dataProviders[providerIndex].and.slice(0, 1)[0], {
    and: _toConsumableArray(timeline.dataProviders[providerIndex].and.slice(1))
  })] : []), _toConsumableArray(timeline.dataProviders.slice(providerIndex + 1)));
};

var removeTimelineProvider = function removeTimelineProvider(_ref34) {
  var id = _ref34.id,
      providerId = _ref34.providerId,
      timelineById = _ref34.timelineById,
      andProviderId = _ref34.andProviderId;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    dataProviders: andProviderId ? removeAndProvider(andProviderId, providerId, timeline) : removeProvider(providerId, timeline)
  })));
};

exports.removeTimelineProvider = removeTimelineProvider;

var setDeletedTimelineEvents = function setDeletedTimelineEvents(_ref35) {
  var id = _ref35.id,
      eventIds = _ref35.eventIds,
      isDeleted = _ref35.isDeleted,
      timelineById = _ref35.timelineById;
  var timeline = timelineById[id];
  var deletedEventIds = isDeleted ? (0, _fp.union)(timeline.deletedEventIds, eventIds) : timeline.deletedEventIds.filter(function (currentEventId) {
    return !eventIds.includes(currentEventId);
  });
  var selectedEventIds = Object.fromEntries(Object.entries(timeline.selectedEventIds).filter(function (_ref36) {
    var _ref37 = _slicedToArray(_ref36, 1),
        selectedEventId = _ref37[0];

    return !deletedEventIds.includes(selectedEventId);
  }));
  var isSelectAllChecked = Object.keys(selectedEventIds).length > 0 ? timeline.isSelectAllChecked : false;
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    deletedEventIds: deletedEventIds,
    selectedEventIds: selectedEventIds,
    isSelectAllChecked: isSelectAllChecked
  })));
};

exports.setDeletedTimelineEvents = setDeletedTimelineEvents;

var setLoadingTimelineEvents = function setLoadingTimelineEvents(_ref38) {
  var id = _ref38.id,
      eventIds = _ref38.eventIds,
      isLoading = _ref38.isLoading,
      timelineById = _ref38.timelineById;
  var timeline = timelineById[id];
  var loadingEventIds = isLoading ? (0, _fp.union)(timeline.loadingEventIds, eventIds) : timeline.loadingEventIds.filter(function (currentEventId) {
    return !eventIds.includes(currentEventId);
  });
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    loadingEventIds: loadingEventIds
  })));
};

exports.setLoadingTimelineEvents = setLoadingTimelineEvents;

var setSelectedTimelineEvents = function setSelectedTimelineEvents(_ref39) {
  var id = _ref39.id,
      eventIds = _ref39.eventIds,
      _ref39$isSelectAllChe = _ref39.isSelectAllChecked,
      isSelectAllChecked = _ref39$isSelectAllChe === void 0 ? false : _ref39$isSelectAllChe,
      isSelected = _ref39.isSelected,
      timelineById = _ref39.timelineById;
  var timeline = timelineById[id];
  var selectedEventIds = isSelected ? _objectSpread({}, timeline.selectedEventIds, {}, eventIds) : (0, _fp.omit)(Object.keys(eventIds), timeline.selectedEventIds);
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    selectedEventIds: selectedEventIds,
    isSelectAllChecked: isSelectAllChecked
  })));
};

exports.setSelectedTimelineEvents = setSelectedTimelineEvents;

var unPinTimelineEvent = function unPinTimelineEvent(_ref40) {
  var id = _ref40.id,
      eventId = _ref40.eventId,
      timelineById = _ref40.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    pinnedEventIds: (0, _fp.omit)(eventId, timeline.pinnedEventIds)
  })));
};

exports.unPinTimelineEvent = unPinTimelineEvent;

var updateHighlightedDropAndProvider = function updateHighlightedDropAndProvider(_ref41) {
  var id = _ref41.id,
      providerId = _ref41.providerId,
      timelineById = _ref41.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    highlightedDropAndProviderId: providerId
  })));
};

exports.updateHighlightedDropAndProvider = updateHighlightedDropAndProvider;

var updateSavedQuery = function updateSavedQuery(_ref42) {
  var id = _ref42.id,
      savedQueryId = _ref42.savedQueryId,
      timelineById = _ref42.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    savedQueryId: savedQueryId
  })));
};

exports.updateSavedQuery = updateSavedQuery;

var updateFilters = function updateFilters(_ref43) {
  var id = _ref43.id,
      filters = _ref43.filters,
      timelineById = _ref43.timelineById;
  var timeline = timelineById[id];
  return _objectSpread({}, timelineById, _defineProperty({}, id, _objectSpread({}, timeline, {
    filters: filters
  })));
};

exports.updateFilters = updateFilters;