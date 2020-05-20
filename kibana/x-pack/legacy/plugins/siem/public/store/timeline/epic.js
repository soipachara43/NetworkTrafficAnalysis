"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTimelineAsInput = exports.createTimelineEpic = void 0;

var _fp = require("lodash/fp");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _public = require("../../../../../../../src/plugins/data/public");

var _persist = require("../../containers/timeline/persist.gql_query");

var _actions = require("../app/actions");

var _actions2 = require("./actions");

var _epic_note = require("./epic_note");

var _epic_pinned_event = require("./epic_pinned_event");

var _epic_favorite = require("./epic_favorite");

var _helpers = require("./helpers");

var _epic_dispatcher_timeline_persistence_queue = require("./epic_dispatcher_timeline_persistence_queue");

var _refetch_queries = require("./refetch_queries");

var _my_epic_timeline_id = require("./my_epic_timeline_id");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var timelineActionsType = [_actions2.applyKqlFilterQuery.type, _actions2.addProvider.type, _actions2.dataProviderEdited.type, _actions2.removeColumn.type, _actions2.removeProvider.type, _actions2.setFilters.type, _actions2.setSavedQueryId.type, _actions2.updateColumns.type, _actions2.updateDataProviderEnabled.type, _actions2.updateDataProviderExcluded.type, _actions2.updateDataProviderKqlQuery.type, _actions2.updateDescription.type, _actions2.updateEventType.type, _actions2.updateKqlMode.type, _actions2.updateProviders.type, _actions2.updateSort.type, _actions2.updateTitle.type, _actions2.updateRange.type, _actions2.upsertColumn.type];

var isItAtimelineAction = function isItAtimelineAction(timelineId) {
  return timelineId && timelineId.toLowerCase().startsWith('timeline');
};

