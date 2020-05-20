"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimelineFavoriteEpic = exports.epicPersistTimelineFavorite = exports.timelineFavoriteActionsType = void 0;

var _fp = require("lodash/fp");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _persist = require("../../containers/timeline/favorite/persist.gql_query");

var _actions = require("../app/actions");

var _actions2 = require("./actions");

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

var timelineFavoriteActionsType = [_actions2.updateIsFavorite.type];
exports.timelineFavoriteActionsType = timelineFavoriteActionsType;

var epicPersistTimelineFavorite = function epicPersistTimelineFavorite(apolloClient, action, timeline, action$, timeline$) {
  return (0, _rxjs.from)(apolloClient.mutate({
    mutation: _persist.persistTimelineFavoriteMutation,
    fetchPolicy: 'no-cache',
    variables: {
      timelineId: _my_epic_timeline_id.myEpicTimelineId.getTimelineId()
    },
    refetchQueries: _refetch_queries.refetchQueries
  })).pipe((0, _operators.withLatestFrom)(timeline$), (0, _operators.mergeMap)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        result = _ref2[0],
        recentTimelines = _ref2[1];

    var savedTimeline = recentTimelines[action.payload.id];
    var response = (0, _fp.get)('data.persistFavorite', result);
    var callOutMsg = response.code === 403 ? [(0, _actions2.showCallOutUnauthorizedMsg)()] : [];
    return [].concat(callOutMsg, [(0, _actions2.updateTimeline)({
      id: action.payload.id,
      timeline: _objectSpread({}, savedTimeline, {
        isFavorite: response.favorite != null && response.favorite.length > 0,
        savedObjectId: response.savedObjectId || null,
        version: response.version || null
      })
    }), (0, _actions2.endTimelineSaving)({
      id: action.payload.id
    })]);
  }), (0, _operators.startWith)((0, _actions2.startTimelineSaving)({
    id: action.payload.id
  })), (0, _operators.takeUntil)(action$.pipe((0, _operators.withLatestFrom)(timeline$), (0, _operators.filter)(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        checkAction = _ref4[0],
        updatedTimeline = _ref4[1];

    if (checkAction.type === _actions.addError.type) {
      return true;
    }

    if (checkAction.type === _actions2.endTimelineSaving.type && updatedTimeline[(0, _fp.get)('payload.id', checkAction)].savedObjectId != null) {
      _my_epic_timeline_id.myEpicTimelineId.setTimelineId(updatedTimeline[(0, _fp.get)('payload.id', checkAction)].savedObjectId);

      _my_epic_timeline_id.myEpicTimelineId.setTimelineVersion(updatedTimeline[(0, _fp.get)('payload.id', checkAction)].version);

      return true;
    }

    return false;
  }))));
};

exports.epicPersistTimelineFavorite = epicPersistTimelineFavorite;

var createTimelineFavoriteEpic = function createTimelineFavoriteEpic() {
  return function (action$) {
    return action$.pipe((0, _operators.filter)(function (action) {
      return timelineFavoriteActionsType.includes(action.type);
    }), (0, _operators.mergeMap)(function (action) {
      _epic_dispatcher_timeline_persistence_queue.dispatcherTimelinePersistQueue.next({
        action: action
      });

      return (0, _rxjs.empty)();
    }));
  };
};

exports.createTimelineFavoriteEpic = createTimelineFavoriteEpic;