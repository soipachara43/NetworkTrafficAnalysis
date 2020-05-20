"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oneTimelineQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetOneTimeline($id: ID!) {\n    getOneTimeline(id: $id) {\n      savedObjectId\n      columns {\n        aggregatable\n        category\n        columnHeaderType\n        description\n        example\n        indexes\n        id\n        name\n        searchable\n        type\n      }\n      dataProviders {\n        id\n        name\n        enabled\n        excluded\n        kqlQuery\n        queryMatch {\n          field\n          displayField\n          value\n          displayValue\n          operator\n        }\n        and {\n          id\n          name\n          enabled\n          excluded\n          kqlQuery\n          queryMatch {\n            field\n            displayField\n            value\n            displayValue\n            operator\n          }\n        }\n      }\n      dateRange {\n        start\n        end\n      }\n      description\n      eventType\n      eventIdToNoteIds {\n        eventId\n        note\n        timelineId\n        noteId\n        created\n        createdBy\n        timelineVersion\n        updated\n        updatedBy\n        version\n      }\n      favorite {\n        fullName\n        userName\n        favoriteDate\n      }\n      filters {\n        meta {\n          alias\n          controlledBy\n          disabled\n          field\n          formattedValue\n          index\n          key\n          negate\n          params\n          type\n          value\n        }\n        query\n        exists\n        match_all\n        missing\n        range\n        script\n      }\n      kqlMode\n      kqlQuery {\n        filterQuery {\n          kuery {\n            kind\n            expression\n          }\n          serializedQuery\n        }\n      }\n      notes {\n        eventId\n        note\n        timelineId\n        timelineVersion\n        noteId\n        created\n        createdBy\n        updated\n        updatedBy\n        version\n      }\n      noteIds\n      pinnedEventIds\n      pinnedEventsSaveObject {\n        pinnedEventId\n        eventId\n        timelineId\n        created\n        createdBy\n        updated\n        updatedBy\n        version\n      }\n      title\n      savedQueryId\n      sort {\n        columnId\n        sortDirection\n      }\n      created\n      createdBy\n      updated\n      updatedBy\n      version\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var oneTimelineQuery = (0, _graphqlTag.default)(_templateObject());
exports.oneTimelineQuery = oneTimelineQuery;