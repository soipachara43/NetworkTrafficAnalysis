"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelineDetailsQuery = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query GetTimelineDetailsQuery(\n    $sourceId: ID!\n    $eventId: String!\n    $indexName: String!\n    $defaultIndex: [String!]!\n  ) {\n    source(id: $sourceId) {\n      id\n      TimelineDetails(eventId: $eventId, indexName: $indexName, defaultIndex: $defaultIndex) {\n        data {\n          field\n          values\n          originalValue\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var timelineDetailsQuery = (0, _graphqlTag.default)(_templateObject());
exports.timelineDetailsQuery = timelineDetailsQuery;