var createTimelineEpic = function createTimelineEpic() {
  return function (action$, state$, _ref) {
    var selectNotesByIdSelector = _ref.selectNotesByIdSelector,
        timelineByIdSelector = _ref.timelineByIdSelector,
        timelineTimeRangeSelector = _ref.timelineTimeRangeSelector,
        apolloClient$ = _ref.apolloClient$;
    var timeline$ = state$.pipe((0, _operators.map)(timelineByIdSelector), (0, _operators.filter)(_helpers.isNotNull));
    var notes$ = state$.pipe((0, _operators.map)(selectNotesByIdSelector), (0, _operators.filter)(_helpers.isNotNull));
    var timelineTimeRange$ = state$.pipe((0, _operators.map)(timelineTimeRangeSelector), (0, _operators.filter)(_helpers.isNotNull));
    return (0, _rxjs.merge)(action$.pipe((0, _operators.withLatestFrom)(timeline$), (0, _operators.filter)(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          action = _ref3[0],
          timeline = _ref3[1];

      var timelineId = (0, _fp.get)('payload.id', action);
      var timelineObj = timeline[timelineId];

      if (action.type === _actions.addError.type) {
        return true;
      }

      if (action.type === _actions2.createTimeline.type && isItAtimelineAction(timelineId)) {
        _my_epic_timeline_id.myEpicTimelineId.setTimelineId(null);

        _my_epic_timeline_id.myEpicTimelineId.setTimelineVersion(null);
      } else if (action.type === _actions2.addTimeline.type && isItAtimelineAction(timelineId)) {
        var addNewTimeline = (0, _fp.get)('payload.timeline', action);

        _my_epic_timeline_id.myEpicTimelineId.setTimelineId(addNewTimeline.savedObjectId);

        _my_epic_timeline_id.myEpicTimelineId.setTimelineVersion(addNewTimeline.version);

        return true;
      } else if (timelineActionsType.includes(action.type) && !timelineObj.isLoading && isItAtimelineAction(timelineId)) {
        return true;
      }

      return false;
    }), (0, _operators.debounceTime)(500), (0, _operators.mergeMap)(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
          action = _ref5[0];

      _epic_dispatcher_timeline_persistence_queue.dispatcherTimelinePersistQueue.next({
        action: action
      });

      return (0, _rxjs.empty)();
    })), _epic_dispatcher_timeline_persistence_queue.dispatcherTimelinePersistQueue.pipe((0, _operators.delay)(500), (0, _operators.withLatestFrom)(timeline$, apolloClient$, notes$, timelineTimeRange$), (0, _operators.concatMap)(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 5),
          objAction = _ref7[0],
          timeline = _ref7[1],
          apolloClient = _ref7[2],
          notes = _ref7[3],
          timelineTimeRange = _ref7[4];

      var action = (0, _fp.get)('action', objAction);

      var timelineId = _my_epic_timeline_id.myEpicTimelineId.getTimelineId();

      var version = _my_epic_timeline_id.myEpicTimelineId.getTimelineVersion();

      if (_epic_note.timelineNoteActionsType.includes(action.type)) {
        return (0, _epic_note.epicPersistNote)(apolloClient, action, timeline, notes, action$, timeline$, notes$);
      } else if (_epic_pinned_event.timelinePinnedEventActionsType.includes(action.type)) {
        return (0, _epic_pinned_event.epicPersistPinnedEvent)(apolloClient, action, timeline, action$, timeline$);
      } else if (_epic_favorite.timelineFavoriteActionsType.includes(action.type)) {
        return (0, _epic_favorite.epicPersistTimelineFavorite)(apolloClient, action, timeline, action$, timeline$);
      } else if (timelineActionsType.includes(action.type)) {
        return (0, _rxjs.from)(apolloClient.mutate({
          mutation: _persist.persistTimelineMutation,
          fetchPolicy: 'no-cache',
          variables: {
            timelineId: timelineId,
            version: version,
            timeline: convertTimelineAsInput(timeline[action.payload.id], timelineTimeRange)
          },
          refetchQueries: _refetch_queries.refetchQueries
        })).pipe((0, _operators.withLatestFrom)(timeline$), (0, _operators.mergeMap)(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              result = _ref9[0],
              recentTimeline = _ref9[1];

          var savedTimeline = recentTimeline[action.payload.id];
          var response = (0, _fp.get)('data.persistTimeline', result);
          var callOutMsg = response.code === 403 ? [(0, _actions2.showCallOutUnauthorizedMsg)()] : [];
          return [response.code === 409 ? (0, _actions2.updateAutoSaveMsg)({
            timelineId: action.payload.id,
            newTimelineModel: omitTypenameInTimeline(savedTimeline, response.timeline)
          }) : (0, _actions2.updateTimeline)({
            id: action.payload.id,
            timeline: _objectSpread({}, savedTimeline, {
              savedObjectId: response.timeline.savedObjectId,
              version: response.timeline.version,
              isSaving: false
            })
          })].concat(callOutMsg, [(0, _actions2.endTimelineSaving)({
            id: action.payload.id
          })]);
        }), (0, _operators.startWith)((0, _actions2.startTimelineSaving)({
          id: action.payload.id
        })), (0, _operators.takeUntil)(action$.pipe((0, _operators.withLatestFrom)(timeline$), (0, _operators.filter)(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
              checkAction = _ref11[0],
              updatedTimeline = _ref11[1];

          if (checkAction.type === _actions2.endTimelineSaving.type && updatedTimeline[(0, _fp.get)('payload.id', checkAction)].savedObjectId != null) {
            _my_epic_timeline_id.myEpicTimelineId.setTimelineId(updatedTimeline[(0, _fp.get)('payload.id', checkAction)].savedObjectId);

            _my_epic_timeline_id.myEpicTimelineId.setTimelineVersion(updatedTimeline[(0, _fp.get)('payload.id', checkAction)].version);

            return true;
          }

          return false;
        }))));
      }

      return (0, _rxjs.empty)();
    })));
  };
};

exports.createTimelineEpic = createTimelineEpic;
var timelineInput = {
  columns: null,
  dataProviders: null,
  description: null,
  eventType: null,
  filters: null,
  kqlMode: null,
  kqlQuery: null,
  title: null,
  dateRange: null,
  savedQueryId: null,
  sort: null
};

