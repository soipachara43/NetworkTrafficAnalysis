"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allTimelinesQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetAllTimeline(\n    $pageInfo: PageInfoTimeline!\n    $search: String\n    $sort: SortTimeline\n    $onlyUserFavorite: Boolean\n  ) {\n    getAllTimeline(\n      pageInfo: $pageInfo\n      search: $search\n      sort: $sort\n      onlyUserFavorite: $onlyUserFavorite\n    ) {\n      totalCount\n      timeline {\n        savedObjectId\n        description\n        favorite {\n          fullName\n          userName\n          favoriteDate\n        }\n        eventIdToNoteIds {\n          eventId\n          note\n          timelineId\n          noteId\n          created\n          createdBy\n          timelineVersion\n          updated\n          updatedBy\n          version\n        }\n        notes {\n          eventId\n          note\n          timelineId\n          timelineVersion\n          noteId\n          created\n          createdBy\n          updated\n          updatedBy\n          version\n        }\n        noteIds\n        pinnedEventIds\n        title\n        created\n        createdBy\n        updated\n        updatedBy\n        version\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var allTimelinesQuery = (0, _graphqlTag.default)(_templateObject());
exports.allTimelinesQuery = allTimelinesQuery;