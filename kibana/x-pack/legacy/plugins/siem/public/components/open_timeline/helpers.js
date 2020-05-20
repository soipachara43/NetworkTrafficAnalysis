"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchUpdateTimeline = exports.queryTimelineById = exports.formatTimelineResultToModel = exports.defaultTimelineToTimelineModel = exports.omitTypenameInTimeline = exports.isUntitled = exports.getNotesCount = exports.getPinnedEventCount = exports.OPEN_TIMELINE_CLASS_NAME = void 0;

var _fp = require("lodash/fp");

var _uuid = _interopRequireDefault(require("uuid"));

var _index = require("../../containers/timeline/one/index.gql_query");

var _actions = require("../../store/app/actions");

var _actions2 = require("../../store/inputs/actions");

var _actions3 = require("../../store/timeline/actions");

var _defaults = require("../../store/timeline/defaults");

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _constants = require("../timeline/body/constants");

var _default_date_settings = require("../../utils/default_date_settings");

var _helpers = require("../notes/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OPEN_TIMELINE_CLASS_NAME = 'open-timeline';
/** Returns a count of the pinned events in a timeline */

exports.OPEN_TIMELINE_CLASS_NAME = OPEN_TIMELINE_CLASS_NAME;

var getPinnedEventCount = function getPinnedEventCount(_ref) {
  var pinnedEventIds = _ref.pinnedEventIds;
  return pinnedEventIds != null ? Object.keys(pinnedEventIds).length : 0;
};
/** Returns the sum of all notes added to pinned events and notes applicable to the timeline */


exports.getPinnedEventCount = getPinnedEventCount;

var getNotesCount = function getNotesCount(_ref2) {
  var eventIdToNoteIds = _ref2.eventIdToNoteIds,
      noteIds = _ref2.noteIds;
  var eventNoteCount = eventIdToNoteIds != null ? Object.keys(eventIdToNoteIds).reduce(function (count, eventId) {
    return count + eventIdToNoteIds[eventId].length;
  }, 0) : 0;
  var globalNoteCount = noteIds != null ? noteIds.length : 0;
  return eventNoteCount + globalNoteCount;
};
/** Returns true if the timeline is untitlied */


exports.getNotesCount = getNotesCount;

var isUntitled = function isUntitled(_ref3) {
  var title = _ref3.title;
  return title == null || title.trim().length === 0;
};

exports.isUntitled = isUntitled;

var omitTypename = function omitTypename(key, value) {
  return key === '__typename' ? undefined : value;
};

var omitTypenameInTimeline = function omitTypenameInTimeline(timeline) {
  return JSON.parse(JSON.stringify(timeline), omitTypename);
};

exports.omitTypenameInTimeline = omitTypenameInTimeline;

var parseString = function parseString(params) {
  try {
    return JSON.parse(params);
  } catch (_unused) {
    return params;
  }
};

var defaultTimelineToTimelineModel = function defaultTimelineToTimelineModel(timeline, duplicate) {
  return Object.entries(_objectSpread({}, timeline, {
    columns: timeline.columns != null ? timeline.columns.map(function (col) {
      var timelineCols = _objectSpread({}, col, {
        columnHeaderType: _default_headers.defaultColumnHeaderType,
        id: col.id != null ? col.id : 'unknown',
        placeholder: col.placeholder != null ? col.placeholder : undefined,
        category: col.category != null ? col.category : undefined,
        description: col.description != null ? col.description : undefined,
        example: col.example != null ? col.example : undefined,
        type: col.type != null ? col.type : undefined,
        aggregatable: col.aggregatable != null ? col.aggregatable : undefined,
        width: col.id === '@timestamp' ? _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH : _constants.DEFAULT_COLUMN_MIN_WIDTH
      });

      return timelineCols;
    }) : _default_headers.defaultHeaders,
    eventIdToNoteIds: duplicate ? {} : timeline.eventIdToNoteIds != null ? timeline.eventIdToNoteIds.reduce(function (acc, note) {
      if (note.eventId != null) {
        var eventNotes = (0, _fp.getOr)([], note.eventId, acc);
        return _objectSpread({}, acc, _defineProperty({}, note.eventId, [].concat(_toConsumableArray(eventNotes), [note.noteId])));
      }

      return acc;
    }, {}) : {},
    filters: timeline.filters != null ? timeline.filters.map(function (filter) {
      return _objectSpread({
        $state: {
          store: 'appState'
        },
        meta: _objectSpread({}, filter.meta, {}, filter.meta && filter.meta.field != null ? {
          params: parseString(filter.meta.field)
        } : {}, {}, filter.meta && filter.meta.params != null ? {
          params: parseString(filter.meta.params)
        } : {}, {}, filter.meta && filter.meta.value != null ? {
          value: parseString(filter.meta.value)
        } : {})
      }, filter.exists != null ? {
        exists: parseString(filter.exists)
      } : {}, {}, filter.match_all != null ? {
        exists: parseString(filter.match_all)
      } : {}, {}, filter.missing != null ? {
        exists: parseString(filter.missing)
      } : {}, {}, filter.query != null ? {
        query: parseString(filter.query)
      } : {}, {}, filter.range != null ? {
        range: parseString(filter.range)
      } : {}, {}, filter.script != null ? {
        exists: parseString(filter.script)
      } : {});
    }) : [],
    isFavorite: duplicate ? false : timeline.favorite != null ? timeline.favorite.length > 0 : false,
    noteIds: duplicate ? [] : timeline.noteIds != null ? timeline.noteIds : [],
    pinnedEventIds: duplicate ? {} : timeline.pinnedEventIds != null ? timeline.pinnedEventIds.reduce(function (acc, pinnedEventId) {
      return _objectSpread({}, acc, _defineProperty({}, pinnedEventId, true));
    }, {}) : {},
    pinnedEventsSaveObject: duplicate ? {} : timeline.pinnedEventsSaveObject != null ? timeline.pinnedEventsSaveObject.reduce(function (acc, pinnedEvent) {
      return _objectSpread({}, acc, {}, pinnedEvent.eventId != null ? _defineProperty({}, pinnedEvent.eventId, pinnedEvent) : {});
    }, {}) : {},
    id: duplicate ? '' : timeline.savedObjectId,
    savedObjectId: duplicate ? null : timeline.savedObjectId,
    version: duplicate ? null : timeline.version,
    title: duplicate ? '' : timeline.title || ''
  })).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    return value != null ? (0, _fp.set)(key, value, acc) : acc;
  }, _objectSpread({}, _defaults.timelineDefaults, {
    id: ''
  }));
};

