"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllTimelinesQuery = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _reactApollo = require("react-apollo");

var _index = require("./index.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAllTimeline = (0, _memoizeOne.default)(function (variables, timelines) {
  return timelines.map(function (timeline) {
    return {
      created: timeline.created,
      description: timeline.description,
      eventIdToNoteIds: timeline.eventIdToNoteIds != null ? timeline.eventIdToNoteIds.reduce(function (acc, note) {
        if (note.eventId != null) {
          var notes = (0, _fp.getOr)([], note.eventId, acc);
          return _objectSpread({}, acc, _defineProperty({}, note.eventId, [].concat(_toConsumableArray(notes), [note.noteId])));
        }

        return acc;
      }, {}) : null,
      favorite: timeline.favorite,
      noteIds: timeline.noteIds,
      notes: timeline.notes != null ? timeline.notes.map(function (note) {
        return _objectSpread({}, note, {
          savedObjectId: note.noteId
        });
      }) : null,
      pinnedEventIds: timeline.pinnedEventIds != null ? timeline.pinnedEventIds.reduce(function (acc, pinnedEventId) {
        return _objectSpread({}, acc, _defineProperty({}, pinnedEventId, true));
      }, {}) : null,
      savedObjectId: timeline.savedObjectId,
      title: timeline.title,
      updated: timeline.updated,
      updatedBy: timeline.updatedBy
    };
  });
});

var AllTimelinesQueryComponent = function AllTimelinesQueryComponent(_ref) {
  var children = _ref.children,
      onlyUserFavorite = _ref.onlyUserFavorite,
      pageInfo = _ref.pageInfo,
      search = _ref.search,
      sort = _ref.sort;
  var variables = {
    onlyUserFavorite: onlyUserFavorite,
    pageInfo: pageInfo,
    search: search,
    sort: sort
  };
  var handleRefetch = (0, _react.useCallback)(function (refetch) {
    return refetch(variables);
  }, [variables]);
  return _react.default.createElement(_reactApollo.Query, {
    query: _index.allTimelinesQuery,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: variables
  }, function (_ref2) {
    var data = _ref2.data,
        loading = _ref2.loading,
        refetch = _ref2.refetch;
    return children({
      loading: loading,
      refetch: handleRefetch.bind(null, refetch),
      totalCount: (0, _fp.getOr)(0, 'getAllTimeline.totalCount', data),
      timelines: getAllTimeline(JSON.stringify(variables), (0, _fp.getOr)([], 'getAllTimeline.timeline', data))
    });
  });
};

var AllTimelinesQuery = _react.default.memo(AllTimelinesQueryComponent);

exports.AllTimelinesQuery = AllTimelinesQuery;