var convertTimelineAsInput = function convertTimelineAsInput(timeline, timelineTimeRange) {
  return Object.keys(timelineInput).reduce(function (acc, key) {
    if ((0, _fp.has)(key, timeline)) {
      if (key === 'kqlQuery') {
        return (0, _fp.set)("".concat(key, ".filterQuery"), (0, _fp.get)("".concat(key, ".filterQuery"), timeline), acc);
      } else if (key === 'dateRange') {
        return (0, _fp.set)("".concat(key), {
          start: timelineTimeRange.from,
          end: timelineTimeRange.to
        }, acc);
      } else if (key === 'columns' && (0, _fp.get)(key, timeline) != null) {
        return (0, _fp.set)(key, (0, _fp.get)(key, timeline).map(function (col) {
          return (0, _fp.omit)(['width', '__typename'], col);
        }), acc);
      } else if (key === 'filters' && (0, _fp.get)(key, timeline) != null) {
        var filters = (0, _fp.get)(key, timeline);
        return (0, _fp.set)(key, filters != null ? filters.map(function (myFilter) {
          var basicFilter = (0, _fp.omit)(['$state'], myFilter);
          return _objectSpread({}, basicFilter, {
            meta: _objectSpread({}, basicFilter.meta, {
              field: (_public.esFilters.isMatchAllFilter(basicFilter) || _public.esFilters.isPhraseFilter(basicFilter) || _public.esFilters.isPhrasesFilter(basicFilter) || _public.esFilters.isRangeFilter(basicFilter)) && basicFilter.meta.field != null ? convertToString(basicFilter.meta.field) : null,
              value: basicFilter.meta.value != null ? convertToString(basicFilter.meta.value) : null,
              params: basicFilter.meta.params != null ? convertToString(basicFilter.meta.params) : null
            })
          }, _public.esFilters.isMatchAllFilter(basicFilter) ? {
            match_all: convertToString(basicFilter.match_all)
          } : {
            match_all: null
          }, {}, _public.esFilters.isMissingFilter(basicFilter) && basicFilter.missing != null ? {
            missing: convertToString(basicFilter.missing)
          } : {
            missing: null
          }, {}, _public.esFilters.isExistsFilter(basicFilter) && basicFilter.exists != null ? {
            exists: convertToString(basicFilter.exists)
          } : {
            exists: null
          }, {}, (_public.esFilters.isQueryStringFilter(basicFilter) || (0, _fp.get)('query', basicFilter) != null) && basicFilter.query != null ? {
            query: convertToString(basicFilter.query)
          } : {
            query: null
          }, {}, _public.esFilters.isRangeFilter(basicFilter) && basicFilter.range != null ? {
            range: convertToString(basicFilter.range)
          } : {
            range: null
          }, {}, _public.esFilters.isRangeFilter(basicFilter) && basicFilter.script != null
          /* TODO remove it when PR50713 is merged || esFilters.isPhraseFilter(basicFilter) */
          ? {
            script: convertToString(basicFilter.script)
          } : {
            script: null
          });
        }) : [], acc);
      }

      return (0, _fp.set)(key, (0, _fp.get)(key, timeline), acc);
    }

    return acc;
  }, timelineInput);
};

exports.convertTimelineAsInput = convertTimelineAsInput;

var omitTypename = function omitTypename(key, value) {
  return key === '__typename' ? undefined : value;
};

var omitTypenameInTimeline = function omitTypenameInTimeline(oldTimeline, newTimeline) {
  return JSON.parse(JSON.stringify((0, _fp.merge)(oldTimeline, newTimeline)), omitTypename);
};

var convertToString = function convertToString(obj) {
  try {
    if ((0, _fp.isObject)(obj)) {
      return JSON.stringify(obj);
    }

    return (0, _fp.toString)(obj);
  } catch (_unused) {
    return '';
  }
};