exports.defaultTimelineToTimelineModel = defaultTimelineToTimelineModel;

var formatTimelineResultToModel = function formatTimelineResultToModel(timelineToOpen) {
  var duplicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var notes = timelineToOpen.notes,
      timelineModel = _objectWithoutProperties(timelineToOpen, ["notes"]);

  return {
    notes: notes,
    timeline: defaultTimelineToTimelineModel(timelineModel, duplicate)
  };
};

exports.formatTimelineResultToModel = formatTimelineResultToModel;

var queryTimelineById = function queryTimelineById(_ref7) {
  var apolloClient = _ref7.apolloClient,
      _ref7$duplicate = _ref7.duplicate,
      duplicate = _ref7$duplicate === void 0 ? false : _ref7$duplicate,
      timelineId = _ref7.timelineId,
      onOpenTimeline = _ref7.onOpenTimeline,
      _ref7$openTimeline = _ref7.openTimeline,
      openTimeline = _ref7$openTimeline === void 0 ? true : _ref7$openTimeline,
      updateIsLoading = _ref7.updateIsLoading,
      updateTimeline = _ref7.updateTimeline;
  updateIsLoading({
    id: 'timeline-1',
    isLoading: true
  });

  if (apolloClient) {
    apolloClient.query({
      query: _index.oneTimelineQuery,
      fetchPolicy: 'no-cache',
      variables: {
        id: timelineId
      }
    }) // eslint-disable-next-line
    .then(function (result) {
      var timelineToOpen = omitTypenameInTimeline((0, _fp.getOr)({}, 'data.getOneTimeline', result));

      var _formatTimelineResult = formatTimelineResultToModel(timelineToOpen, duplicate),
          timeline = _formatTimelineResult.timeline,
          notes = _formatTimelineResult.notes;

      if (onOpenTimeline != null) {
        onOpenTimeline(timeline);
      } else if (updateTimeline) {
        var _getTimeRangeSettings = (0, _default_date_settings.getTimeRangeSettings)(),
            from = _getTimeRangeSettings.from,
            to = _getTimeRangeSettings.to;

        updateTimeline({
          duplicate: duplicate,
          from: (0, _fp.getOr)(from, 'dateRange.start', timeline),
          id: 'timeline-1',
          notes: notes,
          timeline: _objectSpread({}, timeline, {
            show: openTimeline
          }),
          to: (0, _fp.getOr)(to, 'dateRange.end', timeline)
        })();
      }
    }).finally(function () {
      updateIsLoading({
        id: 'timeline-1',
        isLoading: false
      });
    });
  }
};

exports.queryTimelineById = queryTimelineById;

var dispatchUpdateTimeline = function dispatchUpdateTimeline(dispatch) {
  return function (_ref8) {
    var duplicate = _ref8.duplicate,
        id = _ref8.id,
        from = _ref8.from,
        notes = _ref8.notes,
        timeline = _ref8.timeline,
        to = _ref8.to,
        ruleNote = _ref8.ruleNote;
    return function () {
      dispatch((0, _actions2.setTimelineRangeDatePicker)({
        from: from,
        to: to
      }));
      dispatch((0, _actions3.addTimeline)({
        id: id,
        timeline: timeline
      }));

      if (timeline.kqlQuery != null && timeline.kqlQuery.filterQuery != null && timeline.kqlQuery.filterQuery.kuery != null && timeline.kqlQuery.filterQuery.kuery.expression !== '') {
        dispatch((0, _actions3.setKqlFilterQueryDraft)({
          id: id,
          filterQueryDraft: {
            kind: 'kuery',
            expression: timeline.kqlQuery.filterQuery.kuery.expression || ''
          }
        }));
        dispatch((0, _actions3.applyKqlFilterQuery)({
          id: id,
          filterQuery: {
            kuery: {
              kind: 'kuery',
              expression: timeline.kqlQuery.filterQuery.kuery.expression || ''
            },
            serializedQuery: timeline.kqlQuery.filterQuery.serializedQuery || ''
          }
        }));
      }

      if (duplicate && ruleNote != null && !(0, _fp.isEmpty)(ruleNote)) {
        var getNewNoteId = function getNewNoteId() {
          return _uuid.default.v4();
        };

        var newNote = (0, _helpers.createNote)({
          newNote: ruleNote,
          getNewNoteId: getNewNoteId
        });
        dispatch((0, _actions.updateNote)({
          note: newNote
        }));
        dispatch((0, _actions3.addNote)({
          noteId: newNote.id,
          id: id
        }));
      }

      if (!duplicate) {
        dispatch((0, _actions.addNotes)({
          notes: notes != null ? notes.map(function (note) {
            return {
              created: note.created != null ? new Date(note.created) : new Date(),
              id: note.noteId,
              lastEdit: note.updated != null ? new Date(note.updated) : new Date(),
              note: note.note || '',
              user: note.updatedBy || 'unknown',
              saveObjectId: note.noteId,
              version: note.version
            };
          }) : []
        }));
      }
    };
  };
};

exports.dispatchUpdateTimeline = dispatchUpdateTimeline;